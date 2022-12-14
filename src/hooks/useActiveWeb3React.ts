import { Web3Provider } from '@ethersproject/providers'
import { ChainId } from '@savvydex/sdk'
import { useWeb3React } from '@pancakeswap/wagmi'
import { useSwitchNetwork } from 'hooks/useSwitchNetwork'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import useSWR from 'swr'
import { isChainSupported } from 'utils/wagmi'
import { useAccount, useNetwork, useProvider, useSigner } from 'wagmi'

export function useNetworkConnectorUpdater() {
  const localChainId = useLocalNetworkChain()
  const { chain, isConnecting } = useActiveWeb3React()
  const { switchNetwork, isLoading, pendingChainId } = useSwitchNetwork()
  const router = useRouter()
  const chainId = chain?.id || localChainId
  const [triedSwitchFromQuery, setTriedSwitchFromQuery] = useState(false)

  useEffect(() => {
    if (isLoading || !router.isReady || isConnecting) return
    const parsedQueryChainId = Number(router.query.chainId)
    if (triedSwitchFromQuery) {
      if (parsedQueryChainId !== chainId && isChainSupported(chainId)) {
        router.replace(
          {
            query: {
              ...router.query,
              chainId,
            },
          },
          undefined,
          {
            shallow: true,
          },
        )
      }
    } else if (isChainSupported(parsedQueryChainId)) {
      // TODO: Disable switch network
      // switchNetwork(parsedQueryChainId)
      //   .then((r) => {
      //     console.info('Auto switch network', r)
      //   })
      //   .catch((err) => {
      //     console.error(err)
      //   })
      //   .finally(() => setTriedSwitchFromQuery(true))
    } else {
      setTriedSwitchFromQuery(true)
    }
  }, [chainId, isConnecting, isLoading, router, switchNetwork, triedSwitchFromQuery])

  return {
    isLoading,
    switchNetwork,
    pendingChainId,
  }
}

export function useLocalNetworkChain() {
  const { data: sessionChainId } = useSWR('session-chain-id')
  const { query } = useRouter()

  const chainId = +(sessionChainId || query.chainId)

  if (isChainSupported(chainId)) {
    return chainId
  }

  return undefined
}

/**
 * Provides a web3 provider with or without user's signer
 * Recreate web3 instance only if the provider change
 */
const useActiveWeb3React = () => {
  const { library, ...web3React } = useWeb3React()
  const chainId = useActiveChainId()
  const provider = useProvider({ chainId })

  return {
    library: (library ?? provider) as Web3Provider,
    provider,
    ...web3React,
    chainId,
  }
}

export const useActiveChainId = () => {
  const localChainId = useLocalNetworkChain()
  const { chain } = useNetwork()
  // TODO: Switch to mainnet on production
  const chainId = chain?.id ?? localChainId ?? ChainId.MAINNET
  return chainId
}

export const useProviderOrSigner = (withSignerIfPossible = true) => {
  const chainId = useActiveChainId()
  const provider = useProvider({ chainId })
  const { address, isConnected } = useAccount()
  const { data: signer } = useSigner()

  return useMemo(
    () => (withSignerIfPossible && address && isConnected && signer ? signer : provider),
    [address, isConnected, provider, signer, withSignerIfPossible],
  )
}

export default useActiveWeb3React
