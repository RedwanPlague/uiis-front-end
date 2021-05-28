const pad = num => {
  return num.toString().padStart(2, '0')
}

const secondsToAMPM = seconds => {
  seconds %= 86400
  console.log(seconds)
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

export {secondsToAMPM}
