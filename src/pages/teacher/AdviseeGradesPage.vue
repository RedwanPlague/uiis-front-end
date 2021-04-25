<template>
  <q-page padding>
    <div class="q-pa-md">
      <div class="text-subtitle1">
        <strong>Student ID:</strong> {{ advisees.find(advisee => advisee.studentID === this.$route.params.studentID).studentID }}<br />
        <strong>Name:</strong> {{ advisees.find(advisee => advisee.studentID === this.$route.params.studentID).name }}<br />
        <strong>Department:</strong> {{ advisees.find(advisee => advisee.studentID === this.$route.params.studentID).department }}<br />
        <strong>Level/Term:</strong> {{ semesters.find(semester => semester.semesterID === this.$route.params.semesterID).level }}/{{ semesters.find(semester => semester.semesterID === this.$route.params.semesterID).term }}
      </div><br />

      <q-table
        dense bordered :data="grades" :columns="gradeColumns" row-key="courseID"
      /><br />

      <div class="row">
        <div class="text-subtitle1">
          <strong>Registered Credit Hours in this Term:</strong> {{ getTotalCreditHours(grades) }}<br />
          <strong>Credit Hours Earned in this Term:</strong> {{ getTotalCreditHours(grades) }}<br />
          <strong>Total Credit Hours:</strong> {{ getTotalCreditHours(grades) }}
        </div>

        <q-space />

        <q-card>
          <q-card-section>
            <div class="text-subtitle1">
              <strong>Obtained GPA:</strong> {{ getGPA(grades) }}<br />
              <strong>Current CGPA:</strong> {{ getGPA(grades) }}
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
/* creating dummy advisees array */
let advisees = [];

for(let i=0; i<30; i++) {
  advisees[i] = {
    studentID: 1605001+i,
    name: "student no."+(i+1),
    department: "CSE"
  };
}

/* creating dummy semester array */
let semesters = [];

for(let i=0; i<8; i++) {
  semesters[i] = {
    semesterID: i+1,
    level: Math.floor(i/2)+1,
    term: i%2+1
  };
}

/* creating dummy grades array */
let grades = [];

for(let i=0; i<10; i++) {
  grades[i] = {
    courseID: "CSE30"+i,
    courseTitle: "Course No."+(i+1),
    creditHours: 3.00,
    grade: "A+",
    gradePoint: 4.00
  };
}

export default {
  name: "AdviseeGradesPage",

  data() {
    return {
      advisees,  /* dummy advisees array */
      semesters,  /* dummy semester array */
      grades,  /* dummy grades array */

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
  }
}
</script>

<style scoped>

</style>
