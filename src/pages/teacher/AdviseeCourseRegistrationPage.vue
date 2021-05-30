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
              :key="registeredAdvisee.id"
              v-bind="registeredAdvisee"
              @click.native="selectedAdvisee = registeredAdvisee; onAdviseeWithoutApprovalOptionClick();"
            >
              {{ registeredAdvisee.id }}
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
              :key="waitingForHeadApprovalAdvisee.id"
              v-bind="waitingForHeadApprovalAdvisee"
              @click.native="selectedAdvisee = waitingForHeadApprovalAdvisee; onAdviseeWithoutApprovalOptionClick();"
            >
              {{ waitingForHeadApprovalAdvisee.id }}
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
              :key="waitingForAdvisorApprovalAdvisee.id"
              v-bind="waitingForAdvisorApprovalAdvisee"
              @click.native="selectedAdvisee = waitingForAdvisorApprovalAdvisee; onAdviseeWithApprovalOptionClick();"
            >
              {{ waitingForAdvisorApprovalAdvisee.id }}
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
              :key="notAppliedForRegistrationAdvisee.id"
              v-bind="notAppliedForRegistrationAdvisee"
              @click.native="selectedAdvisee = notAppliedForRegistrationAdvisee; onAdviseeWithoutApprovalOptionClick();"
            >
              {{ notAppliedForRegistrationAdvisee.id }}
            </q-btn>
          </div>
        </q-card-section>
      </q-card>

      <q-dialog v-model="adviseeWithApprovalOptionDialogBox" full-width>
        <q-card class="q-pa-md">
          <q-card-section>
            <div class="text-h6">
              <p>
                <strong>Student ID:</strong> {{ selectedAdvisee.id }}
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
              title="Courses" dense bordered :data="specificRegistrations" :columns="courseColumns" row-key="courseID"
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
        <q-card class="q-pa-md">
          <q-card-section>
            <div class="text-h6">
              <p>
                <strong>Student ID:</strong> {{ selectedAdvisee.id }}
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
              title="Courses" dense bordered :data="specificRegistrations" :columns="courseColumns" row-key="courseID"
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
import { mapGetters, mapActions } from 'vuex';
import { api } from "boot/axios";

const url = "/teacher/advisor";

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
          format: val => `${val.toFixed(2)}`,
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
      specificRegistrations: [],
      adviseeWithApprovalOptionDialogBox: false,  /* open when true */
      adviseeWithoutApprovalOptionDialogBox: false  /* open when true */
    };
  },

  methods: {
    ...mapActions(['fetchRegistrations', 'fetchSpecificRegistrations']),

    generateSpecificRegistrations() {
      this.specificRegistrations = [];

      for(let i=0; i<this.$store.getters.getSpecificRegistrations.length; i++) {
        this.specificRegistrations[i] = {
          courseID: this.$store.getters.getSpecificRegistrations[i].courseSession.course.courseID,
          syllabusID: this.$store.getters.getSpecificRegistrations[i].courseSession.course.syllabusID,
          title: this.$store.getters.getSpecificRegistrations[i].courseSession.course.title,
          credit: this.$store.getters.getSpecificRegistrations[i].courseSession.course.credit,
          status: this.$store.getters.getSpecificRegistrations[i].status
        };
      }
    },

    async onAdviseeWithApprovalOptionClick() {
      try {
        await this.fetchSpecificRegistrations({
          id: this.selectedAdvisee.id,
          level: this.selectedAdvisee.level,
          term: this.selectedAdvisee.term
        });
        this.generateSpecificRegistrations();
      } catch(error) {
        console.log(error);
      }
      this.adviseeWithApprovalOptionDialogBox = true;
    },

    async onAdviseeWithoutApprovalOptionClick() {
      try {
        await this.fetchSpecificRegistrations({
          id: this.selectedAdvisee.id,
          level: this.selectedAdvisee.level,
          term: this.selectedAdvisee.term
        });
        this.generateSpecificRegistrations();
      } catch(error) {
        console.log(error);
      }
      this.adviseeWithoutApprovalOptionDialogBox = true;
    },

    /* approving course registration application */
    async approve() {
      try {
        await api.patch(url+'/registrations/'+this.selectedAdvisee.id+'/approve');
        await this.fetchRegistrations();
      } catch(error) {
        console.log(error);
      }
    },

    /* rejecting course registration application */
    async reject() {
      try {
        await api.patch(url+'/registrations/'+this.selectedAdvisee.id+'/reject');
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
