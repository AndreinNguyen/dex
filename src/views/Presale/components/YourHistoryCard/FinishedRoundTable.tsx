import styled from 'styled-components'
import { Text, Box, Flex, Button } from '@pancakeswap/uikit'
import { LotteryStatus } from 'config/constants/types'
import FinishedRoundRow from './FinishedRoundRow'

const Grid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(3, 1fr) auto;
`

interface FinishedRoundTableProps {
  handleHistoryRowClick: (string) => void
  handleShowMoreClick: () => void
  numUserRoundsRequested: number
}

const FinishedRoundTable: React.FC<React.PropsWithChildren<FinishedRoundTableProps>> = ({
  handleShowMoreClick,
  numUserRoundsRequested,
  handleHistoryRowClick,
}) => {
  return (
    <>
      <Grid px="24px" pt="24px" mb="8px">
        <Text bold fontSize="12px" color="secondary">
          #
        </Text>
        <Text bold fontSize="12px" color="secondary" textTransform="uppercase">
          Date
        </Text>
        <Text bold fontSize="12px" color="secondary" textTransform="uppercase">
          Your Tickets
        </Text>
        <Box width="20px" />
      </Grid>
      <Flex px="24px" pb="24px" flexDirection="column" overflowY="scroll" height="240px">
        {true &&
          [].map((finishedRound) => (
            <FinishedRoundRow
              key={finishedRound.lotteryId}
              roundId={finishedRound.lotteryId}
              hasWon={finishedRound.claimed}
              numberTickets={finishedRound.totalTickets}
              endTime={finishedRound.endTime}
              onClick={handleHistoryRowClick}
            />
          ))}
        {true && (
          <Flex justifyContent="center">
            <Button mt="12px" variant="text" width="fit-content" onClick={handleShowMoreClick}>
              Show More
            </Button>
          </Flex>
        )}
      </Flex>
    </>
  )
}

export default FinishedRoundTable
