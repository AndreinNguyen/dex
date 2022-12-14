import { Flex, Heading } from '@pancakeswap/uikit'
import { BigNumber } from 'bignumber.js'
import Balance from 'components/Balance'
import { useMemo } from 'react'
import { useLpTokenPrice } from 'state/farms/hooks'
import { useUserFarmsViewMode } from 'state/user/hooks'
import { formatLpBalance, getBalanceNumber } from 'utils/formatBalance'
import { ViewMode } from 'state/user/actions'

interface StackedLPProps {
  stakedBalance: BigNumber
  lpSymbol: string
  tokenSymbol: string
  quoteTokenSymbol: string
  lpTotalSupply: BigNumber
  tokenAmountTotal: BigNumber
  quoteTokenAmountTotal: BigNumber
}

const StakedLP: React.FunctionComponent<StackedLPProps> = ({
  stakedBalance,
  lpSymbol,
  quoteTokenSymbol,
  tokenSymbol,
  lpTotalSupply,
  tokenAmountTotal,
  quoteTokenAmountTotal,
}) => {
  const lpPrice = useLpTokenPrice(lpSymbol)

  const displayBalance = useMemo(() => {
    return formatLpBalance(stakedBalance)
  }, [stakedBalance])

  const [viewMode] = useUserFarmsViewMode()

  return (
    <Flex flexDirection="column" alignItems="flex-start">
      <Heading color={stakedBalance.eq(0) ? 'textDisabled' : 'text'}>{displayBalance}</Heading>
      {stakedBalance.gt(0) && lpPrice.gt(0) && (
        <>
          <Balance
            fontSize="12px"
            color="textSubtle"
            decimals={2}
            value={getBalanceNumber(lpPrice.times(stakedBalance))}
            unit=" USDT"
            prefix="~"
          />
          {viewMode === ViewMode.CARD ? (
            <>
              <Flex style={{ gap: '4px' }}>
                <Balance
                  fontSize="12px"
                  color="textSubtle"
                  decimals={2}
                  value={stakedBalance.div(lpTotalSupply).times(tokenAmountTotal).toNumber()}
                  unit={` ${tokenSymbol}`}
                />
              </Flex>
              <Flex style={{ gap: '4px' }}>
                <Balance
                  fontSize="12px"
                  color="textSubtle"
                  decimals={2}
                  value={stakedBalance.div(lpTotalSupply).times(quoteTokenAmountTotal).toNumber()}
                  unit={` ${quoteTokenSymbol}`}
                />
              </Flex>
            </>
          ) : (
            <Flex style={{ gap: '4px' }}>
              <Balance
                fontSize="12px"
                color="textSubtle"
                decimals={2}
                value={stakedBalance.div(lpTotalSupply).times(tokenAmountTotal).toNumber()}
                unit={` ${tokenSymbol}`}
              />
              <Balance
                fontSize="12px"
                color="textSubtle"
                decimals={2}
                value={stakedBalance.div(lpTotalSupply).times(quoteTokenAmountTotal).toNumber()}
                unit={` ${quoteTokenSymbol}`}
              />
            </Flex>
          )}
        </>
      )}
    </Flex>
  )
}

export default StakedLP
