const pad = num => {
  return num.toString().padStart(2, '0')
}

const secondsToAMPM = seconds => {
  seconds %= 86400
  seconds = (seconds - seconds % 60) / 60
  const m = seconds % 60
  let h = (seconds - m) / 60
  const z = (h < 12) ? 'AM' : 'PM'
  if (h === 0) {
    h = 12
  } else if (h > 12) {
    h -= 12
  }
  return `${pad(h)}:${pad(m)} ${z}`
}

const secondsToHour24 = seconds => {
  seconds %= 86400
  seconds = (seconds - seconds % 60) / 60
  const m = seconds % 60
  let h = (seconds - m) / 60
  return `${pad(h)}:${pad(m)}`
}

const hour24ToSeconds = hour24 => {
  const [h, m] = hour24.split(':').map(x => parseInt(x))
  return 60 * (60 * h + m)
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const monthYearToDate = monthYear => {
  const [m, y] = monthYear.split(' ')
  const date = new Date()
  date.setTime(0)
  date.setMonth(months.indexOf(m))
  date.setFullYear(y)
  return date
}

const dateToMonthYear = date => {
  date = new Date(date)
  return months[date.getMonth()] + ' ' + date.getFullYear()
}

export {
  secondsToAMPM,
  monthYearToDate,
  dateToMonthYear,
  secondsToHour24,
  hour24ToSeconds
}
