import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useCallback } from 'react'
import { harvestFarmSvc } from 'utils/calls'
import { useMasterchef } from 'hooks/useContract'

const useHarvestFarm = () => {
  const masterChefContract = useMasterchef()
  const { chainId } = useActiveWeb3React()

  const handleHarvest = useCallback(async () => {
    return harvestFarmSvc(masterChefContract, chainId)
  }, [chainId, masterChefContract])

  return { onReward: handleHarvest }
}

export default useHarvestFarm
