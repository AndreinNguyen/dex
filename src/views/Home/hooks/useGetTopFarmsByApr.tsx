import { useState, useEffect } from 'react'
import { ChainId } from '@savvydex/sdk'
import { useFarms, usePriceCakeBusd } from 'state/farms/hooks'
import { useAppDispatch } from 'state'
import farmsConfig from 'config/constants/farms'
import { fetchFarmsPublicDataAsync } from 'state/farms'
import { getFarmApr } from 'utils/apr'
import orderBy from 'lodash/orderBy'
import { DeserializedFarm } from 'state/types'
import { FetchStatus } from 'config/constants/types'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { FarmWithStakedValue } from '../../Farms/components/types'

const useGetTopFarmsByApr = (isIntersecting: boolean) => {
  const dispatch = useAppDispatch()
  const { data: farms, regularCakePerBlock } = useFarms()
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.Idle)
  const [topFarms, setTopFarms] = useState<FarmWithStakedValue[]>([null, null, null, null, null])
  const cakePriceBusd = usePriceCakeBusd()
  const { chainId } = useActiveWeb3React()

  useEffect(() => {
    const fetchFarmData = async () => {
      setFetchStatus(FetchStatus.Fetching)
      const activeFarms = farmsConfig(chainId).filter((farm) => farm.pid !== 0)
      try {
        await dispatch(fetchFarmsPublicDataAsync({ pids: activeFarms.map((farm) => farm.pid), chainId }))
        setFetchStatus(FetchStatus.Fetched)
      } catch (e) {
        console.error(e)
        setFetchStatus(FetchStatus.Failed)
      }
    }

    if (isIntersecting && fetchStatus === FetchStatus.Idle) {
      fetchFarmData()
    }
  }, [dispatch, setFetchStatus, fetchStatus, topFarms, isIntersecting, chainId])

  useEffect(() => {
    const getTopFarmsByApr = (farmsState: DeserializedFarm[]) => {
      const farmsWithPrices = farmsState.filter(
        (farm) =>
          farm.lpTotalInQuoteToken &&
          farm.quoteTokenPriceBusd &&
          farm.pid !== 0 &&
          farm.multiplier &&
          farm.multiplier !== '0X',
      )
      const farmsWithApr: FarmWithStakedValue[] = farmsWithPrices.map((farm) => {
        const totalLiquidity = farm.lpTotalInQuoteToken.times(farm.quoteTokenPriceBusd)
        const { cakeRewardsApr, lpRewardsApr } = getFarmApr(
          farm.poolWeight,
          cakePriceBusd,
          totalLiquidity,
          farm.lpAddresses[ChainId.MAINNET],
          regularCakePerBlock,
        )
        return { ...farm, apr: cakeRewardsApr, lpRewardsApr }
      })

      const sortedByApr = orderBy(farmsWithApr, (farm) => farm.apr + farm.lpRewardsApr, 'desc')
      setTopFarms(sortedByApr.slice(0, 5))
    }

    if (fetchStatus === FetchStatus.Fetched && !topFarms[0]) {
      getTopFarmsByApr(farms)
    }
  }, [setTopFarms, farms, fetchStatus, cakePriceBusd, topFarms, regularCakePerBlock])

  return { topFarms }
}

export default useGetTopFarmsByApr
