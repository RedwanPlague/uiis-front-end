<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-card bordered>
        <q-card-section>
          <div class="row q-gutter-lg">
            <div>
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
                <p>
                  <strong>Contact Number:</strong> {{ getStudent.contactNumber }}
                </p>
                <p>
                  <strong>Email Address:</strong> {{ getStudent.email }}
                </p>
                <p>
                  <strong>Residential Address:</strong> {{ getStudent.residentialAddress }}
                </p>
              </div>
            </div>

            <q-space />

            <!-- we should be working on images -->
            <img alt="" class="profile-photo" src="https://discourse.disneyheroesgame.com/uploads/default/original/3X/c/2/c23f54aea2065f106e4dbb8218d0ce2d7853351c.png" />
          </div>
        </q-card-section>
      </q-card><br />

      <div >
        <q-btn class="q-mx-auto" color="primary" text-color="white" label="Edit" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "PersonalProfilePage",

  data() {
    return {

    };
  },

  methods: {
    ...mapActions(['fetchStudentDetailsInfo'])
  },

  computed: mapGetters(['getStudent']),

  async created() {
    try {
      await this.fetchStudentDetailsInfo();
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
