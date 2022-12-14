import { Button, useModal } from '@pancakeswap/uikit'
import { ChevronLeft } from '@styled-icons/entypo/ChevronLeft'
import { useWeb3React } from '@pancakeswap/wagmi'
import axios from 'axios'
import camelcaseKeys from 'camelcase-keys'
import { ApiEndpoints } from 'config/constants/endpoints'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { useMutation } from 'react-query'
import Page from 'views/Page'
import { ChainId } from '@savvydex/sdk'
import ConfirmModal from './ConfirmModal'
import { Metadata } from './interface'
import PaginationQuestion from './PaginationQuestion'
import { LearningContainer, NavigateHeader, ResultContainer } from './style'
import SubmitAlert from './SubmitAlert'

const getListQuestions = async ({ id, chainId }: { id: string; chainId: ChainId }) => {
  const response = await axios.get(`${ApiEndpoints[chainId]}/questions/${id}`)
  return camelcaseKeys(response.data, { deep: true })
}

const createAnswerQuestion = async ({ data, chainId }: { data; chainId: ChainId }) => {
  const response = await axios.post(`${ApiEndpoints[chainId]}/user-questions`, data)
  return camelcaseKeys(response.data, { deep: true })
}

const checkQuestionInfo = async ({ body, chainId }: { body; chainId: ChainId }) => {
  const response = await axios.post(`${ApiEndpoints[chainId]}/user-questions/check-info`, body)
  return camelcaseKeys(response.data, { deep: true })
}

const claimReward = async ({ body, chainId }: { body; chainId: ChainId }) => {
  const response = await axios.post(`${ApiEndpoints[chainId]}/user-questions/claim`, body)
  return camelcaseKeys(response.data, { deep: true })
}

