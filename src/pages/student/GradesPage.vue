<template>
  <q-page padding>
    <div v-if="isPageLoaded" class="q-pa-md">
      <q-card bordered>
        <q-card-section>
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
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <q-table
            bordered
            :data="getAvailableGrades"
            :columns="getGradeColumns"
            row-key="courseID"
            separator="cell"
          />
        </q-card-section>

        <q-card-section v-if="$route.query.filter === 'semester'" class="row">
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
        </q-card-section>

        <q-card-actions align="right">
          <q-btn class="bg-primary text-white" label="Back" @click="visitSemesterSelectionPage" />
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "GradesPage",

  data() {
    return {
      isPageLoaded: false
    };
  },

  methods: {
    ...mapActions(['fetchStudentIDInfo', 'fetchStudentProfileInfo', 'fetchGrades', 'generateAvailableGrades']),

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

    visitSemesterSelectionPage() {
      this.$router.push({ name: 'semesterSelection', params: {}, query: {} });
    }
  },

  computed: mapGetters(['getID', 'getStudent', 'getGrades', 'getAvailableGrades', 'getGradeColumns']),

  async created() {
    try {
      this.$q.loading.show({
        delay: 100,
        message: 'Loading...',
        messageColor: 'white'
      });

      await this.fetchStudentIDInfo();
      await this.fetchStudentProfileInfo(this.getID.id);
      if(this.$route.query.filter === 'semester') {
        await this.fetchGrades({
          id: this.getStudent.id,
          filter: this.$route.query.filter,
          level: this.$route.query.level,
          term: this.$route.query.term
        });
      }
      this.generateAvailableGrades();

      this.$q.loading.hide();
      this.isPageLoaded = !this.isPageLoaded;
    } catch(error) {
      console.log(error);
    }
  }
}
</script>

<style scoped>

</style>
