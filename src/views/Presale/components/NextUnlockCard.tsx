import styled from 'styled-components'
import { Card, CardHeader, CardBody, Flex, Heading, Text } from '@pancakeswap/uikit'

import { usePresaleInfo } from 'state/presale/hooks'
import Balance from 'components/Balance'
import { dateTimeOptions } from '../helpers'
import usePresaleTime from '../hooks/usePresaleTime'

const Grid = styled.div`
  display: grid;
  grid-template-columns: auto;

  ${({ theme }) => theme.mediaQueries.md} {
    grid-column-gap: 32px;
    grid-template-columns: auto 1fr;
  }
`

const StyledCard = styled(Card)`
  width: 100%;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 520px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    width: 756px;
  }
`

const PrizeTotalBalance = styled(Balance)`
  background: ${({ theme }) => theme.colors.gradients.gold};
  text-align: center;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const NextUnlockCard = () => {
  const { receivedAmount, lockedAmount, totalAmount } = usePresaleInfo()
  const { endtime } = usePresaleTime()
  const endDate = new Date(endtime)

  const getNextDrawDateTime = () => {
    return `${endDate.toLocaleString(navigator.language, dateTimeOptions)}`
  }

  return (
    <StyledCard>
      <CardHeader p="16px 24px">
        <Flex justifyContent="space-between">
          <Heading mr="12px">Next Unlock</Heading>
          <Text>{getNextDrawDateTime()}</Text>
        </Flex>
      </CardHeader>
      <CardBody>
        <Grid>
          <Flex justifyContent={['center', null, null, 'flex-start']}>
            <Heading>Next unlock amount</Heading>
          </Flex>
          <Flex flexDirection="column" mb="18px">
            <PrizeTotalBalance fontSize="24px" bold unit=" SVC" value={Number(totalAmount) / 20} decimals={0} />
          </Flex>
          <Flex justifyContent={['center', null, null, 'flex-start']}>
            <Heading>Unlocked amount</Heading>
          </Flex>
          <Flex flexDirection="column" mb="18px">
            <PrizeTotalBalance fontSize="24px" bold unit=" SVC" value={Number(lockedAmount)} decimals={0} />
          </Flex>
          <Flex justifyContent={['center', null, null, 'flex-start']}>
            <Heading>Received amount</Heading>
          </Flex>
          <Flex flexDirection="column" mb="18px">
            <PrizeTotalBalance fontSize="24px" bold unit=" SVC" value={Number(receivedAmount)} decimals={0} />
          </Flex>
        </Grid>
      </CardBody>
    </StyledCard>
  )
}

export default NextUnlockCard
