const process = data => {
  const toIgnore = [null, '', [], {}]
  for (const key of Object.keys(data)) {
    if (toIgnore.includes(data[key])) {
      delete data[key]
    }
    else if (typeof data[key] === 'object') {
      data[key] = data[key].value
    }
  }
}

export {process}
