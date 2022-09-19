import axios from 'axios'
import camelcaseKeys from 'camelcase-keys'
import { BubbleHelper } from 'components/BubbleHelper'
import { LEARN_DOCS_URL } from 'config/constants'
import { ApiEndpoints } from 'config/constants/endpoints'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import Page from 'views/Page'
import { ChainId } from '@savvydex/sdk'
import CourseCard from './CourseCard'
import { QuestionsResponse } from './interface'
import { RootContainer } from './style'

const getUserQuestion = async (chainId: ChainId) => {
  const response = await axios.get(`${ApiEndpoints[chainId]}/questions`)
  return camelcaseKeys(response.data, { deep: true })
}

const LearnAndEarn = () => {
  const { chainId } = useActiveWeb3React()
  const { mutateAsync: getUserQuestionMutation } = useMutation(getUserQuestion)
  const [questionData, setQuestionData] = useState<QuestionsResponse>()

  useEffect(() => {
    // prettier-ignore
    (async () => {
      const data = await getUserQuestionMutation(chainId)
      setQuestionData(data.data)
    })()
  }, [chainId, getUserQuestionMutation])
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
      <BubbleHelper helpUrl={LEARN_DOCS_URL} />
    </Page>
  )
}

export default LearnAndEarn
