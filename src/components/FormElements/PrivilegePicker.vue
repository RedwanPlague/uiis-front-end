<template>
  <q-select
    :class="classes"
    :value="value"
    @input="$emit('input', $event)"
    :options="privilegeOptions"
    :label="label"
    :readonly="readonly"
    :filled="!required"
    :outlined="required"
    :use-chips="multiple"
    :multiple="multiple"
    :clearable="multiple"
    use-input
    input-debounce="0"
    @filter="privilegeFilter"
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
import apiFetch from 'src/utils/apiFetch'
import {isSubstring} from 'src/utils/patternSearch'

export default {
  name: 'PrivilegePicker',
  props: {
    label: {
      type: String,
      default: 'Privilege'
    },
    value: {
      type: Array,
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
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      privilegeOptions: [],
      privilegeList: [],
    }
  },
  methods: {
    fetchPrivilegeList() {
      apiFetch('/account/privileges', null, 'List of ALL privileges')
        .then(response => {
          this.privilegeList = response.data
        })
    },
    privilegeFilter(value, update) {
      if (value === '') {
        update(() => {
          this.privilegeOptions = this.privilegeList
        })
        return
      }
      update(() => {
        this.privilegeOptions = this.privilegeList.filter(x => isSubstring(x, value))
      })
    },
  },
  created() {
    this.fetchPrivilegeList()
  }
}
</script>

<style scoped>

</style>
