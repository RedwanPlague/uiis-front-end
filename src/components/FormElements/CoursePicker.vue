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
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'CoursePicker',
  mixins: [
    picker
  ],
  computed: {
    ...mapGetters('admin', [
      'courseList'
    ])
  },
  methods: {
    ...mapActions('admin', [
      'loadCourses'
    ]),
    fetchCourseList() {
      this.loadCourses().then(() => {
        this.mainList = this.courseList
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
