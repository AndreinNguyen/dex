/* eslint-disable jsx-a11y/label-has-associated-control */
import { ChevronDownIcon, useModal } from '@pancakeswap/uikit'
import styled from 'styled-components'
import ListTokenModal from './ListTokenModal'

const SelectTokenStyle = styled.div`
  font-family: 'Space Grotesk', sans-serif;
  .label {
    font-size: 0.875rem;
    transform: translateY(0) scale(0.9);
    line-height: 1.25rem;
    letter-spacing: 0.25px;
    color: #b8add2;
    font-weight: 400;
  }
  .inputPanel {
    background-color: #1b252e;
    padding: 16px;
    border-color: #383241;
    border-style: solid;
    border-radius: 18px;
    border: 1px;
    display: flex;
    justify-content: space-between;

    .general-select {
      cursor: pointer;
      width: 100%;

      .token-select {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .token-info {
          display: flex;
          align-items: center;
          .default-icon {
            width: 24px;
            height: 25px;
            margin-right: 8px;
            background-color: #b8add2;
            border-radius: 50%;
          }

          .logo {
            margin-right: 8px;
          }

          input {
            background: none;
            border: 0;
            outline: 0;
            cursor: pointer;
            width: 80%;
          }
        }
      }
    }
  }
`

const ChevronBottom = styled(ChevronDownIcon).attrs({ width: '24px' })`
  display: block;
`

type Props = {
  label: string
  data: any
  setDataToken
}

const SelectTokenInput = ({ label, setDataToken, data }: Props) => {
  const [onOpenListNetworkModal] = useModal(<ListTokenModal setDataToken={setDataToken} />)

  return (
    <SelectTokenStyle>
      <label className="label">{label}</label>
      <div className="inputPanel">
        <div className="network general-select">
          <div className="token-select" onClick={onOpenListNetworkModal} role="presentation">
            <div className="token-info">
              {data?.logo ? <img className="logo" src={data?.logo} alt="" /> : <div className="default-icon" />}

              <div className="name">{data?.name || 'Select'}</div>
            </div>
            <div className="navigate-icon">
              <ChevronBottom />
            </div>
          </div>
        </div>
      </div>
    </SelectTokenStyle>
  )
}

export default SelectTokenInput
