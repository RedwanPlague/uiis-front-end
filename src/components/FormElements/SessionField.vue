<template>
  <q-input
    :class="classes"
    :label="label"
    :value="value"
    outlined
    :readonly="readonly"
    :input-class="{'cursor-pointer': !readonly}"
    @input="$emit('input', $event)"
    @click="!readonly ? $refs.monthPicker.show() : null"
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
import {dateToMonthYear} from 'src/utils/dateFormatters'
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
    },
    generic: {
      type: Boolean,
      default: false
    }
  },
  methods: {
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
    },
    preLoad() {
      if (this.generic) {
        this.$emit('input', dateToMonthYear(new Date()))
      } else {
        this.fetchCurrentSession()
      }
    }
  },
  created() {
    this.preLoad()
  },
  watch: {
    generic() {
      this.preLoad()
    }
  }
}
</script>

<style scoped>

</style>
