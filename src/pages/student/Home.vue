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

            <img alt="" class="profile-photo" :src="this.getStudentProfilePicture.display_image_link" />
          </div>
        </q-card-section>

        <q-separator /><br />

        <q-card-section>
          <div class="text-h5">
            Class Routine

            <q-chip v-if="getStudent.status !== 'registered'" color="negative" text-color="white">
              {{ getStudent.status.charAt(0).toUpperCase()+getStudent.status.slice(1) }}
            </q-chip>
          </div><br />

          <q-table
            bordered
            :data="getClassRoutine"
            :columns="this.getClassRoutineColumns"
            row-key="day"
            separator="cell"
          >
            <template v-slot:body-cell="props">
              <q-td :props="props">
                <div v-if="typeof props.value === 'string'">
                  <strong>{{ props.value }}</strong>
                </div>

                <div v-else>
                  <div v-if="props.value.courseID !== ''">
                    <strong>{{ props.value.courseID }}</strong>
                  </div>
                  <div v-if="props.value.teachers !== ''">
                    {{ props.value.teachers }}
                  </div>
                  <div v-if="props.value.room !== ''">
                    {{ props.value.room }}
                  </div>
                </div>
              </q-td>
            </template>
          </q-table>
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
    ...mapActions(['fetchStudentIDInfo', 'fetchStudentProfileInfo', 'fetchStudentProfilePicture', 'generateClassRoutineColumns', 'fetchCurrentCourses', 'generateClassRoutine'])
  },

  computed: mapGetters(['getID', 'getStudent', 'getStudentProfilePicture', 'getClassRoutineColumns', 'getClassRoutine']),

  async created() {
    try {
      this.$q.loading.show({
        delay: 100,
        message: 'Loading...',
        messageColor: 'white'
      });

      await this.fetchStudentIDInfo();
      await this.fetchStudentProfileInfo(this.getID.id);
      await this.fetchStudentProfilePicture(this.getID.id);

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
