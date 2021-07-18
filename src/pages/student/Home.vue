<template>
  <q-page padding>
    <div v-if="isPageLoaded" class="q-pa-md">
      <q-card bordered>
        <q-card-section>
          <div class="row q-gutter-lg">
            <div>
              <div class="text-h5">Home</div><br />
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
                  <strong>Residential Hall:</strong> {{ getStudent.hall }}
                </p>
              </div>
            </div>

            <q-space />

            <!-- we should be working on images -->
            <img alt="" class="profile-photo" src="https://cdn.ttgtmedia.com/rms/computerweekly/3_ImitationGame_Cumberbatch.jpg" />
          </div>
        </q-card-section>

        <q-separator /><br />

        <q-card-section>
          <div class="text-h5">Class Routine</div><br />

          <q-table
            bordered
            :data="this.getClassRoutine"
            :columns="this.getClassRoutineColumns"
            row-key="day"
            separator="cell"
          />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "Home",

  data() {
    return {
      isPageLoaded: false
    };
  },

  methods: {
    ...mapActions(['fetchStudentIDInfo', 'fetchStudentProfileInfo', 'generateClassRoutineColumns', 'fetchCurrentCourses', 'generateClassRoutine'])
  },

  computed: mapGetters(['getID', 'getStudent', 'getClassRoutineColumns', 'getClassRoutine']),

  async created() {
    try {
      this.$q.loading.show({
        delay: 100,
        message: 'Loading...',
        messageColor: 'white'
      });

      await this.fetchStudentIDInfo();
      await this.fetchStudentProfileInfo(this.getID.id);

      await this.generateClassRoutineColumns();
      await this.fetchCurrentCourses({
        caller: 'student'
      });
      this.generateClassRoutine({
        caller: 'student'
      });

      this.$q.loading.hide();
      this.isPageLoaded = !this.isPageLoaded;
    } catch(error) {
      console.log(error);
    }
  }
}
</script>

<style scoped>
  .profile-photo {
    width: 100%;
    max-width: 200px;
    height: 100%;
  }
</style>
