import Link from 'next/link'
import styled from 'styled-components'
import { Flex, Heading, Skeleton, Button, Text } from '@pancakeswap/uikit'
import Page from 'components/Layout/Page'
import { usePresaleInfo } from 'state/presale/hooks'
import PageSection from 'components/PageSection'
import { GET_TICKETS_BG, FINISHED_ROUNDS_BG_DARK } from './pageSectionStyles'
import Hero from './components/Hero'
import Countdown from './components/Countdown'
import { PageMeta } from '../../components/Layout/Page'
import NextUnlockCard from './components/NextUnlockCard'
import YourHistoryCard from './components/YourHistoryCard'
import useFetchUserPresaleInfo from './hooks/useFetchUserInfo'
import usePresaleTime, { ReleaseStatus } from './hooks/usePresaleTime'

const StyledNotFound = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 64px);
  justify-content: center;
`

const PresalePage = styled.div`
  min-height: calc(100vh - 64px);
`

const StyledHeading = styled(Heading)`
  font-family: 'Kanit', sans-serif;
`

const Presale = () => {
  useFetchUserPresaleInfo()
  const { endtime, status } = usePresaleTime()
  const { isInWhiteList } = usePresaleInfo()

  if (!isInWhiteList) {
    return (
      <>
        <Page>
          <StyledNotFound>
            <Text mb="16px">Oops, you are not in whitelist.</Text>
            <Button as="a" scale="sm">
              <Link href="/" passHref>
                Back Home
              </Link>
            </Button>
          </StyledNotFound>
        </Page>
      </>
    )
  }

  return (
    <>
      <PageMeta />
      <PresalePage className="PresalePage">
        <PageSection background="{TITLE_BG}" index={1} hasCurvedDivider={false}>
          <Hero />
        </PageSection>
        <PageSection
          containerProps={{ style: { marginTop: '-30px' } }}
          background={GET_TICKETS_BG}
          concaveDivider
          clipFill={{ light: '#7645D9' }}
          dividerPosition="top"
          index={2}
        >
          <Flex alignItems="center" justifyContent="center" flexDirection="column" pt="24px">
            <StyledHeading scale="xl" color="#ffffff" mb="24px" textAlign="center" className="presale--heading">
              Your presale infomation!
            </StyledHeading>

            <Flex alignItems="center" justifyContent="center" mb="48px" className="presale-countdown">
              {status === ReleaseStatus.DONE ? (
                <Heading mb="24px" scale="md">
                  All presale token sent to you!
                </Heading>
              ) : endtime ? (
                <Countdown nextEventTime={endtime} postCountdownText="until the next unlock" preCountdownText="" />
              ) : (
                <Skeleton height="41px" width="250px" />
              )}
            </Flex>
          </Flex>
          {status !== ReleaseStatus.DONE && <NextUnlockCard />}
        </PageSection>
        <PageSection
          innerProps={{ style: { margin: '0', width: '100%' } }}
          background={FINISHED_ROUNDS_BG_DARK}
          hasCurvedDivider={false}
          index={2}
        >
          <Flex width="100%" flexDirection="column" alignItems="center" justifyContent="center">
            <Heading mb="24px" scale="xl">
              Yours History
            </Heading>
            <YourHistoryCard numUserRoundsRequested={1} />
          </Flex>
        </PageSection>
      </PresalePage>
    </>
  )
}

export default Presale
