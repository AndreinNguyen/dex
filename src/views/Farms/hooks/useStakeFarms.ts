import { useCallback } from 'react'
import { stakeFarm } from 'utils/calls'
import { useMasterchef } from 'hooks/useContract'
import useActiveWeb3React from 'hooks/useActiveWeb3React'

const useStakeFarms = (pid: number) => {
  const masterChefContract = useMasterchef()
  const { chainId } = useActiveWeb3React()

  const handleStake = useCallback(
    async (amount: string) => {
      return stakeFarm(masterChefContract, pid, amount, chainId)
    },
    [masterChefContract, pid, chainId],
  )

  return { onStake: handleStake }
}

export default useStakeFarms
