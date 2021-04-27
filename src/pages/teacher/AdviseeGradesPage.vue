<template>
  <q-page padding>
    <div class="q-pa-md">
      <div class="text-subtitle1">
        <strong>Student ID:</strong> {{ getAdvisees.find(advisee => advisee.studentID === this.$route.params.studentID).studentID }}<br />
        <strong>Name:</strong> {{ getAdvisees.find(advisee => advisee.studentID === this.$route.params.studentID).name }}<br />
        <strong>Department:</strong> {{ getAdvisees.find(advisee => advisee.studentID === this.$route.params.studentID).department }}<br />
        <strong>Level/Term:</strong> {{ getSemesters.find(semester => semester.semesterID === this.$route.params.semesterID).level }}/{{ getSemesters.find(semester => semester.semesterID === this.$route.params.semesterID).term }}
      </div><br />

      <q-table
        dense bordered :data="getCourses" :columns="gradeColumns" row-key="courseID"
      /><br />

      <div class="row">
        <div class="text-subtitle1">
          <strong>Registered Credit Hours in this Term:</strong> {{ getTotalCreditHours(getCourses) }}<br />
          <strong>Credit Hours Earned in this Term:</strong> {{ getTotalCreditHours(getCourses) }}<br />
          <strong>Total Credit Hours:</strong> {{ getTotalCreditHours(getCourses) }}
        </div>

        <q-space />

        <q-card>
          <q-card-section>
            <div class="text-subtitle1">
              <strong>Obtained GPA:</strong> {{ getGPA(getCourses) }}<br />
              <strong>Current CGPA:</strong> {{ getGPA(getCourses) }}
            </div>
          </q-card-section>
        </q-card>
      </div><br />

      <div class="row">
        <q-space />
        <q-btn flat class="bg-primary text-white" label="Back" @click="visitSemesterSelectionPage" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "AdviseeGradesPage",

  data() {
    return {
      /* for tabulation */
      gradeColumns: [
        {
          name: 'courseID',
          required: true,
          label: 'Course ID',
          align: 'left',
          field: row => row.courseID,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'courseTitle',
          align: 'left',
          label: 'Course Title',
          field: 'courseTitle',
          sortable: true
        },
        {
          name: 'creditHours',
          align: 'left',
          label: 'Credit Hours',
          field: 'creditHours',
          sortable: true
        },
        {
          name: 'grade',
          align: 'left',
          label: 'Grade',
          field: 'grade',
          sortable: true
        },
        {
          name: 'gradePoint',
          align: 'left',
          label: 'Grade Point',
          field: 'gradePoint',
          sortable: true
        }
      ]
    };
  },

  methods: {
    ...mapActions(['fetchAdvisees', 'fetchCourses', 'fetchSemesters']),

    getTotalGradePoint(grades) {
      let sum = 0.0;
      for(let i=0; i<grades.length; i++) {
        sum += grades[i].gradePoint;
      }
      return sum;
    },

    getGPA(grades) {
      return this.getTotalGradePoint(grades)/grades.length;
    },

    getTotalCreditHours(grades) {
      let sum = 0.0;
      for(let i=0; i<grades.length; i++) {
        sum += grades[i].creditHours;
      }
      return sum;
    },

    visitSemesterSelectionPage() {
      this.$router.push({ name: 'adviseeSemesterSelection', params: {}});
    }
  },

  computed: mapGetters(['getAdvisees', 'getCourses', 'getSemesters']),

  created() {
    this.fetchAdvisees();
    this.fetchCourses();
    this.fetchSemesters();
  }
}
</script>

<style scoped>

</style>
