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
import {numEqual} from 'src/utils/utilities'

export default {
  name: 'SlotPicker',
  props: {
    label: {
      type: String,
      default: 'Slot'
    },
    value: {
      type: [Object, Array, Number, String],
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
    fixValue(value) {
      if (typeof value === 'string' || typeof value === 'number') {
        const cur = this.slotOptions.filter(x => numEqual(x.value, value))[0]
        this.$emit('input', cur)
      }
    },
    fetchSlots() {
      apiFetch('/slot/list', null, 'Slots')
        .then(response => {
          this.slotOptions = response.data.map(x => {
            return {
              value: x.id,
              label: `(${x.id}) ${secondsToAMPM(x.startingTime)} - ${x.duration} minutes`
            }
          })
          this.fixValue(this.value)
        })
    }
  },
  created() {
    this.fetchSlots()
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
