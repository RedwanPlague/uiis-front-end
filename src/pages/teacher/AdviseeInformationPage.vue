<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-table
        title="Advisees" bordered :data="advisees" :columns="adviseeColumns" row-key="studentID"
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
            <q-btn flat class="bg-secondary text-white" label="View Result" @click="visitResultPage" />
            <q-btn flat class="bg-primary text-white" label="Back" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
/* preparing dummy advisees array */
let advisees = [];

for(let i=0; i<30; i++) {
  advisees[i] = {
    studentID: 1605001+i,
    name: "student no."+(i+1),
    level: "4",
    term: "1",
    department: "CSE",
    contactNumber: "xxx-xxx-xxxx",
    emailAddress: (1605001+i)+"@ugrad.cse.buet.ac.bd"
  };
}

export default {
  name: "AdviseeInformationPage",

  data() {
    return {
      /* dummy advisees array */
      advisees,

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
    onRowClick(event, row) {
      this.selectedAdvisee = this.advisees.find(advisee => advisee.studentID === row.studentID);
      this.studentInfoDialogBox = true;
    },
    visitResultPage() {
      console.log("hello");
      this.$router.push({ name: 'adviseeGrades', params: { studentID: this.selectedAdvisee.studentID }});
    }
  }
};
</script>

<style scoped>

</style>
