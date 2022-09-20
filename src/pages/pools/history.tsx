import { useContext } from 'react'
import { FarmsPageLayout, FarmsContext } from 'views/FarmSvc'
import FarmCard from 'views/FarmSvc/components/FarmCard/FarmCard'
import { getDisplayApr } from 'views/FarmSvc/Farms'
import { usePriceCakeBusd } from 'state/farms/hooks'
import { useWeb3React } from '@pancakeswap/wagmi'

const FarmsHistoryPage = () => {
  const { account } = useWeb3React()
  const { chosenFarmsMemoized } = useContext(FarmsContext)
  const cakePrice = usePriceCakeBusd()

  return (
    <>
      {chosenFarmsMemoized.map((farm) => (
        <FarmCard
          key={farm.pid}
          farm={farm}
          displayApr={getDisplayApr(farm.apr, farm.lpRewardsApr)}
          cakePrice={cakePrice}
          account={account}
          removed
        />
      ))}
    </>
  )
}

FarmsHistoryPage.Layout = FarmsPageLayout

export default FarmsHistoryPage
