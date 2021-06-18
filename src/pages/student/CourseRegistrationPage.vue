<template>
  <q-page padding>
    <div class="q-pa-md">
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
            v-if="getStudent.status === 'unregistered'"
            title="Courses Available"
            dense bordered
            :data="getAvailableCourseRegistrations"
            :columns="getRegistrationColumns"
            row-key="courseID"
            selection="multiple"
            :selected.sync="selected"
          />
          <q-table
            v-else
            title="Courses Available"
            dense bordered
            :data="getAvailableCourseRegistrations"
            :columns="getRegistrationColumns"
            row-key="courseID"
          />
        </q-card-section>

        <q-card-actions v-if="getStudent.status === 'unregistered'" align="right">
          <q-btn v-if="getCurrentSession.isRegistrationPeriodRunning" class="bg-primary text-white" label="Submit" @click="check" v-close-popup />
          <q-btn v-else class="bg-secondary text-white" label="Locked" @click="check" v-close-popup />
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { api } from "boot/axios";

export default {
  name: "CourseRegistrationPage",

  data() {
    return {
      /* for multiple course choice in course registrations table */
      selected: []
    };
  },

  methods: {
    ...mapActions(['fetchStudentIDInfo', 'fetchStudentProfileInfo', 'fetchCourseRegistrations', 'generateAvailableCourseRegistrations', 'fetchCurrentSession']),

    /* submitting course registration application */
    async submit() {
      try {
        let totalCreditHourAppliedFor = 0.0;

        for(let i=0; i<this.selected.length; i++) {
          totalCreditHourAppliedFor += this.selected[i].credit;
        }

        if(totalCreditHourAppliedFor >= this.getCurrentSession.minimumCreditHourRequired) {
          const loading = this.$q.notify({
            message: `Submitting application.`,
            position: "bottom-left",
            color: 'info',
            group: false,
            timeout: 0,
            spinner: true
          });

          await api.patch('/student/registrations/status_applied');
          await api.patch('/student/registrations/course_applied', {
            _id: this.selected.map(courseRegistration => courseRegistration._id)
          });
          await this.fetchStudentProfileInfo(this.getID.id);

          await this.fetchCourseRegistrations({
            id: this.getStudent.id,
            level: this.getStudent.level,
            term: this.getStudent.term
          });
          this.generateAvailableCourseRegistrations();

          loading({
            message: 'Application submitted.',
            color: 'positive',
            icon: 'done',
            timeout: 1500,
            spinner: false
          });
        } else {
          this.$q.notify({
            message: 'Minimum course registration credit ('+this.getCurrentSession.minimumCreditHourRequired.toFixed(2)+') is not fulfilled. Try again.',
            position: "bottom-left",
            color: 'negative',
            icon: 'warning'
          });
        }
      } catch(error) {
        console.log(error);
      }
    },

    /* popping alert telling course registration period is over */
    attempt() {
      this.$q.notify({
        message: 'Course registration period is over. Contact your advisor.',
        position: "bottom-left",
        color: 'negative',
        icon: 'warning'
      });
    },

    /* for checking course registration application */
    async check() {
      try {
        if(this.getCurrentSession.isRegistrationPeriodRunning) {
          await this.submit();
        } else {
          this.attempt();
        }
        this.selected = [];
      } catch(error) {
        console.log(error);
      }
    }
  },

  computed: mapGetters(['getID', 'getStudent', 'getCourseRegistrations', 'getAvailableCourseRegistrations', 'getRegistrationColumns', 'getCurrentSession']),

  async created() {
    try {
      await this.fetchStudentIDInfo();
      await this.fetchStudentProfileInfo(this.getID.id);

      await this.fetchCourseRegistrations({
        id: this.getStudent.id,
        level: this.getStudent.level,
        term: this.getStudent.term
      });
      this.generateAvailableCourseRegistrations();
      await this.fetchCurrentSession();
    } catch(error) {
      console.log(error);
    }
  }
}
</script>

<style scoped>

</style>
