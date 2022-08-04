import { Button, useModal } from '@pancakeswap/uikit'
import { inputRegex } from 'components/CurrencyInputPanel/NumericalInput'
import Container from 'components/Layout/Container'
import { PageMeta } from 'components/Layout/Page'
import GreySavvycoinIcon from 'components/Svg/GreySavvycoinIcon'
import SmsIcon from 'components/Svg/SmsIcon'
import useSVCTokenBalanceDisplay from 'hooks/useSVCTokenBalanceDisplay'
import { useCallback } from 'react'
import { escapeRegExp } from 'utils'
import ConfirmModal from './components/ConfirmModal'
import InputTransfer from './components/InputTransfer'
import Notification from './components/Notification'
import TransferHeader from './components/TransferHeader'
import { validate } from './components/utils/validateTransfer'
import { useFormTransfer } from './hooks/useFormTransfer'
import { useTransfer } from './hooks/useTransfer'
import { ErrorMsg, TransferBox } from './style'

const Transfer = () => {
  const { balanceDisplay } = useSVCTokenBalanceDisplay()
  const { values, handleChange, errors, handleSubmit } = useFormTransfer(validate, balanceDisplay, openConfirm)
  const { transferHandler, transferHash } = useTransfer(values.address, values.amount, openSuccess)

  const [onPresentConfirm] = useModal(
    <ConfirmModal address={values.address} amount={values.amount} onSubmit={transferHandler} />,
  )
  function openConfirm() {
    onPresentConfirm()
  }
  const [onPresentSuccess] = useModal(<Notification txHash={transferHash} />)
  function openSuccess() {
    onPresentSuccess()
    values.amount = ''
    values.address = ''
  }
  const validAmount = useCallback(
    (e: { target: HTMLInputElement }) => {
      if (inputRegex.test(escapeRegExp(e.target.value))) {
        handleChange(e)
      }
    },
    [handleChange],
  )

  return (
    <>
      <PageMeta />
      <Container>
        <TransferBox>
          <TransferHeader />
          <form className="transfer-form">
            <div className="receive-address">
              <div className="receive-title">
                <div className="icon">
                  <SmsIcon />
                </div>
                <div className="label-input">Receiver address</div>
              </div>
              <div className="receive-input">
                <InputTransfer
                  type="text"
                  placeholder="Input the address"
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                />
                <ErrorMsg>{errors.address}</ErrorMsg>
              </div>
            </div>
            <div className="receive-address">
              <div className="receive-title">
                <div className="icon">
                  <GreySavvycoinIcon />
                </div>
                <div className="label-input">Amount</div>
              </div>
              <div className="receive-input">
                <InputTransfer
                  type="text"
                  placeholder="Input number of coin"
                  name="amount"
                  value={values.amount}
                  onChange={validAmount}
                />
                <ErrorMsg>{errors.amount}</ErrorMsg>
              </div>
            </div>
            <Button width="100%" type="button" onClick={handleSubmit}>
              Confirm
            </Button>
          </form>
        </TransferBox>
      </Container>
    </>
  )
}

export default Transfer
