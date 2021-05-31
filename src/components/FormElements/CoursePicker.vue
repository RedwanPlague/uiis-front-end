<template>
  <q-select
    :class="classes"
    :value="value"
    @input="$emit('input', $event)"
    :options="courseOptions"
    :label="label"
    outlined
    :readonly="readonly"
    :rules="[() => !required || multiple || !!value || `Please Select ${label}`]"
    :use-chips="multiple"
    :multiple="multiple"
    :clearable="multiple"
    use-input
    @filter="courseFilter"
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
import {isSubstring} from 'src/utils/patternSearch'
import {apiFetch} from 'src/utils/apiWrappers'

export default {
  name: 'CoursePicker',
  props: {
    label: {
      type: String,
      default: 'Course'
    },
    value: {
      type: [Object, Array, String],
      default: null,
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
      courseOptions: [],
      courseList: []
    }
  },
  methods: {
    fixValue(value) {
      if (this.courseList.length === 0) return
      if (Array.isArray(value)) {
        const format = value.map(x => JSON.stringify(x))
        const cur = this.courseList.filter(x => format.includes(JSON.stringify(x.value)))
        this.$emit('input', cur)
      }
      else if (typeof value === 'string') {
        const cur = this.courseList.filter(x => x.value === value)[0]
        this.$emit('input', cur)
      }
      // else if (typeof value === 'object' && !value.hasOwnProperty('value')) {
      //   const cur = this.courseList.filter(x => JSON.stringify(x.value) === JSON.stringify(value))[0]
      //   this.$emit('input', cur)
      // }
    },
    fetchCourseList() {
      apiFetch('/course/list', null, 'all courses')
        .then(response => {
          this.courseList = response.data.map(x => {
            return {
              value: {
                courseID: x.courseID,
                syllabusID: x.syllabusID
              },
              label: `${x.courseID}(${x.syllabusID}): ${x.title}`
            }
          })
          this.fixValue(this.value)
        })
    },
    courseFilter(value, update) {
      if (value === '') {
        update(() => {
          this.courseOptions = this.courseList
        })
        return
      }
      update(() => {
        this.courseOptions = this.courseList.filter(x => isSubstring(x.label, value))
      })
    }
  },
  created() {
    this.fetchCourseList()
  },
  // watch: {
  //   value: {
  //     handler(newVal/*, oldVal*/) {
  //       this.fixValue(newVal)
  //     }
  //   },
  // }
}
</script>

<style scoped>

</style>
