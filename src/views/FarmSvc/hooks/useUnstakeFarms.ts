import { useCallback } from 'react'
import { leaveStakingFarmSvc } from 'utils/calls'
import { useMasterchef } from 'hooks/useContract'
import useActiveWeb3React from 'hooks/useActiveWeb3React'

const useUnstakeFarms = () => {
  const masterChefContract = useMasterchef()
  const { chainId } = useActiveWeb3React()

  const handleUnstake = useCallback(
    async (amount: string) => {
      return leaveStakingFarmSvc(masterChefContract, amount, chainId)
    },
    [chainId, masterChefContract],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstakeFarms
