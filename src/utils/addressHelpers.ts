import { ChainId } from '@savvydex/sdk'
import addresses from 'config/constants/contracts'
import { Address } from 'config/constants/types'
import { VaultKey } from 'state/types'

export const getAddress = (address: Address, chainId?: number): string => {
  // TODO: Switch to mainnet on production
  return address[chainId] ? address[chainId] : address[ChainId.TESTNET]
}

export const getMasterChefAddress = (chainId: ChainId) => {
  return getAddress(addresses.masterChef, chainId)
}
export const getMasterChefV1Address = () => {
  return getAddress(addresses.masterChefV1)
}
export const getMulticallAddress = (chainId?: number) => {
  return getAddress(addresses.multiCall, chainId)
}
export const getPancakeProfileAddress = () => {
  return getAddress(addresses.pancakeProfile)
}
export const getBridgeAddress = () => {
  return getAddress(addresses.bridgeSvc)
}
export const getSVCPolygonAddress = () => {
  return getAddress(addresses.svcPolygon)
}
export const getPancakeBunniesAddress = () => {
  return getAddress(addresses.pancakeBunnies)
}
export const getBunnyFactoryAddress = () => {
  return getAddress(addresses.bunnyFactory)
}
export const getClaimRefundAddress = () => {
  return getAddress(addresses.claimRefund)
}
export const getPointCenterIfoAddress = () => {
  return getAddress(addresses.pointCenterIfo)
}
export const getBunnySpecialAddress = () => {
  return getAddress(addresses.bunnySpecial)
}
export const getTradingCompetitionAddressEaster = () => {
  return getAddress(addresses.tradingCompetitionEaster)
}
export const getTradingCompetitionAddressFanToken = () => {
  return getAddress(addresses.tradingCompetitionFanToken)
}

export const getTradingCompetitionAddressMobox = () => {
  return getAddress(addresses.tradingCompetitionMobox)
}

export const getTradingCompetitionAddressMoD = () => {
  return getAddress(addresses.tradingCompetitionMoD)
}

export const getEasterNftAddress = () => {
  return getAddress(addresses.easterNft)
}

export const getVaultPoolAddress = (vaultKey: VaultKey) => {
  if (!vaultKey) {
    return null
  }
  return getAddress(addresses[vaultKey])
}

export const getCakeVaultAddress = () => {
  return getAddress(addresses.cakeVault)
}

export const getChainlinkOracleAddress = () => {
  return getAddress(addresses.chainlinkOracle)
}
export const getBunnySpecialCakeVaultAddress = () => {
  return getAddress(addresses.bunnySpecialCakeVault)
}
export const getBunnySpecialPredictionAddress = () => {
  return getAddress(addresses.bunnySpecialPrediction)
}
export const getBunnySpecialLotteryAddress = () => {
  return getAddress(addresses.bunnySpecialLottery)
}
export const getBunnySpecialXmasAddress = () => {
  return getAddress(addresses.bunnySpecialXmas)
}
export const getFarmAuctionAddress = () => {
  return getAddress(addresses.farmAuction)
}
export const getAnniversaryAchievement = () => {
  return getAddress(addresses.AnniversaryAchievement)
}
export const getGalaxyNFTClaimingAddress = () => {
  return getAddress(addresses.galaxyNftClaiming)
}
export const getNftMarketAddress = () => {
  return getAddress(addresses.nftMarket)
}
export const getPancakeSquadAddress = () => {
  return getAddress(addresses.pancakeSquad)
}
