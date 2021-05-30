<template>
  <q-page padding>
    <div class="q-pa-md">
      <div class="text-subtitle1">
        <strong>Student ID:</strong> {{ getAdvisee.id }} <br />
        <strong>Name:</strong> {{ getAdvisee.name }} <br />
        <strong>Department:</strong> {{ getAdvisee.department }} <br />
        <strong>Level/Term:</strong> {{ this.$route.query.level }}/{{ this.$route.query.term }}
      </div><br />

      <q-table
        dense bordered :data="getAvailableGrades" :columns="gradeColumns" row-key="courseID"
      /><br />

      <div class="row">
        <div class="text-subtitle1">
          <strong>Registered Credit Hours in this Term:</strong> {{ getTotalCreditHour().toFixed(2) }}<br />
          <strong>Credit Hours Earned in this Term:</strong> {{ getTotalCreditHourObtained().toFixed(2) }}<br />
          <strong>Total Credit Hours:</strong> {{ getTotalCreditHoursCompleted().toFixed(2) }}
        </div>

        <q-space />

        <q-card>
          <q-card-section>
            <div class="text-subtitle1">
              <strong>Obtained GPA:</strong> {{ getGPA().toFixed(2) }}<br />
              <strong>Current CGPA:</strong> {{ getCGPA().toFixed(2) }}
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
          format: val => `${val.toFixed(2)}`,
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
          format: val => `${val.toFixed(2)}`,
          sortable: true
        }
      ]
    };
  },

  methods: {
    ...mapActions(['fetchAdvisee', 'fetchGrades', 'generateAvailableGrades']),

    getTotalCreditHourObtained() {
      let totalCredit = 0.0;

      for(let i=0; i<this.$store.getters.getAvailableGrades.length; i++) {
        if(this.$store.getters.getAvailableGrades[i].status === 'passed') {
          totalCredit += this.$store.getters.getAvailableGrades[i].credit;
        }
      }
      return totalCredit;
    },

    getTotalCreditHour() {
      let totalCredit = 0.0;

      for(let i=0; i<this.$store.getters.getAvailableGrades.length; i++) {
        totalCredit += this.$store.getters.getAvailableGrades[i].credit;
      }
      return totalCredit;
    },

    getGPA() {
      let sum = 0.0;

      for(let i=0; i<this.$store.getters.getAvailableGrades.length; i++) {
        sum += this.$store.getters.getAvailableGrades[i].credit*this.$store.getters.getAvailableGrades[i].gradePoint;
      }
      return sum/this.getTotalCreditHour();
    },

    getCGPA() {
      /* NOTICE: this should change later */
      return this.getAdvisee.cgpa;
    },

    getTotalCreditHoursCompleted() {
      /* NOTICE: this should change later */
      return this.getAdvisee.totalCreditHoursCompleted;
    },

    visitSemesterSelectionPage() {
      this.$router.push({ name: 'adviseeSemesterSelection',
        params: {
          studentID: this.getAdvisee.id
        },
        query: {} });
    }
  },

  computed: mapGetters(['getAdvisee', 'getGrades', 'getAvailableGrades']),

  async created() {
    try {
      await this.fetchAdvisee(this.$route.params.studentID);
      await this.fetchGrades({
        id: this.getAdvisee.id,
        level: this.$route.query.level,
        term: this.$route.query.term
      });
      this.generateAvailableGrades();
    } catch(error) {
      console.log(error);
    }
  }
}
</script>

<style scoped>

</style>
