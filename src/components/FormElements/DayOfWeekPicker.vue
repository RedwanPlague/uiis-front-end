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
      type: [Object, Array],
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
  }
}
</script>

<style scoped>

</style>
