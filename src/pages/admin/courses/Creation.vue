<template>
  <q-page padding>
    <div class="text-h5 q-my-md">
      Create New Course
    </div>
    <q-form class="row q-col-gutter-md" @submit="createCourse" @reset="resetForm">
      <department-picker
        classes="col-6"
        label="Department (offered to)"
        v-model="deptFor"
        required
      />
      <department-picker
        classes="col-6"
        label="Department (offered from)"
        v-model="deptFrom"
        required
      />
      <q-input
        class="col-6"
        v-model="syllabusID"
        label="Syllabus ID"
        outlined
        :rules="[() => !!syllabusID || 'Please Enter Syllabus ID']"
      />
      <q-input
        class="col-6"
        v-model="courseID"
        label="Course ID"
        outlined
        :rules="[() => !!courseID || 'Please Enter Course ID']"
      />
      <q-input
        class="col-12"
        v-model="title"
        label="Title"
        outlined
        :rules="[() => !!title || 'Please Enter Title']"
      />
      <q-input
        class="col-4"
        v-model="level"
        label="Level"
        outlined
        type="number"
        min="1" max="4"
        :rules="[() => !!level || 'Please Enter Level']"
      />
      <q-input
        class="col-4"
        v-model="term"
        label="Term"
        outlined
        type="number"
        min="1" max="2"
        :rules="[() => !!term || 'Please Enter Term']"
      />
      <q-input
        class="col-4"
        v-model="credit"
        label="Credit"
        type="number"
        min="0"
        step="0.25"
        outlined
        :rules="[() => !!credit || 'Please Enter Credit']"
      />
      <course-picker
        classes="col-12"
        label="Prerequisites"
        v-model="prerequisites"
        multiple
        required
      />
      <q-input
        class="col-12 q-pb-md"
        v-model="description"
        label="Description"
        type="textarea"
        rows="10"
        outlined
      />
      <div class="col-12">
        <q-btn label="Create" type="submit" color="primary" unelevated :loading="createLoading"/>
        <q-btn label="Reset" type="reset" color="primary" flat/>
      </div>
    </q-form>
    <div style="min-height: 200px"></div>
  </q-page>
</template>

<script>
import DepartmentPicker from 'components/FormElements/DepartmentPicker'
import CoursePicker from 'components/FormElements/CoursePicker'
import creator from 'src/mixins/creator'

export default {
  name: 'CourseCreation',
  components: {
    CoursePicker,
    DepartmentPicker
  },
  mixins: [
    creator
  ],
  data() {
    return {
      title: '',
      courseID: '',
      syllabusID: '',
      deptFrom: null,
      deptFor: null,
      level: '',
      term: '',
      credit: '',
      prerequisites: [],
      description: '',
    }
  },
  methods: {
    createCourse() {
      this.callCreateApi('/course/create', {
        title: this.title,
        courseID: this.courseID,
        syllabusID: this.syllabusID,
        offeredToDepartment: this.deptFor,
        offeredByDepartment: this.deptFrom,
        level: this.level,
        term: this.term,
        credit: this.credit,
        prerequisites: this.prerequisites,
        description: this.description
      }, 'Course')
    },
    resetForm() {
      this.title = ''
      this.courseID = ''
      this.syllabusID = ''
      this.deptFrom = null
      this.deptFor = null
      this.level = ''
      this.term = ''
      this.credit = ''
      this.prerequisites = []
      this.description = ''
    }
  },
}
</script>
