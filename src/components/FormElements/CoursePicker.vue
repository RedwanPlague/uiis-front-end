<template>
  <q-select
    :class="classes"
    :value="value"
    @input="$emit('input', $event)"
    :options="options"
    :label="label"
    outlined
    :readonly="readonly"
    :rules="[
      () => !required || multiple || !!value || `Please Select ${label}`,
      () => !required || !multiple || (Array.isArray(value) && value.length > 0) ||
      `Please Select At least one ${label}`
    ]"
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
  props: {
    onlyOffered: {
      type: Boolean,
      default: false
    }
  },
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
      'fetchCourseList'
    ]),
    useData(useList) {
      this.mainList = useList.map(x => {
        return {
          value: {
            courseID: x.courseID,
            syllabusID: x.syllabusID
          },
          label: `${x.courseID}(${x.syllabusID}) - ${x.title}`
        }
      })
      this.fixValue()
    },
    loadCourses() {
      if (this.onlyOffered) {
        this.$adminAPI.get('/currentSession/coursesToOfferWithTitle').then(response => {
          this.useData(response.data.coursesToOffer)
        })
      }
      else {
        this.fetchCourseList().then(() => {
          this.useData(this.courseList)
        })
      }
    },
  },
  created() {
    this.loadCourses()
  },
  watch: {
    courseList() {
      this.loadCourses()
    }
  }
}
</script>

<style scoped>

</style>
