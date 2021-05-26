const columnMerger = (column, common) => {
  for (const property in common) {
    if (common.hasOwnProperty(property)) {
      if (column.hasOwnProperty(property)) {
        column[property] += common[property]
      }
      else {
        column[property] = common[property]
      }
    }
  }
}
