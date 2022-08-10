import { Button, Flex, Svg } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'
import Image from 'next/image'
import lotteryImage from '../../../public/images/home/unicorn.png'

const Container = styled.div`
  position: absolute;
  display: flex;
  bottom: 0;
  right: 0;
  z-index: 1;
  transform: translate(130px, 110px);
  display: none;
  ${({ theme }) => theme.mediaQueries.md} {
    display: flex;
  }
`

const BubbleWrapperContainer = styled.div`
  transform: translate(35px, 40%);

  ${({ theme }) => theme.mediaQueries.sm} {
    bottom: 3%;
  }
`

const BubbleWrapper = styled(Flex)`
  svg {
    fill: ${({ theme }) => theme.colors.textSubtle};
    transition: background-color 0.2s, opacity 0.2s;
  }
  &:hover {
    svg {
      opacity: 0.65;
    }
  }
  &:active {
    svg {
      opacity: 0.85;
    }
  }
`

const ImageWrapper = styled(Image)`
  -webkit-transform: scaleX(-1) !important;
  transform: scaleX(-1) !important;
`

type Props = {
  helpUrl: string
}

const BubbleHelper = ({ helpUrl }: Props) => {
  const { t } = useTranslation()

  return (
    <Container>
      <BubbleWrapperContainer>
        <BubbleWrapper>
          <Button id="clickExchangeHelp" as="a" external href={helpUrl} variant="subtle">
            {t('Need help ?')}
          </Button>
          <Svg viewBox="0 0 16 16">
            <path d="M0 16V0C0 0 3 1 6 1C9 1 16 -2 16 3.5C16 10.5 7.5 16 0 16Z" />
          </Svg>
        </BubbleWrapper>
      </BubbleWrapperContainer>
      <ImageWrapper src={lotteryImage} width={180} height={180} alt="LotteryBanner" placeholder="blur" />
    </Container>
  )
}

export default BubbleHelper
