import Image from 'next/image'
import React from 'react'
import { CourseCardContainer, StartCourseButton } from './style'

const CourseCard = () => {
  return (
    <CourseCardContainer>
      <img
        className="cover-image"
        src="https://media.istockphoto.com/photos/non-fungible-token-picture-id1307372676?b=1&k=20&m=1307372676&s=170667a&w=0&h=0CbFHaQ9HZIrPQzHo1z3idRp4cGUL6vkPQi7jPUEv_s="
        alt=""
      />
      <div className="about-course">
        <p className="head-desc">All rewards redeemed, stay tuned</p>
        <h4 className="course-title">Welcome to Crypto</h4>
        <p className="course-description">
          This guide introduces you to a few critical concepts you need to kick-start your crypto journey on Binance.
          You may have a chance to earn crypto rewar…
        </p>
        <StartCourseButton>Start</StartCourseButton>
      </div>
    </CourseCardContainer>
  )
}

export default CourseCard
