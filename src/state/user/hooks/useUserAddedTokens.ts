import { ChainId, Token } from '@savvydex/sdk'
import { createSelector } from '@reduxjs/toolkit'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useSelector } from 'react-redux'
import { AppState } from '../../index'
import { deserializeToken } from './helpers'

const selectUserTokens = ({ user: { tokens } }: AppState) => tokens

export const userAddedTokenSelector = (chainId: number) =>
  createSelector(selectUserTokens, (serializedTokensMap) =>
    Object.values(serializedTokensMap?.[chainId as unknown as ChainId] ?? {}).map(deserializeToken),
  )
export default function useUserAddedTokens(): Token[] {
  const { chainId } = useActiveWeb3React()
  return useSelector(userAddedTokenSelector(chainId))
}
