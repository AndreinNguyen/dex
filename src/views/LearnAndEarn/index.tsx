import axios from 'axios'
import camelcaseKeys from 'camelcase-keys'
import { SAVVYDEX_API } from 'config/constants/endpoints'
import { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import Page from 'views/Page'
import CourseCard from './CourseCard'
import { QuestionsResponse } from './interface'
import { RootContainer } from './style'

const getUserQuestion = async () => {
  const response = await axios.get(`${SAVVYDEX_API}/questions`)
  return camelcaseKeys(response.data, { deep: true })
}

const LearnAndEarn = () => {
  const { mutateAsync: getUserQuestionMutation } = useMutation(getUserQuestion)
  const [questionData, setQuestionData] = useState<QuestionsResponse>()

  useEffect(() => {
    ;(async () => {
      const data = await getUserQuestionMutation()
      setQuestionData(data.data)
    })()
  }, [])
  return (
    <Page>
      <RootContainer>
        <div className="header">
          <h1 className="title">Earn free crypto through learning</h1>
          <p className="description">Build your blockchain knowledge, complete quizzes, and earn free crypto.</p>
        </div>

        <div className="course-wrapper">
          {questionData && questionData?.data.map((data, index) => <CourseCard data={data} key={`${data.id}`} />)}
        </div>
      </RootContainer>
    </Page>
  )
}

export default LearnAndEarn
