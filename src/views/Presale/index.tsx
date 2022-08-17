import styled from 'styled-components'
import { Flex, Heading, Skeleton } from '@pancakeswap/uikit'
import PageSection from 'components/PageSection'
import { GET_TICKETS_BG, FINISHED_ROUNDS_BG_DARK } from './pageSectionStyles'
import Hero from './components/Hero'
import Countdown from './components/Countdown'
import { PageMeta } from '../../components/Layout/Page'
import NextUnlockCard from './components/NextUnlockCard'
import YourHistoryCard from './components/YourHistoryCard'

const PresalePage = styled.div`
  min-height: calc(100vh - 64px);
`

const StyledHeading = styled(Heading)`
  font-family: 'Kanit', sans-serif;
`

const Presale = () => {
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
            {true && (
              <StyledHeading scale="xl" color="#ffffff" mb="24px" textAlign="center" className="presale--heading">
                Your presale infomation!
              </StyledHeading>
            )}
            <Flex alignItems="center" justifyContent="center" mb="48px" className="presale-countdown">
              {true ? (
                <Countdown nextEventTime={1} postCountdownText="until the next unlock" preCountdownText="" />
              ) : (
                <Skeleton height="41px" width="250px" />
              )}
            </Flex>
          </Flex>
          <NextUnlockCard />
        </PageSection>
        <PageSection
          innerProps={{ style: { margin: '0', width: '100%' } }}
          background={FINISHED_ROUNDS_BG_DARK}
          hasCurvedDivider={false}
          index={2}
        >
          <Flex width="100%" flexDirection="column" alignItems="center" justifyContent="center">
            <Heading mb="24px" scale="xl">
              Finished Rounds
            </Heading>
            <YourHistoryCard handleShowMoreClick={() => {}} numUserRoundsRequested={1} />
          </Flex>
        </PageSection>
      </PresalePage>
    </>
  )
}

export default Presale
