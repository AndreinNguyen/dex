import masterchefABI from 'config/abi/masterchef.json'
import chunk from 'lodash/chunk'
import { multicallv2 } from 'utils/multicall'
import { ChainId } from '@savvydex/sdk'
import { SerializedFarmConfig } from '../../config/constants/types'
import { SerializedFarm } from '../types'
import { getMasterChefAddress } from '../../utils/addressHelpers'
import { getMasterchefContract } from '../../utils/contractHelpers'

const masterChefContract = getMasterchefContract()

export const fetchMasterChefFarmPoolLength = async () => {
  const poolLength = await masterChefContract.poolLength()
  return poolLength
}

const masterChefFarmCalls = (farm: SerializedFarm, chainId: ChainId) => {
  const { pid } = farm
  return pid || pid === 0
    ? [
        {
          address: getMasterChefAddress(chainId),
          name: 'poolInfo',
          params: [pid],
        },
        {
          address: getMasterChefAddress(chainId),
          name: 'totalAllocPoint', // We updated method totalRegularAllocPoint by totalAllocPoint in smart contract farming * //,
        },
      ]
    : [null, null]
}

export const fetchMasterChefData = async (farms: SerializedFarmConfig[], chainId: ChainId): Promise<any[]> => {
  const masterChefCalls = farms.map((farm) => masterChefFarmCalls(farm, chainId))
  const chunkSize = masterChefCalls.flat().length / farms.length
  const masterChefAggregatedCalls = masterChefCalls
    .filter((masterChefCall) => masterChefCall[0] !== null && masterChefCall[1] !== null)
    .flat()
  const masterChefMultiCallResult = await multicallv2(masterchefABI, masterChefAggregatedCalls, chainId)
  const masterChefChunkedResultRaw = chunk(masterChefMultiCallResult, chunkSize)
  let masterChefChunkedResultCounter = 0
  return masterChefCalls.map((masterChefCall) => {
    if (masterChefCall[0] === null && masterChefCall[1] === null) {
      return [null, null]
    }
    const data = masterChefChunkedResultRaw[masterChefChunkedResultCounter]
    masterChefChunkedResultCounter++
    return data
  })
}
