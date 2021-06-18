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
          </div>
        </q-card-section>

        <q-separator /><br />

        <q-card-section>
          <q-table
            title="Courses" dense bordered :data="getAvailableCourseRegistrations" :columns="getRegistrationColumns" row-key="courseID"
          />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { api } from "boot/axios";

export default {
  name: "CourseRegistration",

  data() {
    return {
      /* for tabulating course registrations */

    };
  },

  methods: {
    ...mapActions(['fetchStudentIDInfo', 'fetchStudentProfileInfo', 'fetchCourseRegistrations', 'generateAvailableCourseRegistrations']),
  },

  computed: mapGetters(['getID', 'getStudent', 'getAvailableCourseRegistrations', 'getRegistrationColumns']),

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
    } catch(error) {
      console.log(error);
    }
  }
}
</script>

<style scoped>

</style>
