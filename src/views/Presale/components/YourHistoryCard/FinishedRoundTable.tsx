import styled from 'styled-components'
import { Text, Box, Flex, Button } from '@pancakeswap/uikit'
import FinishedRoundRow from './FinishedRoundRow'

const Grid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(3, 1fr) auto;
`

interface FinishedRoundTableProps {
  numUserRoundsRequested: number
}

const FinishedRoundTable: React.FC<React.PropsWithChildren<FinishedRoundTableProps>> = () => {
  const fakeData = [
    {
      transactionId: 'jsadfklajsdlf',
      timestamp: '1723886908',
      transactionHash: '0x13dd33b0e34e97b0f16d749f692e34a62883221cb94b3347561477f8077963df',
      claimed: true,
    },
    {
      transactionId: 'jsadfklajsdlf',
      timestamp: '1723886908',
      transactionHash: '0x13dd33b0e34e97b0f16d749f692e34a62883221cb94b3347561477f8077963df',
      claimed: true,
    },
    {
      transactionId: 'jsadfklajsdlf',
      timestamp: '1723886908',
      transactionHash: '0x13dd33b0e34e97b0f16d749f692e34a62883221cb94b3347561477f8077963df',
      claimed: true,
    },
    {
      transactionId: 'jsadfklajsdlf',
      timestamp: '1723886908',
      transactionHash: '0x13dd33b0e34e97b0f16d749f692e34a62883221cb94b3347561477f8077963df',
      claimed: true,
    },
  ]
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
          Transaction
        </Text>
        <Box width="20px" />
      </Grid>
      <Flex px="24px" pb="24px" flexDirection="column" overflowY="scroll" height="240px">
        {fakeData &&
          fakeData.map((finishedRound) => (
            <FinishedRoundRow
              key={finishedRound.transactionId}
              transactionId={finishedRound.transactionId}
              transactionHash={finishedRound.transactionHash}
              timestamp={finishedRound.timestamp}
            />
          ))}
        {/* {true && (
          <Flex justifyContent="center">
            <Button mt="12px" variant="text" width="fit-content" onClick={handleShowMoreClick}>
              Show More
            </Button>
          </Flex>
        )} */}
      </Flex>
    </>
  )
}

export default FinishedRoundTable
