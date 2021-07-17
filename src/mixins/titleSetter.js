function getTitle (vm) {
  const { title } = vm.$options
  if (title) {
    return typeof title === 'function' ? title.call(vm) : title
  }
}

const titleSetter = {
  methods: {
    setTitle () {
      const title = getTitle(this)
      if (title) {
        document.title = title
      }
    }
  },
  created () {
    this.setTitle()
  }
}

export default titleSetter
