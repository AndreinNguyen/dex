import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useCallback } from 'react'
import { harvestFarm } from 'utils/calls'
import { useMasterchef } from 'hooks/useContract'

const useHarvestFarm = (farmPid: number) => {
  const masterChefContract = useMasterchef()
  const { chainId } = useActiveWeb3React()

  const handleHarvest = useCallback(async () => {
    return harvestFarm(masterChefContract, farmPid, chainId)
  }, [chainId, farmPid, masterChefContract])

  return { onReward: handleHarvest }
}

export default useHarvestFarm
