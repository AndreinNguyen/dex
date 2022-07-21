import { useWeb3React } from '@web3-react/core'
import { BubbleHelper } from 'components/BubbleHelper'
import { POOL_DOCS_URL } from 'config/constants'
import { useContext } from 'react'
import { usePriceCakeBusd } from 'state/farms/hooks'
import { FarmsContext, FarmsPageLayout } from 'views/FarmSvc'
import FarmCard from 'views/FarmSvc/components/FarmCard/FarmCard'
import { getDisplayApr } from 'views/FarmSvc/Farms'

const FarmsPage = () => {
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
          removed={false}
        />
      ))}
    </>
  )
}

FarmsPage.Layout = FarmsPageLayout

export default FarmsPage
