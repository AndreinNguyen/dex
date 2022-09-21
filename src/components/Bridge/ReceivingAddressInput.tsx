/* eslint-disable jsx-a11y/label-has-associated-control */
import { Input } from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import React, { useCallback } from 'react'
import styled from 'styled-components'

type Props = {
  data?: any
  onChange
  value
}

const ReceivingAddressInputStyles = styled.div`
  font-family: 'Space Grotesk', sans-serif;
  .label {
    font-size: 0.875rem;
    transform: translateY(0) scale(0.9);
    line-height: 1.25rem;
    letter-spacing: 0.25px;
    color: #b8add2;
    font-weight: 400;
  }

  input {
    &:focus {
      border: 0 !important;
      outline: 0 !important;
      box-shadow: none !important;
    }
  }

  .recipient-address-input {
    height: 55px;
    font-size: 14px;
  }

  .input-wrapper {
    position: relative;

    .same-address-btn {
      float: right;
      right: 5px;
      color: #f6b24f;
      top: 18px;
      background: none;
      border: 0;
      outline: 0;
      cursor: pointer;
      color: #fff;
      transition: all 0.2;
      &:hover {
        color: #ffffff99;
      }
    }
  }
`

const ReceivingAddressInput = ({ data, onChange, value }: Props) => {
  const handleInput = useCallback(
    (event) => {
      const input = event.target.value
      const withoutSpaces = input.replace(/\s+/g, '')
      onChange(withoutSpaces)
    },
    [onChange],
  )
  const { account } = useActiveWeb3React()

  const handleSameAddressClick = () => {
    onChange(account)
  }
  return (
    <ReceivingAddressInputStyles>
      <label htmlFor="" className="label">
        Receiving address
      </label>

      <div className="input-wrapper">
        <Input
          className="recipient-address-input"
          type="text"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          placeholder="Receiving address"
          pattern="^(0x[a-fA-F0-9]{40})$"
          onChange={handleInput}
          value={value}
        />
        {account && (
          <button type="button" className="same-address-btn" onClick={handleSameAddressClick}>
            Same address
          </button>
        )}
      </div>
    </ReceivingAddressInputStyles>
  )
}

export default ReceivingAddressInput
