import styled from 'styled-components'
import { Text, Flex, ChevronRightIcon, Box, SmallDotIcon, PrizeIcon } from '@pancakeswap/uikit'
import Transaction from 'components/App/Transactions/Transaction'
import { TransactionDetails } from 'state/transactions/reducer'
import { dateOptions, timeOptions } from '../../helpers'

export interface FinishedRoundRowProps {
  transactionId: string
  transactionHash: string
  timestamp: string
  hasWon?: boolean
}

const Grid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(3, 1fr) auto;
  margin-bottom: 8px;
  cursor: pointer;
`

const FinishedRoundRow: React.FC<React.PropsWithChildren<FinishedRoundRowProps>> = ({
  transactionId,
  transactionHash,
  timestamp,
}) => {
  const endTimeInMs = parseInt(timestamp, 10) * 1000
  const endTimeAsDate = new Date(endTimeInMs)

  const tx: TransactionDetails = {
    hash: transactionHash,
    addedTime: parseInt(timestamp),
    from: '',
    receipt: true,
    summary: `${transactionHash.slice(0, 15)}...`,
  }

  return (
    <Grid onClick={() => {}}>
      <Flex alignItems="center">
        <Text fontSize="16px" color="textSubtle">
          {transactionId}
        </Text>
      </Flex>
      <Flex
        mx="6px"
        alignItems={['flex-start', null, 'center']}
        justifyContent={['center', null, 'flex-start']}
        flexDirection={['column', null, 'row']}
      >
        <Text fontSize="12px" mr={['0', null, '6px']}>
          {endTimeAsDate.toLocaleDateString(navigator.language, dateOptions)}
        </Text>
        <Text fontSize="12px" color="textSubtle">
          {endTimeAsDate.toLocaleTimeString(undefined, timeOptions)}
        </Text>
      </Flex>
      <Flex mx="6px" alignItems="center" justifyContent="space-between">
        <Transaction tx={tx} />
      </Flex>
      <Flex alignItems="center" justifyContent="center">
        <ChevronRightIcon color="primary" />
      </Flex>
    </Grid>
  )
}

export default FinishedRoundRow
