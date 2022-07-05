import { Button, Modal } from '@pancakeswap/uikit'
import GreenSavvycoinIcon from 'components/Svg/GreenSavvycoinIcon'
import React from 'react'
import { ConfirmModalBox } from '../style'
// eslint-disable-next-line import/order

interface Props {
  onDismiss?: () => void
  address: string
  amount: string
  onSubmit?: () => void
}
const ConfirmModal: React.FC<Props> = ({ onDismiss, address, amount, onSubmit }) => {
  const handleOnSubmit = () => {
    onSubmit()
  }
  return (
    <Modal title="Confirm Gift" onDismiss={onDismiss}>
      <ConfirmModalBox>
        <div className="confirm-item">
          <div className="item-left">
            <p>Wallet Address</p>
          </div>
          <div className="item-right">
            <p>{address}</p>
          </div>
        </div>
        <div className="confirm-item">
          <div className="item-left">
            <p>Amount</p>
          </div>
          <div className="item-right" style={{ color: '#00CB65' }}>
            <div className="icon">
              <GreenSavvycoinIcon />
            </div>
            <p>{amount}</p>
          </div>
        </div>
        <div className="button-confirm">
          <Button width="100%" type="button" onClick={handleOnSubmit}>
            Confirm
          </Button>
        </div>
      </ConfirmModalBox>
    </Modal>
  )
}

export default ConfirmModal
