const charset = '' +
  'abcdefghijklmnopqrstuvwxyz' +
  'ABCDEFGHIJKNOPQRSTUVWXYZ' +
  '1234567890' +
  '@#$%^&'

// return a random integer in range [l, r]
const getRandomInt = (l, r) => {
  return l + Math.floor(Math.random() * (r - l + 1))
}

const passwordGenerator = () => {
  const minLen = 10, maxLen = 10
  const len = getRandomInt(minLen, maxLen)

  let password = ''
  for (let i = 0; i < len; i++) {
    password += charset[getRandomInt(0, charset.length - 1)]
  }

  return password
}

export default passwordGenerator
