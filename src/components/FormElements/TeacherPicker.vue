<template>
  <q-select
    :class="classes"
    :value="value"
    @input="$emit('input', $event)"
    :options="teacherOptions"
    :label="label"
    outlined
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
      apiFetch('account/teacher/list',
        {department: dept},
        `teachers of ${dept ? dept : 'all'}`)
        .then(response => {
          this.teacherList = response.data.map(x => {
            return {
              value: x.id,
              label: `(${x.id}) ${x.name}`
            }
          })
          if (typeof this.value === 'string') {
            const cur = this.teacherList.filter(x => x.value === this.value)[0]
            this.$emit('input', cur)
          }
        })
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
