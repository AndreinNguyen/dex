import { Button, Flex, InjectedModalProps, Modal } from '@pancakeswap/uikit'
import React, { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

interface Props extends InjectedModalProps {
  message?: string
  onConfirm: (captcha: string) => void
}

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
      <Flex py={20}>
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
          onChange={onReCAPTCHAChange}
        />
      </Flex>

      <Flex justifyContent="center">
        <Button onClick={() => onConfirm(captcha)}>Confirm</Button>
      </Flex>
    </Modal>
  )
}

export default ConfirmModal
