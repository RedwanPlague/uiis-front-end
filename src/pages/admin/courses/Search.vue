<template>
  <q-page padding>
    <div class="text-h5 q-my-md">
      Search New Course
    </div>
    <q-form class="row q-col-gutter-md" @submit="searchCourse" @reset="resetForm">
      <department-picker
        classes="col-6"
        label="Department (offered to)"
        v-model="deptFor"
      />
      <department-picker
        classes="col-6"
        label="Department (offered from)"
        v-model="deptFrom"
      />
      <q-input
        class="col-6"
        v-model="syllabusID"
        label="Syllabus ID"
        filled
      />
      <q-input
        class="col-6"
        v-model="title"
        label="Title"
        filled
      />
      <q-input
        class="col-12"
        v-model="name"
        label="Name"
        filled
      />
      <q-input
        class="col-3"
        v-model="level"
        label="Level"
        filled
      />
      <q-input
        class="col-3"
        v-model="term"
        label="Term"
        filled
      />
      <q-input
        class="col-3"
        v-model="creditMin"
        label="Credit Min"
        type="number"
        step="0.25"
        filled
      />
      <q-input
        class="col-3"
        v-model="creditMax"
        label="Credit Max"
        type="number"
        step="0.25"
        filled
      />
      <div class="col-12">
        <q-btn label="Create" type="submit" color="primary" unelevated/>
        <q-btn label="Reset" type="reset" color="primary" flat/>
      </div>
    </q-form>
    <div style="min-height: 200px"></div>
  </q-page>
</template>

<script>
import DepartmentPicker from 'components/FormElements/DepartmentPicker'
import search from 'src/mixins/creator'

export default {
  name: 'CourseSearch',
  components: {
    DepartmentPicker
  },
  mixins: [
    search
  ],
  data() {
    return {
      title: '',
      name: '',
      syllabusID: '',
      deptFrom: null,
      deptFor: null,
      level: '',
      term: '',
      creditMin: '',
      creditMax: '',
    }
  },
  methods: {
    searchCourse() {
      this.callSearchApi('/course/list', {
        title: this.title,
        name: this.name,
        syllabusID: this.syllabusID,
        offeredToDepartment: this.deptFor,
        offeredByDepartment: this.deptFrom,
        level: this.level,
        term: this.term,
        creditMin: this.creditMin,
        creditMax: this.creditMax,
      }, 'Course')
    },
    resetForm() {
      this.title = ''
      this.name = ''
      this.syllabusID = ''
      this.deptFrom = null
      this.deptFor = null
      this.level = ''
      this.term = ''
      this.creditMin = ''
      this.creditMax = ''
    }
  },
}
</script>
