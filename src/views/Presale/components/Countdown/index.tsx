import { Flex, Heading, Skeleton } from '@pancakeswap/uikit'
import getTimePeriods from 'utils/getTimePeriods'
import useNextEventCountdown from 'views/Presale/hooks/useNextEventCountdown'
import Timer from './Timer'
// import useNextEventCountdown from '../../hooks/useNextEventCountdown'

interface CountdownProps {
  nextEventTime: number
  preCountdownText?: string
  postCountdownText?: string
}

const Countdown: React.FC<React.PropsWithChildren<CountdownProps>> = ({
  nextEventTime,
  preCountdownText,
  postCountdownText,
}) => {
  const secondsRemaining = useNextEventCountdown(nextEventTime / 1000)
  const { days, hours, minutes, seconds } = getTimePeriods(secondsRemaining)

  return (
    <>
      {secondsRemaining ? (
        <Flex display="inline-flex" justifyContent="flex-end" alignItems="flex-end" className="countdown-flex">
          {preCountdownText && (
            <Heading mr="12px" color="#ffff">
              {preCountdownText}
            </Heading>
          )}
          <Timer
            minutes={minutes + 1} // We don't show seconds - so values from 0 - 59s should be shown as 1 min
            hours={hours}
            days={days}
            seconds={seconds}
          />
          {postCountdownText && <Heading color="#ffff">{postCountdownText}</Heading>}
        </Flex>
      ) : (
        <Skeleton height="41px" width="250px" />
      )}
    </>
  )
}

export default Countdown
