import { HistoryIcon } from '@pancakeswap/uikit'

// eslint-disable-next-line import/named
import { TransferHeaderStyle } from '../style'

const TransferHeader = () => {
  return (
    <TransferHeaderStyle>
      <h1 className="transfer-title">Send gift</h1>
      <h2 className="transfer-sub-title">Sent to your love ❤️</h2>
      <div className="icon">
        <HistoryIcon />
      </div>
      <hr className="header-divider" />
    </TransferHeaderStyle>
  )
}

export default TransferHeader
