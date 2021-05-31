<template>
  <q-page padding>
    <div class="text-h5 q-my-md">
      {{label}} New Course
      <q-btn
        :icon="viewing ? 'edit' : 'visibility'"
        :color="viewing ? 'primary' : 'black'"
        @click="viewing = !viewing"
        flat dense
      />
    </div>
    <q-form class="row q-col-gutter-md" @submit="editCourse" @reset="resetForm">
      <q-input
        class="col-6"
        v-model="syllabusID"
        label="Syllabus ID"
        outlined
        readonly
        :rules="[() => !!syllabusID || 'Please Enter a Syllabus ID']"
      />
      <q-input
        class="col-6"
        v-model="courseID"
        label="Course ID"
        outlined
        readonly
        :rules="[() => !!courseID || 'Please Enter a Course ID']"
      />
      <department-picker
        classes="col-6"
        label="Department (offered to)"
        v-model="offeredToDepartment"
        required
        :readonly="viewing"
      />
      <department-picker
        classes="col-6"
        label="Department (offered by)"
        v-model="offeredByDepartment"
        required
        :readonly="viewing"
      />
      <q-input
        class="col-12"
        v-model="title"
        label="Title"
        outlined
        :readonly="viewing"
        :rules="[() => !!title || 'Please Enter a Title']"
      />
      <q-input
        class="col-4"
        v-model="level"
        label="Level"
        outlined
        :readonly="viewing"
        :rules="[() => !!level || 'Please Enter Level']"
      />
      <q-input
        class="col-4"
        v-model="term"
        label="Term"
        outlined
        :readonly="viewing"
        :rules="[() => !!term || 'Please Enter Term']"
      />
      <q-input
        class="col-4"
        v-model="credit"
        label="Credit"
        type="number"
        step="0.25"
        outlined
        :readonly="viewing"
        :rules="[() => !!credit || 'Please Enter Credit']"
      />
      <course-picker
        classes="col-12"
        label="Prerequisites"
        v-model="prerequisites"
        multiple
        required
        :readonly="viewing"
      />
      <q-input
        class="col-12 q-pb-md"
        v-model="description"
        label="Description"
        type="textarea"
        rows="10"
        outlined
        :readonly="viewing"
      />
      <div class="col-12">
        <q-btn label="Edit" type="submit" color="primary" unelevated/>
        <q-btn label="Reset" type="reset" color="primary" flat/>
      </div>
    </q-form>
    <q-inner-loading :showing="oldDataLoading"/>
    <div style="min-height: 200px"></div>
  </q-page>
</template>

<script>
import DepartmentPicker from 'components/FormElements/DepartmentPicker'
import CoursePicker from 'components/FormElements/CoursePicker'
import edit from 'src/mixins/edit'
import {extract} from 'src/utils/apiDataPreProcessor'

export default {
  name: 'CourseEdit',
  components: {
    CoursePicker,
    DepartmentPicker
  },
  mixins: [
    edit
  ],
  data() {
    return {
      title: null,
      courseID: null,
      syllabusID: null,
      offeredByDepartment: null,
      offeredToDepartment: null,
      level: null,
      term: null,
      credit: null,
      prerequisites: [],
      description: null,
    }
  },
  computed: {
    loadCourseID() {
      return this.$route.params.courseID
    },
    loadSyllabusID() {
      return this.$route.params.syllabusID
    }
  },
  methods: {
    editCourse() {
      const url = `/course/update/${this.loadCourseID}/${this.loadSyllabusID}`
      this.callEditApi(url, {
        title: this.title,
        offeredToDepartment: extract(this.offeredToDepartment),
        offeredByDepartment: extract(this.offeredByDepartment),
        level: this.level,
        term: this.term,
        credit: this.credit,
        prerequisites: extract(this.prerequisites),
        description: this.description
      }, 'Course')
    },
    resetForm() {
      this.loadOldDataIntoForm()
    }
  },
  created() {
    this.fetchOldData('/course/list', {
      courseID: this.loadCourseID,
      syllabusID: this.loadSyllabusID
    }, 'Course')
  }
}
</script>