const CourseLearning = () => {
  const router = useRouter()
  const query = router.query
  const { account, chainId } = useWeb3React()

  const { mutateAsync: getListQuestionMutation } = useMutation(getListQuestions)
  const { mutateAsync: createAnswerQuestionMutation } = useMutation(createAnswerQuestion)
  const { mutateAsync: checkQuestionInfoMutation } = useMutation(checkQuestionInfo)
  const { mutateAsync: claimRewardMutation } = useMutation(claimReward)

  const [answerChecked, setAnswerChecked] = useState<string>()
  const [listQuestion, setListQuestion] = useState<Metadata[]>()
  const [currentQuestion, setCurrentQuestion] = useState<number>(0)
  const [questionData, setQuestionData] = useState<Metadata>()
  const [answerData, setAnswerData] = useState([])
  const [isAnswered, setIsAnswered] = useState<boolean>(false)
  const [resultData, setResultData] = useState<any>()
  const [isLoadingReward, setIsLoadingReward] = useState<boolean>(false)
  const [loadingComplete, setLoadingComplete] = useState(false)
  const [isClaimed, setIsClaimed] = useState(false)

  const [onOpenErrorModal] = useModal(<SubmitAlert type="error" message="You already did it." />)
  const [onOpenErrorRobot] = useModal(<SubmitAlert type="error" message="You're a robot." />)
  const [onOpenErrorMaxReward] = useModal(
    <SubmitAlert type="error" message="Too many request claims on this day, please go back in tomorrow." />,
  )

  const onClaimReward = async () => {
    const body = {
      wallet_address: account,
      question_id: query.courseId,
    }

    try {
      const response = await claimRewardMutation({ body, chainId })
      if (response) {
        onRewardAlert()
        setIsClaimed(true)
        setIsAnswered(true)
      }
    } catch (error: any) {
      const { response } = error
      switch (response.data.message) {
        case 'max_reward_in_day':
          onOpenErrorMaxReward()
          break
        case 'loading_reward':
          setIsLoadingReward(true)
          break
        default:
          console.log(response.data.message)
          break
      }
    }
  }

  const [onOpenSuccessModal] = useModal(
    <SubmitAlert type="success" message="Your answer has been successfully submitted" onClaim={onClaimReward} />,
  )

  const { executeRecaptcha } = useGoogleReCaptcha()

  const handleReCaptchaVerify = async (): Promise<string> => {
    if (!executeRecaptcha) {
      console.log('Execute recaptcha not yet available')
      return
    }

    const token = await executeRecaptcha()
    // eslint-disable-next-line consistent-return
    return token
  }
  const sendingQuestionRequest = async () => {
    const token = await handleReCaptchaVerify()

    if (!token) {
      console.log('captcha undefine')
      return
    }
    const body = {
      wallet_address: account,
      question_id: String(query.courseId),
      answers: answerData,
      captcha: token,
    }
    try {
      const response = await createAnswerQuestionMutation({ data: body, chainId })
      onOpenSuccessModal()
    } catch (error: any) {
      const { response } = error

      switch (response.data.message) {
        case 'user_already_did_it':
          onOpenErrorModal()
          break
        case 'user_might_be_a_robot':
          onOpenErrorRobot()
          break
        default:
          console.log(response.data.message)
          break
      }
    }
  }

  const [onConfirmSubmit] = useModal(<ConfirmModal onConfirm={sendingQuestionRequest} />)
  const [onRewardAlert] = useModal(
    <SubmitAlert
      type="success"
      message="The reward will be transferred to your wallet in a few minutes. Please wait"
    />,
  )

  useEffect(() => {
    if (!account) {
      return
    }

    async function fetchQuestionData() {
      const data = await getListQuestionMutation({ id: String(query.courseId), chainId })
      const shuffleList = await data.data.metadata.sort(() => Math.random() - 0.5)
      setListQuestion(shuffleList)
    }

    async function checkQuestionData() {
      const body = { wallet_address: account, question_id: String(query.courseId) }
      const data = await checkQuestionInfoMutation({ body, chainId })
      setLoadingComplete(true)
      if (data.data.isAnswered) {
        setResultData(data.data)
        setIsAnswered(true)
      }
    }

    fetchQuestionData()
    checkQuestionData()
  }, [query, account, isClaimed, getListQuestionMutation, chainId, checkQuestionInfoMutation])

  useEffect(() => {
    if (listQuestion) {
      setQuestionData(listQuestion[currentQuestion])
    }
    const findCheckedAnswer = answerData.find((data) => data.id === listQuestion[currentQuestion].id)
    if (findCheckedAnswer) {
      setAnswerChecked(findCheckedAnswer.user_answer)
    }
  }, [currentQuestion, listQuestion, answerData])

  const onBack = () => {
    router.push('/learn-and-earn')
  }

  const onSelectAnswer = (e) => {
    const answer = e.target.value
    setAnswerChecked(answer)

    const findCheckedAnswer = answerData.find((data) => data.id === listQuestion[currentQuestion].id)
    if (!findCheckedAnswer) {
      setAnswerData([
        ...answerData,
        { id: listQuestion[currentQuestion].id, name: listQuestion[currentQuestion].name, user_answer: answer },
      ])
    }
  }

  const onNextQuestion = () => {
    if (currentQuestion < listQuestion.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setAnswerChecked(null)
    }
  }

  const onPreQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setAnswerChecked(null)
    }
  }

  const onSubmitQuestion = async (event) => {
    event.preventDefault()
    onConfirmSubmit()
  }

  const renderNextOrSubmitButton = () => {
    if (answerData.length === listQuestion.length && currentQuestion + 1 === listQuestion.length) {
      return <Button onClick={onSubmitQuestion}>Submit</Button>
    }
    return <Button onClick={onNextQuestion}>Next</Button>
  }

  return (
    <Page>
      <LearningContainer>
        <NavigateHeader>
          <div className="navigate-back" onClick={onBack} onKeyDown={onBack} role="presentation">
            <ChevronLeft size={24} />
            Learn and Earn
          </div>
        </NavigateHeader>

        {isAnswered && resultData && loadingComplete && (
          <ResultContainer>
            <h4>Congratulations! You&apos;ve completed the quiz</h4>
            <p>Correct answer {resultData.correctAnswers}</p>
            <p>Reward BNB: {resultData.rewardToken.rewardBnb}</p>
            <p>Reward SVC: {resultData.rewardToken.rewardSvc}</p>

            <div className="claimBtn">
              {resultData.isClaimed || isClaimed ? (
                <Button disabled>Claimed</Button>
              ) : (
                <>
                  {isLoadingReward ? (
                    <Button disabled>Reward being transferred</Button>
                  ) : (
                    <Button onClick={onClaimReward}>Claim</Button>
                  )}
                </>
              )}
            </div>
          </ResultContainer>
        )}

        {!isAnswered && listQuestion && loadingComplete && (
          <>
            <div className="question">
              <h4 className="question__name">{questionData?.name}</h4>
              <p className="total-question">
                {currentQuestion + 1}/{listQuestion.length}
              </p>
            </div>

            <div className="options">
              {questionData &&
                Object.keys(questionData.answer).map((key) => (
                  <div className="answer-item">
                    <input
                      type="radio"
                      value={key}
                      id={`answer${key}`}
                      onChange={onSelectAnswer}
                      checked={answerChecked === key}
                      className="answer-input"
                      name="answer"
                    />
                    <label
                      htmlFor={`answer${key}`}
                      className={`answer-label ${answerChecked === key ? 'answer-checked' : ''}`}
                    >
                      <span>{questionData?.answer[key]}</span>
                    </label>
                  </div>
                ))}
            </div>

            <div className="control-button">
              <div className="previous">
                <Button onClick={onPreQuestion}>Previous</Button>
              </div>
              <div className="next">{renderNextOrSubmitButton()}</div>
            </div>

            <PaginationQuestion total={listQuestion.length} current={currentQuestion} setCurrent={setCurrentQuestion} />
          </>
        )}
      </LearningContainer>
    </Page>
  )
}

export default CourseLearning
