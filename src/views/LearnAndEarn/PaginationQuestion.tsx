import React from 'react'
import { PaginationWrapper } from './style'

type Props = {
  total: number
  current: number
  setCurrent: (index: number) => void
}

const PaginationQuestion = ({ total, current, setCurrent }: Props) => {
  const renderItems = () => {
    const listItem = []

    for (let index = 0; index < total; index++) {
      listItem.push(
        <button
          type="button"
          className={`items ${index === current ? 'active' : ''}`}
          onClick={() => setCurrent(index)}
        >
          {index + 1}
        </button>,
      )
    }

    return listItem
  }
  return <PaginationWrapper>{renderItems()}</PaginationWrapper>
}

export default PaginationQuestion
