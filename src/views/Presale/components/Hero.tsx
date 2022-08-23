import styled, { keyframes } from 'styled-components'
import { Box, Flex, Heading, Skeleton } from '@pancakeswap/uikit'
import Balance from 'components/Balance'
import { usePresaleInfo } from 'state/presale/hooks'
import usePresaleTime, { ReleaseStatus } from '../hooks/usePresaleTime'

const StyledHeading = styled(Heading)`
  font-family: 'Kanit', sans-serif;
`

const floatingStarsLeft = keyframes`
  from {
    transform: translate(0,  0px);
  }
  50% {
    transform: translate(10px, 10px);
  }
  to {
    transform: translate(0, -0px);
  }  
`

const floatingStarsRight = keyframes`
  from {
    transform: translate(0,  0px);
  }
  50% {
    transform: translate(-10px, 10px);
  }
  to {
    transform: translate(0, -0px);
  }  
`

const floatingTicketLeft = keyframes`
  from {
    transform: translate(0,  0px);
  }
  50% {
    transform: translate(-10px, 15px);
  }
  to {
    transform: translate(0, -0px);
  }  
`

const floatingTicketRight = keyframes`
  from {
    transform: translate(0,  0px);
  }
  50% {
    transform: translate(10px, 15px);
  }
  to {
    transform: translate(0, -0px);
  }  
`

const mainTicketAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(6deg);
  }
  to {
    transform: rotate(0deg);
  }  
`

const TicketContainer = styled(Flex)`
  animation: ${mainTicketAnimation} 3s ease-in-out infinite;
`

const PrizeTotalBalance = styled(Balance)`
  background: ${({ theme }) => theme.colors.gradients.gold};
  text-align: center;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const StyledBuyTicketButton = styled.button<{ disabled: boolean }>`
  background: ${({ theme, disabled }) =>
    disabled ? theme.colors.disabled : 'linear-gradient(180deg, #7645d9 0%, #452a7a 100%)'};
  width: 200px;
  ${({ theme }) => theme.mediaQueries.xs} {
    width: 240px;
  }
`

const ButtonWrapper = styled.div`
  z-index: 1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-4deg);
`

const TicketSvgWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  transform: rotate(-4deg);
`

const Decorations = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: url(/images/decorations/bg-star.svg);
  background-repeat: no-repeat;
  background-position: center 0;
`

const StarsDecorations = styled(Box)`
  position: absolute;
  width: 100%;
  height: 100%;

  & img {
    position: absolute;
  }

  & :nth-child(1) {
    animation: ${floatingStarsLeft} 3s ease-in-out infinite;
    animation-delay: 0.25s;
  }
  & :nth-child(2) {
    animation: ${floatingStarsLeft} 3.5s ease-in-out infinite;
    animation-delay: 0.5s;
  }
  & :nth-child(3) {
    animation: ${floatingStarsRight} 4s ease-in-out infinite;
    animation-delay: 0.75s;
  }
  & :nth-child(4) {
    animation: ${floatingTicketLeft} 6s ease-in-out infinite;
    animation-delay: 0.2s;
  }
  & :nth-child(5) {
    animation: ${floatingTicketRight} 6s ease-in-out infinite;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & :nth-child(1) {
      left: 3%;
      top: 42%;
    }
    & :nth-child(2) {
      left: 9%;
      top: 23%;
    }
    & :nth-child(3) {
      right: 2%;
      top: 24%;
    }
    & :nth-child(4) {
      left: 8%;
      top: 67%;
    }
    & :nth-child(5) {
      right: 8%;
      top: 67%;
    }
  }

  ${({ theme }) => theme.mediaQueries.md} {
    & :nth-child(1) {
      left: 10%;
      top: 42%;
    }
    & :nth-child(2) {
      left: 17%;
      top: 23%;
    }
    & :nth-child(3) {
      right: 10%;
      top: 24%;
    }
    & :nth-child(4) {
      left: 17%;
      top: 67%;
    }
    & :nth-child(5) {
      right: 17%;
      top: 67%;
    }
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    & :nth-child(1) {
      left: 19%;
      top: 42%;
    }
    & :nth-child(2) {
      left: 25%;
      top: 23%;
    }
    & :nth-child(3) {
      right: 19%;
      top: 24%;
    }
    & :nth-child(4) {
      left: 24%;
      top: 67%;
    }
    & :nth-child(5) {
      right: 24%;
      top: 67%;
    }
  }
`

const Hero = () => {
  const { isLoading, totalAmount } = usePresaleInfo()
  const { status } = usePresaleTime()

  const getHeroHeading = () => {
    if (status === ReleaseStatus.NOTYET) {
      return (
        <>
          {isLoading ? (
            <Skeleton my="7px" height={60} width={190} />
          ) : (
            <PrizeTotalBalance fontSize="64px" bold unit=" SVC" value={Number(totalAmount)} mb="8px" decimals={0} />
          )}
          <StyledHeading mb="32px" scale="lg" color="#ffffff">
            in total!
          </StyledHeading>
        </>
      )
    }
    return (
      <StyledHeading mb="24px" scale="xl" color="#ffffff">
        Presale on sale soon
      </StyledHeading>
    )
  }

  return (
    <Flex flexDirection="column" alignItems="center" justifyContent="center">
      <Decorations />
      <StarsDecorations display={['none', 'none', 'block']}>
        <img src="/images/lottery/star-big.png" width="124px" height="109px" alt="" />
        <img src="/images/lottery/star-small.png" width="70px" height="62px" alt="" />
        <img src="/images/lottery/three-stars.png" width="130px" height="144px" alt="" />
      </StarsDecorations>
      <StyledHeading mb="8px" scale="md" color="#ffffff" id="lottery-hero-title">
        Your presale SavvyCoin
      </StyledHeading>
      {getHeroHeading()}
      <TicketContainer
        position="relative"
        width={['240px', '288px']}
        height={['94px', '113px']}
        alignItems="center"
        justifyContent="center"
      >
        <ButtonWrapper>{/* <StyledBuyTicketButton /> */}</ButtonWrapper>
        <TicketSvgWrapper>{/* <TicketPurchaseCard width="100%" /> */}</TicketSvgWrapper>
      </TicketContainer>
    </Flex>
  )
}

export default Hero
