import React from 'react'
import Page from 'views/Page'
import { RootContainer } from './style'
import CourseCard from './CourseCard'

const LearnAndEarn = () => {
  return (
    <Page>
      <RootContainer>
        <div className="header">
          <h1 className="title">Earn free crypto through learning</h1>
          <p className="description">Build your blockchain knowledge, complete quizzes, and earn free crypto.</p>
        </div>
        <CourseCard />
      </RootContainer>
    </Page>
  )
}

export default LearnAndEarn
