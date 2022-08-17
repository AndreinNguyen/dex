import { useState } from 'react'
import styled from 'styled-components'
import { Card, CardHeader, CardBody, Flex, Heading, Text } from '@pancakeswap/uikit'

import { dateTimeOptions } from '../helpers'

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

const NextDrawWrapper = styled.div`
  background: ${({ theme }) => theme.colors.background};
  padding: 24px;
`

const NextUnlockCard = () => {
  const TIME_DEPLOY_LAB_DEX = 1660721607
  const endTime = TIME_DEPLOY_LAB_DEX + 365 * 24 * 60 * 60
  const endTimeMs = parseInt(endTime.toString(), 10) * 1000
  const endDate = new Date(endTimeMs)

  const getNextDrawId = () => {
    if (true) {
      return `text`
    }
    if (true) {
      return ''
    }
    return 1
  }

  const getNextDrawDateTime = () => {
    if (true) {
      return `${endDate.toLocaleString(navigator.language, dateTimeOptions)}`
    }
    return ''
  }

  const ticketRoundText = 'ticketRoundText'
  const [youHaveText, ticketsThisRoundText] = ticketRoundText.split(''.toString())

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
