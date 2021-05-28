const columnMerger = (columns, common) => {
  for (const prop of ['style', 'headerStyle']) {
    if (common.hasOwnProperty(prop)) {
      for (let i = 0; i < columns.length; i++) {
        if (columns[i].hasOwnProperty(prop)) {
          columns[i][prop] += ';' + common[prop]
        } else {
          columns[i][prop] = common[prop]
        }
      }
    }
  }
}

export default columnMerger
