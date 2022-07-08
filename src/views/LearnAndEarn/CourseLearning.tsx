import { Button, useModal } from '@pancakeswap/uikit'
import { ChevronLeft } from '@styled-icons/entypo/ChevronLeft'
import { useWeb3React } from '@web3-react/core'
import axios from 'axios'
import camelcaseKeys from 'camelcase-keys'
import { SAVVYDEX_API } from 'config/constants/endpoints'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import { useMutation } from 'react-query'
import Page from 'views/Page'
import ConfirmModal from './ConfirmModal'
import { Metadata } from './interface'
import { LearningContainer, NavigateHeader, ResultContainer } from './style'
import SubmitAlert from './SubmitAlert'

const getListQuestions = async (id: string) => {
  const response = await axios.get(`${SAVVYDEX_API}/questions/${id}`)
  return camelcaseKeys(response.data, { deep: true })
}

const createAnswerQuestion = async (data) => {
  const response = await axios.post(`${SAVVYDEX_API}/user-questions`, data)
  return camelcaseKeys(response.data, { deep: true })
}

const checkQuestionInfo = async (body) => {
  const response = await axios.post(`${SAVVYDEX_API}/user-questions/check-info`, body)
  return camelcaseKeys(response.data, { deep: true })
}

const claimReward = async (body) => {
  const response = await axios.post(`${SAVVYDEX_API}/user-questions/claim`, body)
  return camelcaseKeys(response.data, { deep: true })
}

const CourseLearning = () => {
  const router = useRouter()
  const query = router.query
  const { account } = useWeb3React()

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

  const [onOpenErrorModal] = useModal(<SubmitAlert type="error" message="You already did it." />)
  const [onOpenSuccessModal] = useModal(
    <SubmitAlert type="success" message="Your question has been successfully submitted" />,
  )
  const [onConfirmSubmit] = useModal(<ConfirmModal onConfirm={(captcha: string) => sendingQuestionRequest(captcha)} />)
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
      const data = await getListQuestionMutation(String(query.courseId))
      const shuffleList = await data.data.metadata.sort(() => Math.random() - 0.5)
      setListQuestion(shuffleList)
    }

    async function checkQuestionData() {
      const body = { wallet_address: account, question_id: String(query.courseId) }
      const data = await checkQuestionInfoMutation(body)
      if (data.data.isAnswered) {
        setResultData(data.data)
        setIsAnswered(true)
      } else {
        fetchQuestionData()
      }
    }

    checkQuestionData()
  }, [query, account])

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

  const sendingQuestionRequest = async (captcha: string) => {
    const body = {
      wallet_address: account,
      question_id: String(query.courseId),
      answers: answerData,
      captcha,
    }
    try {
      const response = await createAnswerQuestionMutation(body)
      onOpenSuccessModal()
    } catch (error: any) {
      const { response } = error
      if (response.data.message === 'user_already_did_it') {
        onOpenErrorModal()
      }
    }
  }

  const renderNextOrSubmitButton = () => {
    if (answerData.length === listQuestion.length && currentQuestion + 1 === listQuestion.length) {
      return <Button onClick={onSubmitQuestion}>Submit</Button>
    }
    return <Button onClick={onNextQuestion}>Next</Button>
  }

  const onClaimReward = async () => {
    const body = {
      wallet_address: account,
      question_id: query.courseId,
    }

    const response = await claimRewardMutation(body)
    if (response) {
      onRewardAlert()
    }
  }

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
      scriptProps={{
        async: false,
        defer: false,
        appendTo: 'head',
        nonce: undefined,
      }}
    >
      <Page>
        <LearningContainer>
          <NavigateHeader>
            <div className="navigate-back" onClick={onBack} onKeyDown={onBack}>
              <ChevronLeft size={24} />
              Learn and Earn
            </div>
          </NavigateHeader>

          {listQuestion && (
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
            </>
          )}

          {isAnswered && resultData && (
            <ResultContainer>
              <h4>Congratulations! You've completed the quiz</h4>
              <p>Correct answer {resultData.correctAnswers}</p>
              <p>Reward BNB: {resultData.rewardToken.rewardBnb}</p>
              <p>Reward SVC: {resultData.rewardToken.rewardSvc}</p>

              <div className="claimBtn">
                {resultData.isClaimed ? (
                  <Button disabled>Claimed</Button>
                ) : (
                  <Button onClick={onClaimReward}>Claim</Button>
                )}
              </div>
            </ResultContainer>
          )}
        </LearningContainer>
      </Page>
    </GoogleReCaptchaProvider>
  )
}

export default CourseLearning
