import { Modal } from '@pancakeswap/uikit'
import SuccessIconVector from 'components/Svg/SuccessIconVector'
import React from 'react'
import { NotificationBox } from '../style'

interface Props {
  onDismiss?: () => void
  txHash: string
}

const Notification: React.FC<Props> = ({ onDismiss, txHash }) => {
  return (
    <Modal title="Notification" onDismiss={onDismiss}>
      <NotificationBox>
        <div className="success-icon">
          <SuccessIconVector />
        </div>
        <p style={{ fontSize: '20px' }}>Send gift successful</p>
        <a
          href={`https://testnet.bscscan.com/tx/${txHash}`}
          target="_blank"
          style={{ color: '#F6B24F' }}
          rel="noreferrer"
        >
          View on BsCScan
        </a>
        <button className="button-notification" onClick={() => onDismiss()} type="button">
          Close
        </button>
      </NotificationBox>
    </Modal>
  )
}

export default Notification
