<template>
  <q-select
    :class="classes"
    :value="value"
    @input="$emit('input', $event)"
    :options="slotOptions"
    :label="label"
    :rules="[() => !!value || `Please Select ${label}`]"
    :use-chips="multiple"
    :multiple="multiple"
    :clearable="multiple"
    outlined
  />
</template>

<script>
const dummy = [
  { startingTime: '8:00AM', duration: 50 },
  { startingTime: '9:00AM', duration: 50 },
  { startingTime: '10:00AM', duration: 50 },
  { startingTime: '11:00AM', duration: 50 },
  { startingTime: '12:00PM', duration: 50 },
]

export default {
  name: 'SlotPicker',
  props: {
    label: {
      type: String,
      default: 'Slot'
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
  },
  data() {
    return {
      slotOptions: []
    }
  },
  created() {
    this.slotOptions = dummy.map(x => {
      return {
        value: `${x.startingTime}-${x.duration}`,
        label: `${x.startingTime} - ${x.duration} mins`
      }
    })
  }
}
</script>

<style scoped>

</style>
