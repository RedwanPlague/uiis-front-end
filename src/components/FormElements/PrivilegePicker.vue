<template>
  <q-select
    :class="classes"
    :value="value"
    @input="$emit('input', $event)"
    :options="options"
    :label="label"
    :readonly="readonly"
    outlined
    :use-chips="multiple"
    :multiple="multiple"
    :clearable="multiple"
    use-input
    input-debounce="0"
    @filter="optionFilter"
    :rules="[() => !required || multiple || !!value || `Please Select ${label}`]"
  >
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey">
          No results
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script>
import picker from 'src/mixins/picker'
import {PRIVILEGES} from 'src/utils/constants'

export default {
  name: 'PrivilegePicker',
  mixins: [
    picker
  ],
  methods: {
    loadPrivileges() {
      this.mainList = Object.values(PRIVILEGES).map(x => {
        return {
          value: x,
          label: x
        }
      })
      this.fixValue()
    },
  },
  created() {
    this.loadPrivileges()
  },
  watch: {
    privilegeList() {
      this.loadPrivileges()
    }
  }
}
</script>

<style scoped>

</style>
