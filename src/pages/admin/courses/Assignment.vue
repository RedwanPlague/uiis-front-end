<template>
  <q-page padding>
    <div class="text-h5 q-my-md">
      Assign Course for Current Session
    </div>
    <q-form class="row q-col-gutter-md">
      <q-select
        class="col-6"
        v-model="course"
        :options="courseOptions"
        label="Course"
        outlined
        :rules="[() => !!course || 'Please Select a Course']"
        use-input
        @filter="courseFilter"
      ></q-select>
      <q-input
        class="col-6"
        value=""
        label="Session"
        outlined
      ></q-input>
      <q-input
        class="col-6"
        v-model="totalEvalCount"
        label="Total Evaluation Count"
        type="number"
        outlined
        :rules="[() => !!totalEvalCount || 'Please Fill this Field']"
      ></q-input>
      <q-input
        class="col-6"
        v-model="consideredEvalCount"
        label="Considered Evaluation Count"
        type="number"
        outlined
        :rules="[() => !!consideredEvalCount || 'Please Fill this Field']"
      ></q-input>
      <q-input
        class="col-6"
        v-model="totalMarks"
        label="Total Marks"
        type="number"
        outlined
        :rules="[() => !!totalMarks || 'Please Fill this Field']"
      ></q-input>
      <q-input
        class="col-6"
        v-model="evalWeight"
        label="Per Evaluation Weight"
        type="number"
        outlined
        :rules="[() => !!evalWeight || 'Please Fill this Field']"
      ></q-input>
      <q-input
        class="col-6"
        v-model="attendanceWeight"
        label="Attendance Weight"
        type="number"
        outlined
        :rules="[() => !!attendanceWeight || 'Please Fill this Field']"
      ></q-input>
    </q-form>
  </q-page>
</template>

<script>
import courses from 'src/mixins/courses'

export default {
  name: 'CourseAssignment',
  data() {
    return {
      course: '',
      totalEvalCount: '',
      consideredEvalCount: '',
      totalMarks: '',
      evalWeight: '',
      attendanceWeight: '',
      teachers: [],
      schedule: [],
      examiners: [],
      resultAccessHolders: [],
      scrutinizers: []
    }
  },
  mixins: [
    courses
  ]
}
</script>

<style scoped>

</style>
