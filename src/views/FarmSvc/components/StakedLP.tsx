import { Flex, Heading } from '@pancakeswap/uikit'
import { BigNumber } from 'bignumber.js'
import Balance from 'components/Balance'
import { useMemo } from 'react'
import { usePriceCakeBusd } from 'state/farms/hooks'
import styled from 'styled-components'
import { formatLpBalance, getBalanceNumber } from 'utils/formatBalance'

interface StackedLPProps {
  stakedBalance: BigNumber
  lpSymbol: string
  tokenSymbol: string
  quoteTokenSymbol: string
  lpTotalSupply: BigNumber
  tokenAmountTotal: BigNumber
  quoteTokenAmountTotal: BigNumber
}

const HeadingWrapper = styled(Heading)`
  word-break: break-all;
`

const StakedLP: React.FunctionComponent<StackedLPProps> = ({
  stakedBalance,
  // lpSymbol,
  // quoteTokenSymbol,
  // tokenSymbol,
  // lpTotalSupply,
  // tokenAmountTotal,
  // quoteTokenAmountTotal,
}) => {
  const cakePrice = usePriceCakeBusd()

  const displayBalance = useMemo(() => {
    return formatLpBalance(stakedBalance)
  }, [stakedBalance])

  return (
    <Flex flexDirection="column" alignItems="flex-start">
      <HeadingWrapper color={stakedBalance.eq(0) ? 'textDisabled' : 'text'}>{displayBalance}</HeadingWrapper>
      {stakedBalance.gt(0) && cakePrice.gt(0) && (
        <>
          <Balance
            fontSize="12px"
            color="textSubtle"
            decimals={2}
            value={getBalanceNumber(cakePrice.times(stakedBalance))}
            unit=" BUSD"
            prefix="~"
          />
          {/* <Flex style={{ gap: '4px' }}>
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
          </Flex> */}
        </>
      )}
    </Flex>
  )
}

export default StakedLP
