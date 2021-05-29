<template>
  <q-select
    :class="classes"
    :value="value"
    @input="$emit('input', $event)"
    :options="deptOptions"
    :label="label"
    :filled="!required"
    :outlined="required"
    :readonly="readonly"
    :rules="[() => !required || !!value || `Please Select a ${label}`]"
    use-input
    @filter="deptFilter"
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
import {apiFetch} from 'src/utils/apiWrappers'
import {isSubstring} from 'src/utils/patternSearch'

export default {
  name: 'DepartmentPicker',
  props: {
    label: {
      type: String,
      default: 'Department'
    },
    value: {
      type: [Object, String],
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
              label: `${x.id} - ${x.name}`
            }
          })
          if (typeof this.value === 'string') {
            const cur = this.deptList.filter(x => x.value === this.value)[0]
            this.$emit('input', cur)
          }
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
