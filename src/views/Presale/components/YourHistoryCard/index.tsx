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
  handleShowMoreClick: () => void
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

const YourHistoryCard: React.FC<React.PropsWithChildren<YourHistoryCardProps>> = ({
  handleShowMoreClick,
  numUserRoundsRequested,
}) => {
  const getHeader = () => {
    if (true) {
      return (
        <Flex alignItems="center">
          <ArrowBackIcon cursor="pointer" onClick={() => {}} mr="20px" />
          <Flex flexDirection="column" alignItems="flex-start" justifyContent="center">
            <Heading scale="md" mb="4px">
              text
            </Heading>
            {true ? <Text fontSize="14px">text</Text> : <Skeleton width="185px" height="21px" />}
          </Flex>
        </Flex>
      )
    }

    return <Heading scale="md">Rounds</Heading>
  }

  const getBody = () => {
    return (
      <FinishedRoundTable
        handleHistoryRowClick={() => {}}
        handleShowMoreClick={handleShowMoreClick}
        numUserRoundsRequested={numUserRoundsRequested}
      />
    )
  }

  const getFooter = () => {
    return (
      <CardFooter>
        <Flex flexDirection="column" justifyContent="center" alignItems="center">
          <Text fontSize="12px" color="textSubtle">
            Only showing data for Lottery V2
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
