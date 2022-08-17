import styled from 'styled-components'
import { Card, CardHeader, CardBody, Flex, Heading, Text } from '@pancakeswap/uikit'

import { dateTimeOptions } from '../helpers'
import usePresale from '../hooks/usePresale'

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

const NextUnlockCard = () => {
  const { endtime } = usePresale()
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
            <Heading>Total amount</Heading>
          </Flex>
          <Flex flexDirection="column" mb="18px">
            <Heading scale="xl" color="secondary" textAlign={['center', null, null, 'left']}>
              10.000.000 SVC
            </Heading>
          </Flex>
          <Flex justifyContent={['center', null, null, 'flex-start']}>
            <Heading>Unlocked amount</Heading>
          </Flex>
          <Flex flexDirection="column" mb="18px">
            <Heading scale="xl" color="secondary" textAlign={['center', null, null, 'left']}>
              500.000 SVC
            </Heading>
          </Flex>
          <Flex justifyContent={['center', null, null, 'flex-start']}>
            <Heading>Lock amount</Heading>
          </Flex>
          <Flex flexDirection="column" mb="18px">
            <Heading scale="xl" color="secondary" textAlign={['center', null, null, 'left']}>
              9.500.000 SVC
            </Heading>
          </Flex>
        </Grid>
      </CardBody>
    </StyledCard>
  )
}

export default NextUnlockCard
