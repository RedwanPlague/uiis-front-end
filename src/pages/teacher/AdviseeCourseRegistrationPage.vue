<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-card bordered class="bg-grey-2">
        <q-card-section>
          <div class="text-h6">
            <p>
              <strong>Registered Students</strong>
            </p>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <div class="q-gutter-sm">
            <q-btn
              flat class="bg-primary text-white"
              v-for="registeredAdvisee in getRegistrations.filter(registration => registration.status === 'registered')"
              :key="registeredAdvisee._id"
              v-bind="registeredAdvisee"
              @click.native="selectedAdvisee = registeredAdvisee; onAdviseeWithoutApprovalOptionClick();"
            >
              {{ registeredAdvisee._id }}
            </q-btn>
          </div>
        </q-card-section>
      </q-card><br />

      <q-card bordered class="bg-grey-2">
        <q-card-section>
          <div class="text-h6">
            <p>
              <strong>Waiting for Head's Approval</strong>
            </p>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <div class="q-gutter-sm">
            <q-btn
              flat class="bg-primary text-white"
              v-for="waitingForHeadApprovalAdvisee in getRegistrations.filter(registration => registration.status === 'waiting')"
              :key="waitingForHeadApprovalAdvisee._id"
              v-bind="waitingForHeadApprovalAdvisee"
              @click.native="selectedAdvisee = waitingForHeadApprovalAdvisee; onAdviseeWithoutApprovalOptionClick();"
            >
              {{ waitingForHeadApprovalAdvisee._id }}
            </q-btn>
          </div>
        </q-card-section>
      </q-card><br />

      <q-card bordered class="bg-grey-2">
        <q-card-section>
          <div class="text-h6">
            <p>
              <strong>Waiting for Advisor's Approval</strong>
            </p>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <div class="q-gutter-sm">
            <q-btn
              flat class="bg-primary text-white"
              v-for="waitingForAdvisorApprovalAdvisee in getRegistrations.filter(registration => registration.status === 'applied')"
              :key="waitingForAdvisorApprovalAdvisee._id"
              v-bind="waitingForAdvisorApprovalAdvisee"
              @click.native="selectedAdvisee = waitingForAdvisorApprovalAdvisee; onAdviseeWithApprovalOptionClick();"
            >
              {{ waitingForAdvisorApprovalAdvisee._id }}
            </q-btn>
          </div>
        </q-card-section>
      </q-card><br />

      <q-card bordered class="bg-grey-2">
        <q-card-section>
          <div class="text-h6">
            <p>
              <strong>Not Applied for Registration</strong>
            </p>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <div class="q-gutter-sm">
            <q-btn
              flat class="bg-primary text-white"
              v-for="notAppliedForRegistrationAdvisee in getRegistrations.filter(registration => registration.status === 'unregistered')"
              :key="notAppliedForRegistrationAdvisee._id"
              v-bind="notAppliedForRegistrationAdvisee"
              @click.native="selectedAdvisee = notAppliedForRegistrationAdvisee; onAdviseeWithoutApprovalOptionClick();"
            >
              {{ notAppliedForRegistrationAdvisee._id }}
            </q-btn>
          </div>
        </q-card-section>
      </q-card>

      <q-dialog v-model="adviseeWithApprovalOptionDialogBox" full-width>
        <q-card>
          <q-card-section>
            <div class="text-h6">
              <p>
                <strong>Student ID:</strong> {{ selectedAdvisee._id }}
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
              title="Courses" dense bordered :data="getSpecificRegistrations" :columns="courseColumns" row-key="courseID"
            />
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat class="bg-secondary text-white" label="Approve" @click="approve" v-close-popup />
            <q-btn flat class="bg-secondary text-white" label="Reject" @click="reject" v-close-popup />
            <q-btn flat class="bg-primary text-white" label="Back" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog v-model="adviseeWithoutApprovalOptionDialogBox" full-width>
        <q-card>
          <q-card-section>
            <div class="text-h6">
              <p>
                <strong>Student ID:</strong> {{ selectedAdvisee._id }}
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
              title="Courses" dense bordered :data="getSpecificRegistrations" :columns="courseColumns" row-key="courseID"
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
import AdvisorCall from '../../backend-calls/AdvisorCall';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "AdviseeCourseRegistrationPage",

  data() {
    return {
      /* for tabulation */
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
          name: 'status',
          align: 'left',
          label: 'Status',
          field: 'status',
          sortable: true
        }
      ],

      /* for showing selected Advisee information in dialog box */
      selectedAdvisee: {},
      adviseeWithApprovalOptionDialogBox: false,  /* open when true */
      adviseeWithoutApprovalOptionDialogBox: false  /* open when true */
    };
  },

  methods: {
    ...mapActions(['fetchRegistrations', 'fetchSpecificRegistrations']),

    async onAdviseeWithApprovalOptionClick() {
      try {
        await this.fetchSpecificRegistrations(selectedAdvisee._id, selectedAdvisee.level, selectedAdvisee.term);
      } catch(error) {
        console.log(error);
      }
      this.adviseeWithApprovalOptionDialogBox = true;
    },

    async onAdviseeWithoutApprovalOptionClick() {
      try {
        await this.fetchSpecificRegistrations(selectedAdvisee._id, selectedAdvisee.level, selectedAdvisee.term);
      } catch(error) {
        console.log(error);
      }
      this.adviseeWithoutApprovalOptionDialogBox = true;
    },

    async approve() {
      try {
        await AdvisorCall.approveRegistration(selectedAdvisee._id);
        await this.fetchRegistrations();
      } catch(error) {
        console.log(error);
      }
    },

    async reject() {
      try {
        await AdvisorCall.rejectRegistration(selectedAdvisee._id);
        await this.fetchRegistrations();
      } catch(error) {
        console.log(error);
      }
    }
  },

  computed: mapGetters(['getRegistrations', 'getSpecificRegistrations']),

  async created() {
    try {
      await this.fetchRegistrations();
    } catch(error) {
      console.log(error);
    }
  }
};
</script>

<style scoped>

</style>
