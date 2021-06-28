<template>
  <q-page padding>
    <div v-if="isPageLoaded" class="q-pa-md">
      <q-card bordered>
        <q-card-section>
          <div class="text-h5">
            Registered
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <div class="q-gutter-md">
            <q-btn
              class="bg-primary text-white"
              v-for="registeredAdvisee in getAdvisees.filter(registration => registration.status === 'registered')"
              :key="registeredAdvisee.id"
              v-bind="registeredAdvisee"
              @click.native="selectedAdvisee = registeredAdvisee; onAdviseeWithoutApprovalOptionClick();"
            >
              {{ registeredAdvisee.id }}
            </q-btn>
          </div>
        </q-card-section>
      </q-card><br />

      <q-card bordered>
        <q-card-section>
          <div class="text-h5">
            Waiting for Head's Approval
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <div class="q-gutter-sm">
            <q-btn
              class="bg-primary text-white"
              v-for="waitingForHeadApprovalAdvisee in getAdvisees.filter(registration => registration.status === 'waiting')"
              :key="waitingForHeadApprovalAdvisee.id"
              v-bind="waitingForHeadApprovalAdvisee"
              @click.native="selectedAdvisee = waitingForHeadApprovalAdvisee; onAdviseeWithoutApprovalOptionClick();"
            >
              {{ waitingForHeadApprovalAdvisee.id }}
            </q-btn>
          </div>
        </q-card-section>
      </q-card><br />

      <q-card bordered>
        <q-card-section>
          <div class="text-h5">
            Waiting for Advisor's Approval
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <div class="q-gutter-sm">
            <q-btn
              class="bg-primary text-white"
              v-for="waitingForAdvisorApprovalAdvisee in getAdvisees.filter(registration => registration.status === 'applied')"
              :key="waitingForAdvisorApprovalAdvisee.id"
              v-bind="waitingForAdvisorApprovalAdvisee"
              @click.native="selectedAdvisee = waitingForAdvisorApprovalAdvisee; onAdviseeWithApprovalOptionClick();"
            >
              {{ waitingForAdvisorApprovalAdvisee.id }}
            </q-btn>
          </div>
        </q-card-section>
      </q-card><br />

      <q-card bordered>
        <q-card-section>
          <div class="text-h5">
            Not Applied for Registration

            <q-chip v-if="!getCurrentSession.isRegistrationPeriodRunning" color="negative" text-color="white">
              Course Registration Period is Over
            </q-chip>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <div class="q-gutter-sm">
            <q-btn
              class="bg-primary text-white"
              v-for="notAppliedForRegistrationAdvisee in getAdvisees.filter(registration => registration.status === 'unregistered')"
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
        <q-card bordered>
          <q-card-section>
            <div class="text-h5">Course Registration Information</div><br />
            <div class="text-subtitle2">
              <p>
                <strong>Student ID:</strong> {{ getStudent.id }}
              </p>
              <p>
                <strong>Name:</strong> {{ getStudent.name }}
              </p>
              <p>
                <strong>Level/Term:</strong> {{ getStudent.level }}/{{ getStudent.term }}
              </p>
              <p>
                <strong>Department:</strong> {{ getStudent.department }}
              </p>
              <p>
                <strong>Course Registration Status:</strong> {{ getStudent.status }}
              </p>
            </div>
          </q-card-section>

          <q-separator /><br />

          <q-card-section>
            <q-table
              title="Courses Available"
              bordered
              :data="courseRegistrations"
              :columns="getRegistrationColumns"
              row-key="courseID"
              separator="cell"
            />
          </q-card-section>

          <q-card-actions align="right">
            <q-btn class="bg-positive text-white" label="Approve" @click="approve" v-close-popup />
            <q-btn class="bg-negative text-white" label="Reject" @click="reject" v-close-popup />
            <q-btn class="bg-secondary text-white" label="Back" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog v-model="adviseeWithoutApprovalOptionDialogBox" full-width>
        <q-card bordered>
          <q-card-section>
            <div class="text-h5">Course Registration Information</div><br />
            <div class="text-subtitle2">
              <p>
                <strong>Student ID:</strong> {{ getStudent.id }}
              </p>
              <p>
                <strong>Name:</strong> {{ getStudent.name }}
              </p>
              <p>
                <strong>Level/Term:</strong> {{ getStudent.level }}/{{ getStudent.term }}
              </p>
              <p>
                <strong>Department:</strong> {{ getStudent.department }}
              </p>
              <p>
                <strong>Course Registration Status:</strong> {{ getStudent.status }}
              </p>
            </div>
          </q-card-section>

          <q-separator /><br />

          <q-card-section>
            <q-table
              title="Courses Available"
              bordered
              :data="courseRegistrations"
              :columns="getRegistrationColumns"
              row-key="courseID"
              separator="cell"
            />
          </q-card-section>

          <q-card-actions align="right">
            <q-btn class="bg-secondary text-white" label="Back" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { api } from "boot/axios";

