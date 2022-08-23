import styled from 'styled-components'
import {
  CardHeader,
  Card,
  CardBody,
  Text,
  CardFooter,
  ArrowBackIcon,
  Flex,
  Heading,
  Skeleton,
} from '@pancakeswap/uikit'
import FinishedRoundTable from './FinishedRoundTable'

interface YourHistoryCardProps {
  numUserRoundsRequested: number
}

const StyledCard = styled(Card)`
  width: 100%;

  ${({ theme }) => theme.mediaQueries.md} {
    width: 756px;
  }
`

const StyledCardBody = styled(CardBody)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 240px;
`

const YourHistoryCard: React.FC<React.PropsWithChildren<YourHistoryCardProps>> = ({ numUserRoundsRequested }) => {
  const getHeader = () => {
    return <Heading scale="md">Transaction</Heading>
  }

  const getBody = () => {
    return <FinishedRoundTable numUserRoundsRequested={numUserRoundsRequested} />
  }

  const getFooter = () => {
    return (
      <CardFooter>
        <Flex flexDirection="column" justifyContent="center" alignItems="center">
          <Text fontSize="12px" color="textSubtle">
            Only showing data for presale
          </Text>
        </Flex>
      </CardFooter>
    )
  }

  return (
    <StyledCard>
      <CardHeader>{getHeader()}</CardHeader>
      {getBody()}
      {getFooter()}
    </StyledCard>
  )
}

export default YourHistoryCard
