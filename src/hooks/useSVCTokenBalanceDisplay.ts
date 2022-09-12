import { SVC } from 'config/constants/tokens'
import { getFullDisplayBalance } from 'utils/formatBalance'
import { useWeb3React } from '@pancakeswap/wagmi'
import useTokenBalance from './useTokenBalance'

const useSVCTokenBalanceDisplay = () => {
  const { chainId } = useWeb3React()
  const { balance, fetchStatus } = useTokenBalance(SVC[chainId]?.address)

  const balanceDisplay = getFullDisplayBalance(balance, 18, 3)
  return { balanceDisplay, fetchStatus }
}

export default useSVCTokenBalanceDisplay