export default {
  name: "AdviseeCourseRegistrationPage",

  data() {
    return {
      isPageLoaded: false,

      /* for showing selected Advisee information in dialog box */
      selectedAdvisee: {},
      courseRegistrations: [],
      adviseeWithApprovalOptionDialogBox: false,  /* open when true */
      adviseeWithoutApprovalOptionDialogBox: false  /* open when true */
    };
  },

  methods: {
    ...mapActions(['fetchAdvisees', 'fetchStudentProfileInfo', 'fetchCourseRegistrations', 'fetchCurrentSession']),

    generateCourseRegistrations() {
      this.courseRegistrations = [];

      for(let i=0; i<this.$store.getters.getCourseRegistrations.length; i++) {
        this.courseRegistrations[i] = {
          courseID: this.$store.getters.getCourseRegistrations[i].courseSession.course.courseID,
          syllabusID: this.$store.getters.getCourseRegistrations[i].courseSession.course.syllabusID,
          title: this.$store.getters.getCourseRegistrations[i].courseSession.course.title,
          credit: this.$store.getters.getCourseRegistrations[i].courseSession.course.credit,
          status: this.$store.getters.getCourseRegistrations[i].status
        };
      }
    },

    async onAdviseeWithApprovalOptionClick() {
      try {
        await this.fetchStudentProfileInfo(this.selectedAdvisee.id);
        this.courseRegistrations = [];
        this.adviseeWithApprovalOptionDialogBox = true;

        await this.fetchCourseRegistrations({
          id: this.selectedAdvisee.id,
          level: this.selectedAdvisee.level,
          term: this.selectedAdvisee.term
        });
        this.generateCourseRegistrations();
      } catch(error) {
        console.log(error);
      }
    },

    async onAdviseeWithoutApprovalOptionClick() {
      try {
        await this.fetchStudentProfileInfo(this.selectedAdvisee.id);
        this.courseRegistrations = [];
        this.adviseeWithoutApprovalOptionDialogBox = true;

        await this.fetchCourseRegistrations({
          id: this.selectedAdvisee.id,
          level: this.selectedAdvisee.level,
          term: this.selectedAdvisee.term
        });
        this.generateCourseRegistrations();
      } catch(error) {
        console.log(error);
      }
    },

    /* approving course registration application */
    async approve() {
      try {
        const loading = this.$q.notify({
          message: `Forwarding application to Head.`,
          position: "bottom-left",
          color: 'info',
          group: false,
          timeout: 0,
          spinner: true
        });

        await api.patch('/teacher/advisor/registrations/'+this.getStudent.id+'/approve');
        await this.fetchAdvisees();

        loading({
          message: 'Application forwarded.',
          color: 'positive',
          icon: 'done',
          timeout: 1500,
          spinner: false
        });
      } catch(error) {
        console.log(error);
      }
    },

    /* rejecting course registration application */
    async reject() {
      try {
        const loading = this.$q.notify({
          message: `Rejecting application.`,
          position: "bottom-left",
          color: 'info',
          group: false,
          timeout: 0,
          spinner: true
        });

        await api.patch('/teacher/advisor/registrations/'+this.getStudent.id+'/reject');
        await api.patch('/student/registrations/course_offered', {
          _id: this.getCourseRegistrations.map(courseRegistration => courseRegistration._id)
        });
        await this.fetchAdvisees();

        loading({
          message: 'Application rejected.',
          color: 'positive',
          icon: 'done',
          timeout: 1500,
          spinner: false
        });
      } catch(error) {
        console.log(error);
      }
    }
  },

  computed: mapGetters(['getAdvisees', 'getStudent', 'getCourseRegistrations', 'getRegistrationColumns', 'getCurrentSession']),

  async created() {
    try {
      this.$q.loading.show({
        delay: 100,
        message: 'Loading...',
        messageColor: 'white'
      });

      await this.fetchAdvisees();
      await this.fetchCurrentSession();

      this.$q.loading.hide();
      this.isPageLoaded = !this.isPageLoaded;
    } catch(error) {
      console.log(error);
    }
  }
};
</script>

<style scoped>

</style>
