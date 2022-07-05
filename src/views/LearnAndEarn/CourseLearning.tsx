import { Button } from '@pancakeswap/uikit'
import { ChevronLeft } from '@styled-icons/entypo/ChevronLeft'
import axios from 'axios'
import { SAVVYDEX_API } from 'config/constants/endpoints'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import Page from 'views/Page'
import { QuestionContext } from '.'
import { CourseCardInterface, Metadata } from './interface'
import { LearningContainer, NavigateHeader } from './style'

const getListQuestions = async (id: string) => {
  const response = await axios.get(`${SAVVYDEX_API}/questions/${id}`)
  return response.data
}
const CourseLearning = () => {
  const [questionContext, setQuestionContext] = useContext(QuestionContext)
  const router = useRouter()
  const query = router.query
  const { mutateAsync: getListQuestionMutation } = useMutation(getListQuestions)
  const [currentCourse, setCurrentCourse] = useState<CourseCardInterface>()
  const [answerChecked, setAnswerChecked] = useState<number>()
  const [listQuestion, setListQuestion] = useState<Metadata[]>()
  const [currentQuestion, setCurrentQuestion] = useState<number>(0)
  const [questionData, setQuestionData] = useState<Metadata>()

  useEffect(() => {
    (async () => {
      const data = await getListQuestionMutation(String(query.courseId))
      setListQuestion(data.data.metadata)
    })()
  }, [query])

  useEffect(() => {
    if (listQuestion) {
      setQuestionData(listQuestion[currentQuestion])
      console.log(listQuestion)
    }
  }, [currentQuestion, listQuestion])

  const onBack = () => {
    router.push('/learn-and-earn')
  }

  const onSelectAnswer = (e) => {
    setAnswerChecked(e.target.value)
  }

  const onNextQuestion = () => {
    if (currentQuestion < listQuestion.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const onPreQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
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
            {questionData?.answer.map((data, index) => (
              <div className="answer-item">
                <input
                  type="radio"
                  value={index}
                  id={`answer${index}`}
                  onChange={onSelectAnswer}
                  className="answer-input"
                  name="answer"
                />
                <label
                  htmlFor={`answer${index}`}
                  className={`answer-label ${answerChecked == index ? 'answer-checked' : ''}`}
                >
                  <span>{data.A || data.B || data.C || data.D}</span>
                </label>
              </div>
            ))}
          </div>

          <div className="control-button">
            <div className="previous">
              <Button onClick={onPreQuestion}>Previous</Button>
            </div>
            <div className="next">
              <Button onClick={onNextQuestion}>Next</Button>
            </div>
          </div>
        </LearningContainer>
      )}
    </Page>
  )
}

export default CourseLearning
