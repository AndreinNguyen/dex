import CourseLearning from 'views/LearnAndEarn/CourseLearning'

import React from 'react'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'

const CourseLeaningPage = () => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}>
      <CourseLearning />
    </GoogleReCaptchaProvider>
  )
}

export default CourseLeaningPage
