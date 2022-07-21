import { Button, Flex, Svg } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'

const BubbleWrapperContainer = styled.div`
  display: flex;
  bottom: 0;
  right: 0;
  position: absolute;

  ${({ theme }) => theme.mediaQueries.sm} {
    bottom: 5%;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    bottom: 10%;
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

type Props = {
  helpUrl: string
}

const BubbleHelper = ({ helpUrl }: Props) => {
  const { t } = useTranslation()

  return (
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
  )
}

export default BubbleHelper
