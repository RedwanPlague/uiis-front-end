<template>
  <q-page padding>
    <div class="text-h5 q-my-md">
      Create New Course
    </div>
    <q-form class="row q-col-gutter-md">
      <department-picker
        label="Department (offered to)"
        v-model="deptFor"
      ></department-picker>
      <department-picker
        label="Department (offered from)"
        v-model="deptFrom"
      ></department-picker>
      <q-input
        class="col-6"
        v-model="syllabusID"
        label="Syllabus ID"
        outlined
        :rules="[() => !!syllabusID || 'Please Enter a SyllabusID']"
      ></q-input>
      <q-input
        class="col-6"
        v-model="title"
        label="Title"
        outlined
        :rules="[() => !!title || 'Please Enter a Title']"
      ></q-input>
      <q-input
        class="col-12"
        v-model="name"
        label="Name"
        outlined
        :rules="[() => !!name || 'Please Enter a Name']"
      ></q-input>
      <q-input
        class="col-4"
        v-model="level"
        label="Level"
        outlined
        :rules="[() => !!level || 'Please Enter a Level']"
      ></q-input>
      <q-input
        class="col-4"
        v-model="term"
        label="Term"
        outlined
        :rules="[() => !!term || 'Please Enter a Level']"
      ></q-input>
      <q-input
        class="col-4"
        v-model="credit"
        label="Credit"
        type="number"
        step="0.25"
        outlined
        :rules="[() => !!credit || 'Please Enter a Level']"
      ></q-input>
      <q-select
        class="col-12 q-pb-md"
        v-model="prerequisitesSelected"
        :options="courseOptions"
        label="Prerequisites"
        outlined
        use-chips
        multiple
        clearable
        use-input
        input-debounce="0"
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
      <q-input
        class="col-12 q-pb-md"
        v-model="description"
        label="Description"
        type="textarea"
        rows="10"
        outlined
      ></q-input>
      <div class="col-12">
        <q-btn label="Create" color="primary" unelevated @click="createCourse" :loading="createLoading"></q-btn>
        <q-btn label="Reset" color="primary" flat @click="resetForm"></q-btn>
      </div>
    </q-form>
    <div style="min-height: 200px"></div>
  </q-page>
</template>

<script>
import courses from 'src/mixins/courses'
import {isSubstring} from 'src/utils/patternSearch'
import DepartmentPicker from 'components/FormElements/DepartmentPicker'

export default {
  name: 'CourseCreation',
  components: {DepartmentPicker},
  data() {
    return {
      title: '',
      name: '',
      syllabusID: '',
      deptFrom: '',
      deptFor: '',
      level: '',
      term: '',
      credit: '',
      prerequisitesSelected: [],
      description: '',
      createLoading: false
    }
  },
  mixins: [
    courses
  ],
  methods: {
    createCourse() {
      this.createLoading = true
      setInterval(() => {
        this.createLoading = false
      }, 1000)
    },
    resetForm() {
      this.title = ''
      this.name = ''
      this.syllabusID = ''
      this.deptFrom = ''
      this.deptFor = ''
      this.level = ''
      this.term = ''
      this.credit = ''
      this.prerequisitesSelected = []
      this.description = ''
    }
  },
}
</script>
