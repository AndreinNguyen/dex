import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useCallback } from 'react'
import { enterStakingFarmSvc } from 'utils/calls'
import { useMasterchef } from 'hooks/useContract'

const useStakeFarms = () => {
  const masterChefContract = useMasterchef()
  const { chainId } = useActiveWeb3React()

  const handleStake = useCallback(
    async (amount: string) => {
      return enterStakingFarmSvc(masterChefContract, amount, chainId)
    },
    [chainId, masterChefContract],
  )

  return { onStake: handleStake }
}

export default useStakeFarms
