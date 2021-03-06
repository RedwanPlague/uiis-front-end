const isEmpty = obj => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false
    }
  }
  return true
}

const deepEqual = (obj1, obj2) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2)
}

const numEqual = (num1, num2) => {
  if (!num1) num1 = ''
  if (!num2) num2 = ''
  return num1.toString() === num2.toString()
}

const deepCopy = obj => {
  return JSON.parse(JSON.stringify(obj))
}

const noNegative = value => {
  return () => !value || parseFloat(value) >= 0 || 'Negative value not allowed'
}

export {
  isEmpty,
  deepEqual,
  numEqual,
  deepCopy,
  noNegative
}
