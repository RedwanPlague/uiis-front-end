<template>
  <q-select
    :class="classes"
    :value="value"
    @input="$emit('input', $event)"
    :options="slotOptions"
    :label="label"
    :rules="[() => !required || !!value || `Please Select ${label}`]"
    :use-chips="multiple"
    :multiple="multiple"
    :clearable="multiple"
    outlined
  />
</template>

<script>
import {apiFetch} from 'src/utils/apiWrappers'
import {secondsToAMPM} from 'src/utils/dateFormatters'

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
    required: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      slotOptions: [],
    }
  },
  methods: {
    fetchSlots() {
      apiFetch('/slot/list')
        .then(response => {
          this.slotOptions = response.data.map(x => {
            return {
              value: x.id,
              label: `(${x.id}) ${secondsToAMPM(x.startingTime)} - ${x.duration} minutes`
            }
          })
        })
    }
  },
  created() {
    this.fetchSlots()
  }
}
</script>

<style scoped>

</style>
