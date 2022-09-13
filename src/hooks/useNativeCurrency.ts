import { ChainId, Native, NativeCurrency } from '@savvydex/sdk'
import { useMemo } from 'react'
import useActiveWeb3React from './useActiveWeb3React'

export default function useNativeCurrency(): NativeCurrency {
  const { chainId } = useActiveWeb3React()
  return useMemo(() => {
    try {
      return Native.onChain(chainId)
    } catch (e) {
      // TODO: Switch to mainnet on production
      return Native.onChain(ChainId.TESTNET)
    }
  }, [chainId])
}
