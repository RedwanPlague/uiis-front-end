<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-table
        title="Advisees" bordered :data="getAdvisees" :columns="adviseeColumns" row-key="studentID"
        @row-click="onRowClick"
      />

      <q-dialog v-model="studentInfoDialogBox" full-width>
        <q-card>
          <q-card-section>
            <div class="text-h6">
              <p>
                <strong>Student ID:</strong> {{ selectedAdvisee.studentID }}
              </p>
              <p>
                <strong>Name:</strong> {{ selectedAdvisee.name }}
              </p>
              <p>
                <strong>Level/Term:</strong> {{ selectedAdvisee.level }}/{{ selectedAdvisee.term }}
              </p>
              <p>
                <strong>Department:</strong> {{ selectedAdvisee.department }}
              </p>
              <p>
                <strong>Contact Number:</strong> {{ selectedAdvisee.contactNumber }}
              </p>
              <p>
                <strong>Email Address:</strong> {{ selectedAdvisee.emailAddress }}
              </p>
            </div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat class="bg-primary text-white" label="View Grades" @click="visitedSemesterSelectionPage" />
            <q-btn flat class="bg-secondary text-white" label="Back" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "AdviseeInformationPage",

  data() {
    return {
      /* for tabulation */
      adviseeColumns: [
        {
          name: 'studentID',
          required: true,
          label: 'Student ID',
          align: 'left',
          field: row => row.studentID,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'name',
          align: 'left',
          label: 'Name',
          field: 'name',
          sortable: true
        }
      ],

      /* for showing selected Advisee information in dialog box */
      selectedAdvisee: {},
      studentInfoDialogBox: false  /* open when true */
    };
  },

  methods: {
    ...mapActions(['fetchAdvisees']),

    onRowClick(event, row) {
      this.selectedAdvisee = this.$store.getters.getAdvisees.find(advisee => advisee.studentID === row.studentID);
      this.studentInfoDialogBox = true;
    },
    visitedSemesterSelectionPage() {
      console.log("hello");
      this.$router.push({ name: 'adviseeSemesterSelection', params: { studentID: this.selectedAdvisee.studentID }});
    }
  },

  computed: mapGetters(['getAdvisees']),

  created() {
    this.fetchAdvisees();
  }
};
</script>

<style scoped>

</style>
