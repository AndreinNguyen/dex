import { Button, Modal } from '@pancakeswap/uikit'
import React from 'react'
import styled from 'styled-components'

type Props = {
  data?: any
  onDismiss?: () => void
}

const ModalContainerStyle = styled.div``

const ApproveTokenModal = ({ onDismiss }: Props) => {
  return (
    <Modal
      title="Notice"
      onDismiss={() => {
        onDismiss?.()
      }}
      style={{ maxWidth: '550px' }}
    >
      <ModalContainerStyle>
        <Button type="button" width="100%">
          Approve
        </Button>
      </ModalContainerStyle>
    </Modal>
  )
}

export default ApproveTokenModal
