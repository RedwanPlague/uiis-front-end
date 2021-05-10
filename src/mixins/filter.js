export default {
  methods: {
    filterMaker(optionName, listName) {
      return (value, update) => {
        if (value === '') {
          update(() => {
            this[optionName] = this[listName]
          })
          return
        }
        update(() => {
          const substring = value.toLowerCase()
          this[optionName] = this[listName].filter(x => x.label.toLowerCase().indexOf(substring) > -1)
        })
      }
    }
  }
}
