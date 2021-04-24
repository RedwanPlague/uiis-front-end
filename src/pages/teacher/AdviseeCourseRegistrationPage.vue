<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-card bordered class="bg-grey-2">
        <q-tabs
          v-model="tab"
          no-caps
          class="bg-primary text-white shadow-7"
          align="justify"
          narrow-indicator
        >
          <q-tab name="registeredStudents" label="Registered Students" />
          <q-tab name="waitingForHeadApproval" label="Waiting for Head's Approval" />
          <q-tab name="waitingForAdvisorApproval" label="Waiting for Head's Approval" />
          <q-tab name="notAppliedForRegistration" label="Not Applied for Registration" />
        </q-tabs>

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="registeredStudents">
            <div class="q-gutter-sm">
              <q-btn
                color="primary"
                v-for="advisee in advisees"
                :key="advisee.studentID"
                v-bind="advisee"
              >
                {{ advisee.studentID }}
              </q-btn>
            </div>
          </q-tab-panel>

          <q-tab-panel name="waitingForHeadApproval">
            <div class="q-gutter-sm">
              <q-btn
                color="primary"
                v-for="advisee in advisees"
                :key="advisee.studentID"
                v-bind="advisee"
              >
                {{ advisee.studentID }}
              </q-btn>
            </div>
          </q-tab-panel>

          <q-tab-panel name="waitingForAdvisorApproval">
            <q-table
              title="Waiting for Adviser's Approval" bordered class="bg-grey-2" :data="rows" :columns="columns" row-key="studentID"
              :pagination.sync="pagination" hide-pagination
              :selected-rows-label="getSelectedString" selection="multiple" :selected.sync="selected"
            />

            <div class="row justify-center q-mt-md">
              <q-pagination
                v-model="pagination.page"
                color="primary"
                :max="pagesNumber"
                size="sm"
              />
            </div><br />

            <div class="row">
              <q-space />
              <q-btn class="btn-fixed-width" color="primary" label="Submit" />
            </div>
          </q-tab-panel>

          <q-tab-panel name="notAppliedForRegistration">
            <div class="q-gutter-sm">
              <q-btn
                color="primary"
                v-for="advisee in advisees"
                :key="advisee.studentID"
                v-bind="advisee"
              >
                {{ advisee.studentID }}
              </q-btn>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </q-page>
</template>

<script>
let advisees = [];

for(let i=0; i<30; i++) {
  advisees[i] = { studentID: 1605001 + i };
}

export default {
  name: "AdviseeCourseRegistrationPage",

  data () {
    return {
      /* necessary data */
      advisees,

      /* by default location for q-tab */
      tab: "registeredStudents",

      studentInfo: false,

      /* for multiple selection */
      selected: [],

      /* for pagination */
      pagination: {
        sortBy: 'studentID',
        descending: false,
        page: 1,
        rowsPerPage: 2
        /* rowsNumber: xx if getting data from a server */
      },

      /* for tabulation */
      columns: [
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
      rows: [
        {
          studentID: '1605002',
          name: 'Zawad'
        },
        {
          studentID: '1605003',
          name: 'Bishwa'
        },
        {
          studentID: '1605004',
          name: 'Redwan'
        },
        {
          studentID: '1605010',
          name: 'Rakib'
        },
        {
          studentID: '1605023',
          name: 'Sahil'
        },
        {
          studentID: '1605024',
          name: 'Mahir'
        }
      ]
    };
  },

  computed: {
    pagesNumber () {
      return Math.ceil(this.rows.length / this.pagination.rowsPerPage);
    }
  },

  methods: {
    getSelectedString () {
      return this.selected.length === 0 ? '' : `${this.selected.length} record${this.selected.length > 1 ? 's' : ''} selected of ${this.rows.length}`;
    }
  }
};
</script>

<style scoped></style>
