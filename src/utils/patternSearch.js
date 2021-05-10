const isSubstring = (text, pattern) => {
  return text.toLowerCase().indexOf(pattern.toLowerCase()) > -1
}

export {isSubstring}
