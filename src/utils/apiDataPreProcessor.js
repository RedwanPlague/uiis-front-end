const process = data => {
  const toIgnore = [null, '']
  for (const key of Object.keys(data)) {
    if (toIgnore.includes(data[key])) {
      delete data[key]
    }
  }
}

const extract = data => {
  if (Array.isArray(data)) {
    return data.map(x => x.value)
  }
  if (typeof data === 'string') {
    return data
  }
  return data ? data.value : null
}

export {process, extract}
