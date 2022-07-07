import { Button, Flex, InjectedModalProps, Modal } from '@pancakeswap/uikit'
import React, { useState } from 'react'
import { GoogleReCaptchaProvider, GoogleReCaptcha } from 'react-google-recaptcha-v3'
import styled from 'styled-components'

interface Props extends InjectedModalProps {
  message?: string
  onConfirm: (captcha: string) => void
}

const ConfirmQuestion = styled.h4`
  font-size: 24px;
  line-height: 1.3;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
`

const ConfirmModal = ({ onDismiss, onConfirm }: Props) => {
  const recaptchaRef = React.createRef()
  const [captcha, setCaptcha] = useState<string>()

  const onReCAPTCHAChange = (captchaCode) => {
    if (!captchaCode) {
      return
    }
    setCaptcha(captchaCode)
  }

  return (
    <Modal title="Confirm" headerBackground="gradients.cardHeader" onDismiss={onDismiss} style={{ maxWidth: '420px' }}>
      <GoogleReCaptchaProvider
        reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
        scriptProps={{
          async: false,
          defer: false,
          appendTo: 'head',
          nonce: undefined,
        }}
      >
        <GoogleReCaptcha onVerify={onReCAPTCHAChange} />
      </GoogleReCaptchaProvider>
      <Flex pt={10} pb={50}>
        <ConfirmQuestion>Are you sure to submit your answer?</ConfirmQuestion>
      </Flex>
      <Flex justifyContent="center">
        <Button onClick={() => onConfirm(captcha)}>Confirm</Button>
      </Flex>
    </Modal>
  )
}

export default ConfirmModal
