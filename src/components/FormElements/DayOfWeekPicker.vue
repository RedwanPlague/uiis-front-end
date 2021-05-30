<template>
  <q-select
    :class="classes"
    :value="value"
    @input="$emit('input', $event)"
    :label="label"
    :options="dayOptions"
    :rules="[() => !required || !!value || `Please Select ${label}`]"
    :use-chips="multiple"
    :multiple="multiple"
    :clearable="multiple"
    outlined
  />
</template>

<script>
const dayList = [
  {value: 'sat', label: 'Saturday'},
  {value: 'sun', label: 'Sunday'},
  {value: 'mon', label: 'Monday'},
  {value: 'tue', label: 'Tuesday'},
  {value: 'wed', label: 'Wednesday'},
  {value: 'thu', label: 'Thursday'},
  {value: 'fri', label: 'Friday'},
]

export default {
  name: 'DayOfWeekPicker',
  props: {
    label: {
      type: String,
      default: 'Day'
    },
    value: {
      type: [Object, Array, String],
      default: null
    },
    classes: {
      type: [Object, String]
    },
    multiple: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dayOptions: dayList
    }
  },
  methods: {
    fixValue(value) {
      if (typeof value === 'string') {
        const cur = this.dayOptions.filter(x => x.value === value)[0]
        this.$emit('input', cur)
      }
    },
  },
  created() {
    this.fixValue(this.value)
  },
  watch: {
    value: {
      handler(newVal/*, oldVal*/) {
        this.fixValue(newVal)
      }
    },
  }
}
</script>

<style scoped>

</style>
