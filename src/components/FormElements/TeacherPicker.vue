<template>
  <q-select
    :class="classes"
    :value="value"
    @input="$emit('input', $event)"
    :options="teacherOptions"
    :label="label"
    outlined
    :rules="[() => !!value || `Please Assign an ${label}`]"
    use-input
    @filter="teacherFilter"
  ></q-select>
</template>

<script>
import apiFetch from 'src/utils/apiFetch'
import {isSubstring} from 'src/utils/patternSearch'

export default {
  name: 'TeacherPicker',
  props: {
    label: {
      type: String,
      default: 'Teacher'
    },
    value: {
      type: Object,
      default: null
    },
    department: {
      type: String,
      default: null
    },
    classes: {
      type: [Object, String]
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
