import { useEffect, useState } from 'react'
import { TransferValues } from '../components/utils/validateTransfer'

export const useFormTransfer = (validate: any, balance?: string, callback?: () => void) => {
  const [values, setValues] = useState<TransferValues>({
    address: '',
    amount: '',
  })
  const [errors, setErrors] = useState({ address: '', amount: '' })
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
