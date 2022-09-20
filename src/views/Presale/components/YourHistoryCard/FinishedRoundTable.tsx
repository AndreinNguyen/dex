import useSWR from 'swr'
import styled from 'styled-components'
import { Text, Box, Flex } from '@pancakeswap/uikit'
import fetchUserPresaleTransaction from 'state/presale/fetchUserPresaleTransaction'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import FinishedRoundRow from './FinishedRoundRow'

const Grid = styled(Box)`
  display: grid;
  grid-template-columns: 10% 40% 40% 10%;
`

interface FinishedRoundTableProps {
  numUserRoundsRequested: number
}

const FinishedRoundTable: React.FC<React.PropsWithChildren<FinishedRoundTableProps>> = () => {
  const { account, chainId } = useActiveWeb3React()
  const { data = [] } = useSWR(['fetchUserPresaleTransaction', account, chainId], () =>
    fetchUserPresaleTransaction(account, chainId),
  )

  const convertData = data
    .filter((el) => !el.amountBnb) // because list txns include txns of learn-to-earn, therefore, we ignore it by !el.amountBnb
    .map((el) => {
      return {
        transactionId: el.id,
        timestamp: new Date(el.createdAt).getTime(),
        transactionHash: el.txtHash,
        claimed: true,
      }
    })

  return (
    <>
      {convertData.length > 0 && (
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
      )}
      <Flex px="24px" pb="24px" flexDirection="column" overflowY="scroll" height="240px">
        {convertData.length > 0 ? (
          convertData.map((finishedRound, index) => (
            <FinishedRoundRow
              key={finishedRound.transactionId}
              transactionId={(index + 1).toString()}
              transactionHash={finishedRound.transactionHash}
              timestamp={(finishedRound.timestamp / 1000).toString()}
            />
          ))
        ) : (
          <Text bold fontSize="12px" marginTop="100px" color="primary" textAlign="center">
            No transaction
          </Text>
        )}
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
