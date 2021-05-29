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
      type: [Object, Array],
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
      courseOptions: [],
      courseList: []
    }
  },
  methods: {
    fetchCourseList() {
      apiFetch('/course/list', null, 'all courses')
        .then(response => {
          this.courseList = response.data.map(x => {
            return {
              value: `${x.courseID}${x.syllabusID}`,
              label: `${x.courseID}(${x.syllabusID}): ${x.title}`
            }
          })
        }).catch()
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
  }
}
</script>

<style scoped>

</style>
