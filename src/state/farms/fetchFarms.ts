import { SerializedFarmConfig } from 'config/constants/types'
import BigNumber from 'bignumber.js'
import { getFullDecimalMultiplier } from 'utils/getFullDecimalMultiplier'
import { BIG_ZERO, BIG_TWO } from '../../utils/bigNumber'
import { fetchPublicFarmsData } from './fetchPublicFarmData'
import { fetchMasterChefData } from './fetchMasterChefData'
import { SerializedFarm } from '../types'

const fetchFarms = async (farmsToFetch: SerializedFarmConfig[]): Promise<SerializedFarm[]> => {
  const [farmResult, masterChefResult] = await Promise.all([
    fetchPublicFarmsData(farmsToFetch),
    fetchMasterChefData(farmsToFetch),
  ])

  return farmsToFetch.map((farm, index) => {
    const [
      tokenBalanceLP, // balance token of lp contract ex: lp svc-bnb contract has 10 svc
      quoteTokenBalanceLP, // balance quote token of lp contract ex: lp svc-bnb contract has 10 bnb
      lpTokenBalanceMC, // balance lp of master chef contract: MC has 10 lp svc-bnb
      lpTotalSupply, // total supply in circulation of lp svc-bnb
      [tokenDecimals],
      [quoteTokenDecimals],
    ] = farmResult[index]

    const [info, totalRegularAllocPoint] = masterChefResult[index]

    // Ratio in % of LP tokens that are staked in the MC, vs the total number in circulation
    const lpTokenRatio = new BigNumber(lpTokenBalanceMC).div(new BigNumber(lpTotalSupply)) // 4 / 14,213764850863520921

    // Balance of svc in farming[0]
    const svcBalanceMC = new BigNumber(lpTokenBalanceMC).div(getFullDecimalMultiplier(tokenDecimals))

    // console.log({ svcBalanceMC: svcBalanceMC.toJSON() })

    // Raw amount of token in the LP, including those not staked
    const tokenAmountTotal = new BigNumber(tokenBalanceLP).div(getFullDecimalMultiplier(tokenDecimals)) // 13195,195757743820167629

    const quoteTokenAmountTotal = new BigNumber(quoteTokenBalanceLP).div(getFullDecimalMultiplier(quoteTokenDecimals)) // 0,01531348471131166

    // Amount of quoteToken in the LP that are staked in the MC
    const quoteTokenAmountMc = quoteTokenAmountTotal.times(lpTokenRatio) // 0,01531348471131166 * 4 / 14,213764850863520921 = 0.004309480246

    // Total staked in LP, in quote token value
    const lpTotalInQuoteToken = quoteTokenAmountMc.times(BIG_TWO)
    // console.log({ quoteTokenAmountMc: new BigNumber(quoteTokenAmountMc).toJSON() })
    // console.log({ lpTotalInQuoteToken: new BigNumber(lpTotalInQuoteToken).toJSON() })

    const allocPoint = info ? new BigNumber(info.allocPoint?._hex) : BIG_ZERO
    const poolWeight = totalRegularAllocPoint ? allocPoint.div(new BigNumber(totalRegularAllocPoint)) : BIG_ZERO
    // console.log({
    //   allocPoint: new BigNumber(allocPoint).toJSON(),
    //   totalRegularAllocPoint: new BigNumber(totalRegularAllocPoint).toJSON(),
    // })

    return {
      ...farm,
      token: farm.token,
      quoteToken: farm.quoteToken,
      tokenAmountTotal: tokenAmountTotal.toJSON(),
      lpTokenBalanceMC: svcBalanceMC.toJSON(),
      quoteTokenAmountTotal: quoteTokenAmountTotal.toJSON(),
      lpTotalSupply: new BigNumber(lpTotalSupply).toJSON(),
      lpTotalInQuoteToken: lpTotalInQuoteToken.toJSON(),
      tokenPriceVsQuote: quoteTokenAmountTotal.div(tokenAmountTotal).toJSON(),
      poolWeight: poolWeight.toJSON(),
      multiplier: `${allocPoint.div(100).toString()}X`,
    }
  })
}

export default fetchFarms
