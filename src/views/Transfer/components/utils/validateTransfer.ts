import { isAddress } from '@ethersproject/address'

export interface TransferValues {
  address: string
  amount: string
}

export interface ErrorMsg {
  address: string
  amount: string
}

export const validate = (values: TransferValues, balance: string) => {
  const errors: ErrorMsg = {
    address: '',
    amount: '',
  }
  if (!values.address.trim()) {
    errors.address = 'Address required'
  } else if (isAddress(values.address) === false) {
    errors.address = 'Address is invalid'
  }
  if (!values.amount.trim()) {
    errors.amount = 'Amount required'
  } else if (Number(values.amount) > Number(balance)) {
    errors.amount = 'Amount exceeds balance'
  }

  return errors
}
