import {isSubstring} from 'src/utils/patternSearch'
import {deepEqual} from 'src/utils/utilities'

export default {
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: [Object, Array, String],
      default: null,
    },
    classes: {
      type: [Object, String],
      default: ''
    },
    multiple: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      options: [],
      mainList: []
    }
  },
  methods: {
    fixValue() {
      if (this.mainList.length === 0) return
      if (this.multiple) {
        if (Array.isArray(this.value) && this.value.length > 0) {
          if (this.mainList.includes(this.value[0])) return
          const valueStrList = this.value.map(x => JSON.stringify(x))
          const newValue = this.mainList.filter(x => valueStrList.includes(JSON.stringify(x.value)))
          if (!deepEqual(this.value, newValue)) {
            this.$emit('input', newValue)
          }
        }
      }
      else {
        const valueStr = JSON.stringify(this.value)
        const match = this.mainList.find(x => JSON.stringify(x.value) === valueStr)
        if (match) {
          this.$emit('input', match)
        }
      }
    },
    optionFilter(value, update) {
      if (value === '') {
        update(() => {
          this.options = this.mainList
        })
        return
      }
      update(() => {
        this.options = this.mainList.filter(x => isSubstring(x.label, value))
      })
    }
  },
  watch: {
    value: {
      handler(newVal, oldVal) {
        this.fixValue()
      }
    },
  }
}
