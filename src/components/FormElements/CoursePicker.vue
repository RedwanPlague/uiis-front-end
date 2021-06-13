<template>
  <q-select
    :class="classes"
    :value="value"
    @input="$emit('input', $event)"
    :options="options"
    :label="label"
    outlined
    :readonly="readonly"
    :rules="[() => !required || multiple || !!value || `Please Select ${label}`]"
    :use-chips="multiple"
    :multiple="multiple"
    :clearable="multiple"
    use-input
    @filter="optionFilter"
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
import {apiFetch} from 'src/utils/apiWrappers'

export default {
  name: 'CoursePicker',
  mixins: [
    picker
  ],
  methods: {
    fetchCourseList() {
      apiFetch('/course/list', null, 'all courses')
        .then(response => {
          this.mainList = response.data.map(x => {
            return {
              value: {
                courseID: x.courseID,
                syllabusID: x.syllabusID
              },
              label: `${x.courseID}(${x.syllabusID}): ${x.title}`
            }
          })
          this.fixValue()
        })
    },
  },
  created() {
    this.fetchCourseList()
  },
}
</script>

<style scoped>

</style>
