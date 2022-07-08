import { Button, Flex, InjectedModalProps, Modal } from '@pancakeswap/uikit'
import React, { useState } from 'react'
import { GoogleReCaptchaProvider, GoogleReCaptcha } from 'react-google-recaptcha-v3'
import styled from 'styled-components'

interface Props extends InjectedModalProps {
  message?: string
  onConfirm: () => void
}

const ConfirmQuestion = styled.h4`
  font-size: 24px;
  line-height: 1.3;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
`

const ConfirmModal = ({ onDismiss, onConfirm }: Props) => {
  return (
    <Modal title="Confirm" headerBackground="gradients.cardHeader" onDismiss={onDismiss} style={{ maxWidth: '420px' }}>
      <Flex pt={10} pb={50}>
        <ConfirmQuestion>Are you sure to submit your answer?</ConfirmQuestion>
      </Flex>
      <Flex justifyContent="center">
        <Button onClick={onConfirm}>Confirm</Button>
      </Flex>
    </Modal>
  )
}

export default ConfirmModal
