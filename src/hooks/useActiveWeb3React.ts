import { useWeb3React } from '@pancakeswap/wagmi'
import { simpleRpcProvider } from 'utils/providers'
// eslint-disable-next-line import/no-unresolved
import { CHAIN_ID } from 'config/constants/networks'

/**
 * Provides a web3 provider with or without user's signer
 * Recreate web3 instance only if the provider change
 */
const useActiveWeb3React = () => {
  const { library, chainId, ...web3React } = useWeb3React()

  return { library: library || simpleRpcProvider, chainId: chainId ?? parseInt(CHAIN_ID, 10), ...web3React }
}

export default useActiveWeb3React
