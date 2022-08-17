import styled from 'styled-components'
import { Flex, Heading } from '@pancakeswap/uikit'

export interface TimerProps {
  seconds?: number
  minutes?: number
  hours?: number
  days?: number
  wrapperClassName?: string
}

const StyledTimerFlex = styled(Flex)<{ showTooltip?: boolean }>`
  ${({ theme, showTooltip }) => (showTooltip ? ` border-bottom: 1px dashed ${theme.colors.textSubtle};` : ``)}
  div:last-of-type {
    margin-right: 0;
  }
`

const StyledTimerText = styled(Heading)`
  background: ${({ theme }) => theme.colors.gradients.gold};
  font-family: 'Kanit', sans-serif;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 40px;
`

const StyledTimerText2 = styled(Heading)`
  background: ${({ theme }) => theme.colors.gradients.gold};
  -webkit-background-clip: text;
  font-family: 'Kanit', sans-serif;
  -webkit-text-fill-color: transparent;
`

const Wrapper: React.FC<React.PropsWithChildren<TimerProps>> = ({
  minutes,
  hours,
  days,
  seconds,
  wrapperClassName,
}) => {
  return (
    <StyledTimerFlex alignItems="flex-end" className={wrapperClassName} className="StyledTimerFlex">
      {Boolean(days) && (
        <>
          <StyledTimerText mb="-4px" scale="xl" mr="4px" className="StyledTimerText">
            {days}
          </StyledTimerText>
          <StyledTimerText2 mr="12px">d</StyledTimerText2>
        </>
      )}
      {Boolean(hours) && (
        <>
          <StyledTimerText mb="-4px" scale="xl" mr="4px">
            {hours}
          </StyledTimerText>
          <StyledTimerText2 mr="12px">h</StyledTimerText2>
        </>
      )}
      {Boolean(minutes) && (
        <>
          <StyledTimerText mb="-4px" scale="xl" mr="4px">
            {minutes}
          </StyledTimerText>
          <StyledTimerText2 mr="12px">m</StyledTimerText2>
        </>
      )}
      {Boolean(seconds) && (
        <>
          <StyledTimerText mb="-4px" scale="xl" mr="4px">
            {seconds}
          </StyledTimerText>
          <StyledTimerText2 mr="12px">s</StyledTimerText2>
        </>
      )}
    </StyledTimerFlex>
  )
}

export default Wrapper
