<template>
  <q-select
    :class="classes"
    :value="value"
    @input="$emit('input', $event)"
    :options="deptOptions"
    :label="label"
    outlined
    :rules="[() => !!value || `Please Select a ${label}`]"
    use-input
    @filter="deptFilter"
  ></q-select>
</template>

<script>
import apiFetch from 'src/utils/apiFetch'
import {isSubstring} from 'src/utils/patternSearch'

export default {
  name: 'DepartmentPicker',
  props: {
    label: {
      type: String,
      default: 'Department'
    },
    value: {
      type: Object,
      default: null
    },
    classes: {
      type: [Object, String]
    }
  },
  data() {
    return {
      deptList: [],
      deptOptions: []
    }
  },
  methods: {
    fetchDepartments() {
      apiFetch('/department/list', null, 'All dept list')
        .then(response => {
          this.deptList = response.data.map(x => {
            return {
              value: x.id,
              label: x.id
            }
          })
        })
    },
    deptFilter(value, update) {
      if (value === '') {
        update(() => {
          this.deptOptions = this.deptList
        })
        return
      }
      update(() => {
        this.deptOptions = this.deptList.filter(x => isSubstring(x.label, value))
      })
    }
  },
  created() {
    this.fetchDepartments()
  }
}
</script>

<style scoped>

</style>
