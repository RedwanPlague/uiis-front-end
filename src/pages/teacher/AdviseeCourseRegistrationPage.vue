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
              v-for="registeredAdvisee in registeredAdvisees"
              :key="registeredAdvisee.studentID"
              v-bind="registeredAdvisee"
              @click.native="selectedAdvisee = registeredAdvisee; onAdviseeWithoutApprovalOptionClick();"
            >
              {{ registeredAdvisee.studentID }}
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
              v-for="waitingForHeadApprovalAdvisee in waitingForHeadApprovalAdvisees"
              :key="waitingForHeadApprovalAdvisee.studentID"
              v-bind="waitingForHeadApprovalAdvisee"
              @click.native="selectedAdvisee = waitingForHeadApprovalAdvisee; onAdviseeWithoutApprovalOptionClick();"
            >
              {{ waitingForHeadApprovalAdvisee.studentID }}
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
              v-for="waitingForAdvisorApprovalAdvisee in waitingForAdvisorApprovalAdvisees"
              :key="waitingForAdvisorApprovalAdvisee.studentID"
              v-bind="waitingForAdvisorApprovalAdvisee"
              @click.native="selectedAdvisee = waitingForAdvisorApprovalAdvisee; onAdviseeWithApprovalOptionClick();"
            >
              {{ waitingForAdvisorApprovalAdvisee.studentID }}
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
              v-for="notAppliedForRegistrationAdvisee in notAppliedForRegistrationAdvisees"
              :key="notAppliedForRegistrationAdvisee.studentID"
              v-bind="notAppliedForRegistrationAdvisee"
              @click.native="selectedAdvisee = notAppliedForRegistrationAdvisee; onAdviseeWithoutApprovalOptionClick();"
            >
              {{ notAppliedForRegistrationAdvisee.studentID }}
            </q-btn>
          </div>
        </q-card-section>
      </q-card>

      <q-dialog v-model="adviseeWithApprovalOptionDialogBox" full-width>
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
              title="Courses" dense bordered :data="getCourses" :columns="courseColumns" row-key="courseID"
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
              title="Courses" dense bordered :data="getCourses" :columns="courseColumns" row-key="courseID"
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

      /* card groups */
      registeredAdvisees: this.$store.getters.getAdvisees.slice(0, 8),
      waitingForHeadApprovalAdvisees: this.$store.getters.getAdvisees.slice(8, 15),
      waitingForAdvisorApprovalAdvisees: this.$store.getters.getAdvisees.slice(15, 22),
      notAppliedForRegistrationAdvisees: this.$store.getters.getAdvisees.slice(22, this.$store.getters.getAdvisees.length),

      /* for showing selected Advisee information in dialog box */
      selectedAdvisee: {},
      adviseeWithApprovalOptionDialogBox: false,  /* open when true */
      adviseeWithoutApprovalOptionDialogBox: false  /* open when true */
    };
  },

  methods: {
    ...mapActions(['fetchAdvisees', 'fetchCourses']),

    onAdviseeWithApprovalOptionClick() {
      this.adviseeWithApprovalOptionDialogBox = true;
    },

    onAdviseeWithoutApprovalOptionClick() {
      this.adviseeWithoutApprovalOptionDialogBox = true;
    },

    approve() {
      this.waitingForAdvisorApprovalAdvisees.splice(this.waitingForAdvisorApprovalAdvisees.findIndex(advisee => advisee.studentID === this.selectedAdvisee.studentID), 1);
      this.waitingForHeadApprovalAdvisees = this.waitingForHeadApprovalAdvisees.concat(this.selectedAdvisee);
      this.waitingForHeadApprovalAdvisees.sort((advisee1, advisee2) => (advisee1.studentID > advisee2.studentID)? 1: ((advisee1.studentID < advisee2.studentID)? -1: 0));
    },

    reject() {
      this.waitingForAdvisorApprovalAdvisees.splice(this.waitingForAdvisorApprovalAdvisees.findIndex(advisee => advisee.studentID === this.selectedAdvisee.studentID), 1);
      this.notAppliedForRegistrationAdvisees = this.notAppliedForRegistrationAdvisees.concat(this.selectedAdvisee);
      this.notAppliedForRegistrationAdvisees.sort((advisee1, advisee2) => (advisee1.studentID > advisee2.studentID)? 1: ((advisee1.studentID < advisee2.studentID)? -1: 0));
    }
  },

  computed: mapGetters(['getAdvisees', 'getCourses']),

  created() {
    this.fetchAdvisees();
    this.fetchCourses();
  }
};
</script>

<style scoped>

</style>
