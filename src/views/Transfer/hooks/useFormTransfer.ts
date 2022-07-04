import { useEffect, useState } from 'react'
import { ErrorMsg, TransferValues } from '../components/utils/validateTransfer'

interface FormProps {
  values: TransferValues
  errors: ErrorMsg
  handleChange: (e: { target: HTMLInputElement }) => void
  handleSubmit: () => void
}

export const useFormTransfer = (
  validate: (values: TransferValues, balance: string) => ErrorMsg,
  balance?: string,
  callback?: () => void,
): FormProps => {
  const [values, setValues] = useState<TransferValues>({
    address: '',
    amount: '',
  })
  const [errors, setErrors] = useState<ErrorMsg>({ address: '', amount: '' })
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const handleChange = (e: { target: HTMLInputElement }) => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value,
    })
  }
  const handleSubmit = () => {
    setErrors(validate(values, balance))
    setIsSubmitting(true)
  }
  useEffect(() => {
    if (Object.values(errors).every((err) => err === '') && isSubmitting) {
      callback()
    }
  }, [errors])

  return { values, handleChange, errors, handleSubmit }
}
