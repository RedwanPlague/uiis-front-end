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
                  <strong>Name:</strong> {{ getTeacher.name }} ({{ getTeacher.id }})
                </p>
                <p>
                  <strong>Contact Number:</strong> {{ getTeacher.contactNumber }}
                </p>
                <p>
                  <strong>Email:</strong> {{ getTeacher.email }}
                </p>
                <p>
                  <strong>Residential Address:</strong> {{ getTeacher.residentialAddress }}
                </p>
                <p>
                  <strong>Department:</strong> {{ getTeacher.department }}
                </p>
              </div>
            </div>

            <q-space />

            <!-- we should be working on images -->
            <img alt="" class="profile-photo" src="https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg" />
          </div>
        </q-card-section>

        <q-separator /><br />

        <q-card-section>
          <div class="text-h5">Class Roster</div><br />

          <q-table
            bordered
            :data="getClassRoutine"
            :columns="this.getClassRoutineColumns"
            row-key="day"
            separator="cell"
          >
            <template v-slot:body-cell="props">
              <q-td :props="props">
                <div v-if="props.value.courseID !== ''">
                  <strong>{{ props.value.courseID }}</strong>
                </div>
                <div v-if="props.value.teachers !== ''">
                  {{ props.value.teachers }}
                </div>
                <div v-if="props.value.room !== ''">
                  {{ props.value.room }}
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
    ...mapActions(['fetchTeacherProfileInfo', 'fetchCurrentSession', 'generateClassRoutineColumns', 'fetchCurrentCourses', 'generateClassRoutine'])
  },

  computed: mapGetters(['getTeacher', 'getCurrentSession', 'getClassRoutineColumns', 'getClassRoutine']),

  async created() {
    try {
      this.$q.loading.show({
        delay: 100,
        message: 'Loading...',
        messageColor: 'white'
      });

      await this.fetchTeacherProfileInfo();

      await this.generateClassRoutineColumns();
      await this.fetchCurrentSession();
      await this.fetchCurrentCourses({
        caller: 'teacher',
        session: this.getCurrentSession.session
      });
      this.generateClassRoutine({
        caller: 'teacher'
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
