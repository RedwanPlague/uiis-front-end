<template>
  <q-input
    :class="classes"
    :label="label"
    :value="value"
    outlined
    :readonly="readonly"
    input-class="cursor-pointer"
    @input="$emit('input', $event)"
    @click="$refs.monthPicker.show()"
    :rules="[() => !required || !!value || `Please Enter ${label}`]"
  >
    <template v-slot:append v-if="!readonly">
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy ref="monthPicker" transition-show="scale" transition-hide="scale">
          <q-date
            minimal
            mask="MMM YYYY"
            emit-immediately
            default-view="Years"
            :value="value"
            @input="checkValue"
          />
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script>
import {dateToMonthYear, monthYearToDate} from 'src/utils/dateFormatters'
import {apiFetch} from 'src/utils/apiWrappers'

export default {
  name: 'SessionField',
  props: {
    label: {
      type: String,
      default: 'Session'
    },
    value: {
      type: String,
      default: null
    },
    classes: {
      type: [Object, String]
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
  methods: {
    monthYearToDate,
    checkValue (val, reason/*, details*/) {
      if (reason === 'month') {
        this.$refs.monthPicker.hide()
      }
      this.$emit('input', val)
    },
    fetchCurrentSession() {
      apiFetch('/currentSession', null, 'Current Session')
        .then(response => {
          this.$emit('input', dateToMonthYear(response.data.session))
        })
    }
  },
  created() {
    this.fetchCurrentSession()
  }
}
</script>

<style scoped>

</style>
