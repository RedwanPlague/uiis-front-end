<template>
  <q-page padding>
    <div class="q-pa-md">
      <div class="text-h5">Grades</div><br />
      <div class="text-subtitle2">
        <p>
          <strong>Student ID:</strong> {{ getStudent.id }}
        </p>
        <p>
          <strong>Name:</strong> {{ getStudent.name }}
        </p>
        <p>
          <strong>Department:</strong> {{ getStudent.department }}
        </p>

        <div v-if="$route.query.filter === 'semester'">
          <strong>Level/Term:</strong> {{ $route.query.level }}/{{ $route.query.term }}
        </div>
        <div v-else-if="$route.query.filter === 'grade'">
          <strong>Grade:</strong> {{ $route.query.gradeLetter }}
        </div>
      </div><br />

      <q-table
        dense bordered :data="getAvailableGrades" :columns="getGradeColumns" row-key="courseID"
      /><br />

      <div v-if="$route.query.filter === 'semester'" class="row">
        <div class="text-subtitle2">
          <p>
            <strong>Registered Credit Hours in this Term:</strong> {{ getTotalCreditHour().toFixed(2) }}
          </p>
          <p>
            <strong>Credit Hours Earned in this Term:</strong> {{ getTotalCreditHourObtained().toFixed(2) }}
          </p>
          <p>
            <strong>Total Credit Hours:</strong> {{ getTotalCreditHoursCompleted().toFixed(2) }}
          </p>
        </div>

        <q-space />

        <q-card>
          <q-card-section>
            <div class="text-subtitle2">
              <p>
                <strong>Obtained GPA:</strong> {{ getGPA().toFixed(2) }}
              </p>
              <p>
                <strong>Current CGPA:</strong> {{ getCGPA().toFixed(2) }}
              </p>
            </div>
          </q-card-section>
        </q-card>
      </div><br />

      <div class="row">
        <q-space />
        <q-btn class="bg-primary text-white" label="Back" @click="visitInformationPage" />
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

    };
  },

  methods: {
    ...mapActions(['fetchStudentProfileInfo', 'fetchGrades', 'generateAvailableGrades']),

    getTotalCreditHourObtained() {
      let totalCredit = 0.0;

      for(let i=0; i<this.getAvailableGrades.length; i++) {
        if(this.getAvailableGrades[i].status === 'passed') {
          totalCredit += this.getAvailableGrades[i].credit;
        }
      }
      return totalCredit;
    },

    getTotalCreditHour() {
      let totalCredit = 0.0;

      for(let i=0; i<this.getAvailableGrades.length; i++) {
        totalCredit += this.getAvailableGrades[i].credit;
      }
      return totalCredit;
    },

    getGPA() {
      let sum = 0.0;

      for(let i=0; i<this.getAvailableGrades.length; i++) {
        sum += this.getAvailableGrades[i].credit*this.getAvailableGrades[i].gradePoint;
      }
      return sum/this.getTotalCreditHour();
    },

    getTotalCreditHoursCompleted() {
      /* NOTICE: this should change later */
      // return this.getStudent.totalCreditHoursCompleted;
      return 0.0;
    },

    getCGPA() {
      /* NOTICE: this should change later */
      // return this.getStudent.cgpa;
      return 0.0;
    },

    visitInformationPage() {
      this.$router.push({ name: 'adviseeInformation',
        params: {
          studentID: this.getStudent.id
        },
        query: {} });
    }
  },

  computed: mapGetters(['getStudent', 'getGrades', 'getAvailableGrades', 'getGradeColumns']),

  async created() {
    try {
      const loading = this.$q.notify({
        message: `Loading Grades`,
        position: "bottom-left",
        color: 'info',
        group: false, // required to be updatable
        timeout: 0, // we want to be in control when it gets dismissed
        spinner: true
      });

      await this.fetchStudentProfileInfo(this.$route.params.studentID);
      if(this.$route.query.filter === 'semester') {
        await this.fetchGrades({
          id: this.getStudent.id,
          filter: this.$route.query.filter,
          level: this.$route.query.level,
          term: this.$route.query.term
        });
      } else if(this.$route.query.filter === 'grade') {
        await this.fetchGrades({
          id: this.getStudent.id,
          filter: this.$route.query.filter,
          gradeLetter: this.$route.query.gradeLetter
        });
      }
      this.generateAvailableGrades();

      loading({
        color: 'positive',
        icon: 'done', // we add an icon
        spinner: false, // we reset the spinner setting so the icon can be displayed
        message: 'Grades Loaded',
        timeout: 1500 // we will timeout it in 2.5s
      });
    } catch(error) {
      console.log(error);
    }
  }
}
</script>

<style scoped>

</style>
