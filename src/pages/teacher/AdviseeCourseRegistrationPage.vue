<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-card bordered class="bg-grey-2">
        <q-tabs
          v-model="tab"
          no-caps
          class="bg-grey-2 text-primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="registeredStudents" label="Registered Students" />
          <q-tab name="waitingForHeadApproval" label="Waiting for Head's Approval" />
          <q-tab name="waitingForAdvisorApproval" label="Waiting for Advisor's Approval" />
          <q-tab name="notAppliedForRegistration" label="Not Applied for Registration" />
        </q-tabs><br />

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="registeredStudents">
            <q-table
              bordered :data="registeredAdvisees" :columns="adviseeColumns" row-key="studentID"
              @row-click="onRowClick"
            />
          </q-tab-panel>

          <q-tab-panel name="waitingForHeadApproval">
            <q-table
              bordered :data="waitingForHeadApprovalAdvisees" :columns="adviseeColumns" row-key="studentID"
              @row-click="onRowClick"
            />
          </q-tab-panel>

          <q-tab-panel name="waitingForAdvisorApproval">
            <q-table
              bordered :data="waitingForAdvisorApprovalAdvisees" :columns="adviseeColumns" row-key="studentID"
              :selected-rows-label="getSelectedString" selection="multiple" :selected.sync="selected"
              @row-click="onRowClick"
            /><br />

            <div class="row">
              <q-space />
              <q-btn class="btn-fixed-width" color="primary" label="Submit" @click="forwardToHead" />
            </div>
          </q-tab-panel>

          <q-tab-panel name="notAppliedForRegistration">
            <q-table
              bordered :data="notAppliedForRegistrationAdvisees" :columns="adviseeColumns" row-key="studentID"
              @row-click="onRowClick"
            />
          </q-tab-panel>
        </q-tab-panels>
      </q-card>

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
            </div>

            <q-table
              title="Courses" dense bordered :data="selectedAdvisee.courses" :columns="courseColumns" row-key="courseID"
            />
          </q-card-section>

          <q-card-actions align="right">
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
    courses: [
      {
        courseID: "CSE405",
        syllabusID: "-",
        courseTitle: "Computer Security",
        creditHours: 3.00,
        Remarks: "Qualified"
      },
      {
        courseID: "CSE409",
        syllabusID: "-",
        courseTitle: "Computer Graphics",
        creditHours: 3.00,
        Remarks: "Qualified"
      },
      {
        courseID: "CSE453",
        syllabusID: "-",
        courseTitle: "High Performance Database Systems",
        creditHours: 3.00,
        Remarks: "Qualified"
      },
      {
        courseID: "CSE463",
        syllabusID: "-",
        courseTitle: "Introduction to Bioinformatics",
        creditHours: 3.00,
        Remarks: "Qualified"
      },
      {
        courseID: "HUM475",
        syllabusID: "-",
        courseTitle: "Engineering Economics",
        creditHours: 3.00,
        Remarks: "Qualified"
      }
    ]
  };
}

export default {
  name: "AdviseeCourseRegistrationPage",

  data() {
    return {
      advisees,  /* dummy array of advisees */
      tab: "registeredStudents",  /* by default location for q-tab */

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
      courseColumns: [
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
          name: 'syllabusID',
          align: 'left',
          label: 'Syllabus ID',
          field: 'syllabusID',
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
          name: 'remarks',
          align: 'left',
          label: 'Remarks',
          field: 'remarks',
          sortable: true
        }
      ],

      /* table rows */
      registeredAdvisees: advisees.slice(0, 8),
      waitingForHeadApprovalAdvisees: advisees.slice(8, 15),
      waitingForAdvisorApprovalAdvisees: advisees.slice(15, 22),
      notAppliedForRegistrationAdvisees: advisees.slice(22, advisees.length),

      /* for multiple selections in Advisor Approval table */
      selected: [],

      /* for showing selected Advisee information in dialog box */
      selectedAdvisee: {},
      studentInfoDialogBox: false  /* open when true */
    };
  },

  methods: {
    getSelectedString() {
      return this.selected.length === 0 ? '' : `${this.selected.length} record${this.selected.length > 1 ? 's' : ''} selected of ${this.waitingForAdvisorApprovalAdvisees.length}`;
    },
    onRowClick(event, row) {
      this.selectedAdvisee = this.advisees.find(advisee => advisee.studentID === row.studentID);
      this.studentInfoDialogBox = true;
    },
    forwardToHead() {
      for(let i=0; i<this.selected.length; i++) {
        this.waitingForAdvisorApprovalAdvisees.splice(this.waitingForAdvisorApprovalAdvisees.findIndex(advisee => advisee.studentID === this.selected[i].studentID), 1);
      }
      this.waitingForHeadApprovalAdvisees = this.waitingForHeadApprovalAdvisees.concat(this.selected);
      this.selected = [];
    }
  }
};
</script>

<style scoped>

</style>
