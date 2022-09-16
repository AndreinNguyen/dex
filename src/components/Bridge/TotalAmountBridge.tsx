/* eslint-disable jsx-a11y/label-has-associated-control */
import { BigNumber } from '@ethersproject/bignumber'
import { formatEther } from '@ethersproject/units'
import { Button } from '@pancakeswap/uikit'
import { Container, InputPanel, InputRow, LabelRow } from 'components/CurrencyInputPanel'
import { Input as NumericalInput } from 'components/CurrencyInputPanel/NumericalInput'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import styled from 'styled-components'

type Props = {
  disableCurrencySelect?: boolean
  setTotalAmount
  value
  maxBalance: BigNumber
}

const TotalAmountInputStyle = styled.div`
  width: 100%;

  .label {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.875rem;
    transform: translateY(0) scale(0.9);
    line-height: 1.25rem;
    letter-spacing: 0.25px;
    color: #b8add2;
    font-weight: 400;
  }
`

const TotalAmountBridge = ({ disableCurrencySelect, setTotalAmount, value, maxBalance }: Props) => {
  const onUserInput = (val) => {
    setTotalAmount(val)
  }

  const onMax = () => {
    setTotalAmount(formatEther(maxBalance.toString()))
  }

  const { account, library } = useActiveWeb3React()
  const {
    t,
    currentLanguage: { locale },
  } = useTranslation()

  return (
    <TotalAmountInputStyle>
      <label className="label">Total Amount</label>
      <InputPanel>
        <Container as="label">
          <LabelRow>
            <NumericalInput
              className="token-amount-input"
              value={value}
              onUserInput={(val) => {
                onUserInput(val)
              }}
            />
          </LabelRow>
          <InputRow selected={disableCurrencySelect}>
            {account && (
              <Button onClick={onMax} scale="xs" variant="secondary">
                {t('Max').toLocaleUpperCase(locale)}
              </Button>
            )}
          </InputRow>
        </Container>
      </InputPanel>
    </TotalAmountInputStyle>
  )
}
export default TotalAmountBridge
