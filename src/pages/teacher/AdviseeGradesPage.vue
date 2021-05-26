<template>
  <q-page padding>
    <div class="q-pa-md">
      <div class="text-subtitle1">
        <strong>Student ID:</strong> {{ getAdvisee._id }} <br />
        <strong>Name:</strong> {{ getAdvisee.name }} <br />
        <strong>Department:</strong> {{ getAdvisee.department }} <br />
        <strong>Level/Term:</strong> {{ this.$route.params.level }}/{{ this.$route.params.term }}
      </div><br />

      <q-table
        dense bordered :data="grades" :columns="gradeColumns" row-key="courseID"
      /><br />

      <div class="row">
        <div class="text-subtitle1">
          <strong>Registered Credit Hours in this Term:</strong> {{ getTotalCreditHour() }}<br />
          <strong>Credit Hours Earned in this Term:</strong> {{ getTotalCreditHourObtained }}<br />
          <strong>Total Credit Hours:</strong> {{ getTotalCreditHoursCompleted() }}
        </div>

        <q-space />

        <q-card>
          <q-card-section>
            <div class="text-subtitle1">
              <strong>Obtained GPA:</strong> {{ getGPA() }}<br />
              <strong>Current CGPA:</strong> {{ getCGPA() }}
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
          name: 'title',
          align: 'left',
          label: 'Course Title',
          field: 'title',
          sortable: true
        },
        {
          name: 'credit',
          align: 'left',
          label: 'Credit Hours',
          field: 'credit',
          sortable: true
        },
        {
          name: 'gradeLetter',
          align: 'left',
          label: 'Grade',
          field: 'gradeLetter',
          sortable: true
        },
        {
          name: 'gradePoint',
          align: 'left',
          label: 'Grade Point',
          field: 'gradePoint',
          sortable: true
        }
      ],

      /* passed or failed courses' grades */
      grades: []
    };
  },

  methods: {
    ...mapActions(['fetchAdvisee', 'fetchGrades']),

    getTotalCreditHourObtained() {
      let totalCredit = 0.0;

      for(let i=0; i<this.grades.length; i++) {
        if(this.grades[i].status === 'passed') {
          totalCredit += this.grades[i].credit;
        }
      }
      return totalCredit;
    },

    getTotalCreditHour() {
      let totalCredit = 0.0;

      for(let i=0; i<this.grades.length; i++) {
        totalCredit += this.grades[i].credit;
      }
      return totalCredit;
    },

    getGPA() {
      let sum = 0.0;

      for(let i=0; i<this.grades.length; i++) {
        sum += this.grades[i].credit*this.grades[i].result.gradePoint;
      }
      return sum/this.getTotalCreditHour();
    },

    getCGPA() {
      /* NOTICE: this should change later */
      return this.$store.getters.getAdvisee.cgpa;
    },

    getTotalCreditHoursCompleted() {
      /* NOTICE: this should change later */
      return this.$store.getters.getAdvisee.totalCreditHoursCompleted;
    },

    visitSemesterSelectionPage() {
      this.$router.push({ name: 'adviseeSemesterSelection', params: {}});
    }
  },

  computed: mapGetters(['getAdvisee', 'getGrades']),

  async created() {
    try {
      await this.fetchAdvisee(this.$route.params._id);
      await this.fetchGrades(this.$route.params._id, this.$route.params.level, this.$route.params.term);
    } catch(error) {
      console.log(error);
    }
    this.grades = this.$store.getters.getGrades.filter(grade => grade.status === 'passed' || grade.status === 'failed');
  }
}
</script>

<style scoped>

</style>
