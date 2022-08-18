import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useSelector } from 'react-redux'
import { useSlowRefreshEffect } from 'hooks/useRefreshEffect'
import { AppState, useAppDispatch } from '../index'
import { fetchPresaleDataAsync } from '.'

export const usePresaleInfo = () => {
  return useSelector((state: AppState) => state.presale)
}

export const useFetchPresaleInfo = () => {
  const { account } = useActiveWeb3React()
  const dispatch = useAppDispatch()

  useSlowRefreshEffect(() => {
    dispatch(fetchPresaleDataAsync(account))
  })
}
