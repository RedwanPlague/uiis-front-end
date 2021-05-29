<template>
  <q-select
    :class="classes"
    :value="value"
    @input="$emit('input', $event)"
    :options="teacherOptions"
    :label="label"
    :filled="!required"
    :outlined="required"
    :readonly="readonly"
    :rules="[() => !required || !!value || `Please Assign ${label}`]"
    :use-chips="multiple"
    :multiple="multiple"
    :clearable="multiple"
    use-input
    @filter="teacherFilter"
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
  name: 'TeacherPicker',
  props: {
    label: {
      type: String,
      default: 'Teacher'
    },
    value: {
      type: [Object, Array, String],
      default: null
    },
    department: {
      type: String,
      default: 'CSE'
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
      teacherList: [],
      teacherOptions: [],
    }
  },
  methods: {
    fetchTeachers(dept) {
      if (dept) {
        apiFetch('account/teacher/list', {dept}, `teachers of ${dept}`)
          .then(response => {
            this.teacherList = response.data.map(x => {
              return {
                value: x.id,
                label: `(${x.id}) ${x.name}`
              }
            })
          })
      }
    },
    teacherFilter(value, update) {
      if (value === '') {
        update(() => {
          this.teacherOptions = this.teacherList
        })
        return
      }
      update(() => {
        this.teacherOptions = this.teacherList.filter(x => isSubstring(x.label, value))
      })
    },
  },
  created() {
    this.fetchTeachers(this.department)
  },
  watch: {
    department: {
      handler(newVal, oldVal) {
        this.fetchTeachers(newVal)
      }
    }
  }
}
</script>

<style scoped>

</style>
