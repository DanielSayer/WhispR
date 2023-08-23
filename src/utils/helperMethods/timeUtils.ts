type TimeDuration = {
  minutes: number
  hours: number
  days: number
  weeks: number
}

const secondsInMinute = 60
const secondsInHour = secondsInMinute * 60
const secondsInDay = secondsInHour * 24
const secondsInWeek = secondsInDay * 7

export const generateTimeElapsed = (time: number): TimeDuration => {
  const timeNow = Date.now()
  const diff = timeNow - time

  if (diff < 0) return { minutes: 0 } as TimeDuration

  let diffSeconds = diff / 1000

  const weeks = Math.floor(diffSeconds / secondsInWeek)
  diffSeconds = diffSeconds - secondsInWeek * weeks

  const days = Math.floor(diffSeconds / secondsInDay)
  diffSeconds = diffSeconds - secondsInDay * days

  const hours = Math.floor(diffSeconds / secondsInHour)
  diffSeconds = diffSeconds - secondsInHour * hours

  const minutes = Math.floor(diffSeconds / secondsInMinute)

  return {
    minutes: minutes,
    hours: hours,
    days: days,
    weeks: weeks,
  }
}

export const timeToMessage = (time: TimeDuration): string => {
  if (time.weeks >= 1) return "Over a week ago"
  if (time.days > 1) return `${time.days} days ago`
  if (time.days === 1) return "Yesterday"
  if (time.hours > 1) return `${time.hours} hours ago`
  if (time.hours === 1) return "An hour ago"
  if (time.minutes > 1) return `${time.minutes} minutes ago`
  if (time.minutes === 1) return "1 minute ago"
  return "just now"
}
