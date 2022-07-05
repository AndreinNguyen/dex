import React from 'react'
import { InputStyleTransfer } from '../style'

interface InputProps {
  type: string
  placeholder: string
  name: string
  value: string
  onChange: (e: { target: HTMLInputElement }) => void
}

const InputTransfer: React.FC<InputProps> = ({ type, placeholder, name, value, onChange }) => {
  return (
    <InputStyleTransfer
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      autoComplete="off"
      autoCorrect="off"
    />
  )
}

export default InputTransfer
