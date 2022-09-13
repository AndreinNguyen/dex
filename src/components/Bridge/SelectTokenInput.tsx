/* eslint-disable jsx-a11y/label-has-associated-control */
import { ChevronDownIcon } from '@pancakeswap/uikit'
import styled from 'styled-components'

type Props = {
  label: string
  data?: any
  setDataToken
  openModal: () => void
}

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

      .token-select {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .token-info {
          display: flex;
          align-items: center;
          .default-icon {
            width: 18px;
            height: 18px;
            margin-right: 8px;
            background-color: #b8add2;
            border-radius: 50%;
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

    .network {
      width: 30%;
    }

    .token {
      width: 65%;
    }
  }
`

const ChevronBottom = styled(ChevronDownIcon).attrs({ width: '24px' })`
  display: block;
`

const SelectTokenInput = ({ label, setDataToken, openModal }: Props) => {
  return (
    <SelectTokenStyle>
      <label className="label">{label}</label>

      <div className="inputPanel">
        <div className="token general-select">
          <p className="label">Token</p>
          <div className="token-select" onClick={openModal}>
            <div className="token-info">
              <div className="default-icon" />
              <img src="" alt="" />
              <input type="text" readOnly autoComplete="off" autoCorrect="off" placeholder="Select" />
            </div>
            <div className="navigate-icon">
              <ChevronBottom />
            </div>
          </div>
        </div>

        <div className="network general-select">
          <p className="label">Network</p>
          <div className="token-select" onClick={openModal}>
            <div className="token-info">
              <div className="default-icon" />
              <img src="" alt="" />
              <div className="name">Select</div>
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
