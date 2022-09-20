import { useWeb3React } from '@pancakeswap/wagmi'
import BigNumber from 'bignumber.js'
import { SVC } from 'config/constants/tokens'
import { FAST_INTERVAL, SLOW_INTERVAL } from 'config/constants'
import { BigNumber as EthersBigNumber } from '@ethersproject/bignumber'
import { Zero } from '@ethersproject/constants'
import useSWR from 'swr'
import { BIG_ZERO } from 'utils/bigNumber'
import { bscRpcProvider } from 'utils/providers'
import { useMemo } from 'react'
import { useCake, useTokenContract } from './useContract'
import { useSWRContract } from './useSWRContract'

const useTokenBalance = (tokenAddress: string, forceBSC?: boolean) => {
  const { account } = useWeb3React()

  const contract = useTokenContract(tokenAddress, false)

  const key = useMemo(
    () =>
      account
        ? {
            contract: forceBSC ? contract.connect(bscRpcProvider) : contract,
            methodName: 'balanceOf',
            params: [account],
          }
        : null,
    [account, contract, forceBSC],
  )

  const { data, status, ...rest } = useSWRContract(key as any, {
    refreshInterval: FAST_INTERVAL,
  })

  return {
    ...rest,
    fetchStatus: status,
    balance: data ? new BigNumber(data.toString()) : BIG_ZERO,
  }
}

export const useTotalSupply = () => {
  const { reader: cakeContract } = useCake()
  const { data } = useSWRContract([cakeContract, 'totalSupply'], {
    refreshInterval: SLOW_INTERVAL,
  })

  return data ? new BigNumber(data.toString()) : null
}

export const useBurnedBalance = (tokenAddress: string) => {
  const contract = useTokenContract(tokenAddress, false)
  const { data } = useSWRContract([contract, 'balanceOf', ['0x000000000000000000000000000000000000dEaD']], {
    refreshInterval: SLOW_INTERVAL,
  })

  return data ? new BigNumber(data.toString()) : BIG_ZERO
}

export const useGetBnbBalance = () => {
  const { account } = useWeb3React()
  const { status, data, mutate } = useSWR([account, 'bnbBalance'], async () => {
    return bscRpcProvider.getBalance(account)
  })

  return { balance: data || Zero, fetchStatus: status, refresh: mutate }
}

export const useGetCakeBalance = () => {
  const { chainId } = useWeb3React()
  const { balance, fetchStatus } = useTokenBalance(SVC[chainId].address)

  // TODO: Remove ethers conversion once useTokenBalance is converted to ethers.BigNumber
  return { balance: EthersBigNumber.from(balance.toString()), fetchStatus }
}

export default useTokenBalance
