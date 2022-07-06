import { Button } from '@pancakeswap/uikit'
import { ChevronLeft } from '@styled-icons/entypo/ChevronLeft'
import { useWeb3React } from '@web3-react/core'
import axios from 'axios'
import camelcaseKeys from 'camelcase-keys'
import { SAVVYDEX_API } from 'config/constants/endpoints'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import Page from 'views/Page'
import { Metadata } from './interface'
import { LearningContainer, NavigateHeader } from './style'

const getListQuestions = async (id: string) => {
  const response = await axios.get(`${SAVVYDEX_API}/questions/${id}`)
  return camelcaseKeys(response.data, { deep: true })
}

const createAnswerQuestion = async (data) => {
  const response = await axios.post(`${SAVVYDEX_API}/user-questions`, data)
  return camelcaseKeys(response.data, { deep: true })
}
const CourseLearning = () => {
  const router = useRouter()
  const query = router.query
  const { account } = useWeb3React()
  const { mutateAsync: getListQuestionMutation } = useMutation(getListQuestions)
  const { mutateAsync: createAnswerQuestionMutation } = useMutation(createAnswerQuestion)
  const [answerChecked, setAnswerChecked] = useState<string>()
  const [listQuestion, setListQuestion] = useState<Metadata[]>()
  const [currentQuestion, setCurrentQuestion] = useState<number>(0)
  const [questionData, setQuestionData] = useState<Metadata>()
  const [answerData, setAnswerData] = useState([])

  useEffect(() => {
    async function fetchQuestionData() {
      const data = await getListQuestionMutation(String(query.courseId))
      const shuffleList = await data.data.metadata.sort(() => Math.random() - 0.5)
      setListQuestion(shuffleList)
    }
    fetchQuestionData()
  }, [query])

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

  const onSubmitQuestion = async () => {
    const body = {
      wallet_address: account,
      question_id: String(query.courseId),
      answers: answerData,
    }
    const response = await createAnswerQuestionMutation(body)
    console.log('response', response)
  }

  const renderNextOrSubmitButton = () => {
    if (answerData.length === listQuestion.length && currentQuestion + 1 === listQuestion.length) {
      return <Button onClick={onSubmitQuestion}>Submit</Button>
    }
    return <Button onClick={onNextQuestion}>Next</Button>
  }

  return (
    <Page>
      {listQuestion && (
        <LearningContainer>
          <NavigateHeader>
            <span className="navigate-back" onClick={onBack}>
              <ChevronLeft size={24} />
              Learn and Earn
            </span>
          </NavigateHeader>

          <div className="question">
            <h4 className="question__name">{questionData?.name}</h4>
            <p className="total-question">
              {currentQuestion + 1}/{listQuestion.length}
            </p>
          </div>

          <div className="options">
            {questionData &&
              Object.keys(questionData.answer).map((key, index) => (
                <div className="answer-item">
                  <input
                    type="radio"
                    value={key}
                    id={`answer${key}`}
                    onChange={onSelectAnswer}
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
        </LearningContainer>
      )}
    </Page>
  )
}

export default CourseLearning
