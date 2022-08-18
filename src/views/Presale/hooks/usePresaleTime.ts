export enum ReleaseStatus {
  NOTYET = 'notyet',
  PENDING = 'pending',
  DONE = 'done',
}

const usePresaleTime = () => {
  const DAY_RELEASE_TOKEN = 10
  const START_TIME_RELEASE_TOKEN = new Date(2022, 9, 1)
  const nowTimestamp = Date.now()
  // const nowTimestamp = new Date(2025, 9, 1).getTime()

  // const startDay = START_TIME_RELEASE_TOKEN.getUTCDate()
  const startMonth = START_TIME_RELEASE_TOKEN.getUTCMonth() + 1 // months from 1-12
  let startYear = START_TIME_RELEASE_TOKEN.getUTCFullYear()

  const arrayReleaseToken: Date[] = []
  let i = 0
  let currentMonth = startMonth
  while (i < 20) {
    if (currentMonth <= 12) {
      const day = new Date(startYear, currentMonth - 1, DAY_RELEASE_TOKEN)
      arrayReleaseToken.push(day)
    } else {
      currentMonth = 1
      startYear++
      const day = new Date(startYear, currentMonth - 1, DAY_RELEASE_TOKEN)
      arrayReleaseToken.push(day)
    }
    currentMonth++
    i++
  }

  const timestampArray = arrayReleaseToken.map((el) => el.getTime())

  let endtime = 0
  for (i = 0; i < timestampArray.length; i++) {
    if (timestampArray[i] > nowTimestamp) {
      endtime = timestampArray[i]
      break
    }
  }

  let status: ReleaseStatus
  if (nowTimestamp < START_TIME_RELEASE_TOKEN.getTime()) {
    status = ReleaseStatus.NOTYET
  } else if (endtime === 0) {
    status = ReleaseStatus.DONE
  } else {
    status = ReleaseStatus.PENDING
  }

  return { endtime, status }
}

export default usePresaleTime
