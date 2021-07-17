<template>
  <q-page padding>
    <div v-if="isPageLoaded" class="q-pa-md">
      <q-card v-if="isEditOn" bordered>
        <q-card-section>
          <div class="row q-gutter-lg">
            <div>
              <div class="text-h5">Profile</div><br />
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
            <img alt="" class="profile-photo" src="https://discourse.disneyheroesgame.com/uploads/default/original/3X/c/2/c23f54aea2065f106e4dbb8218d0ce2d7853351c.png" />
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <p>
            <strong>Contact Number:</strong>
            <q-input
              outlined
              v-model="contactNumber"
              type="tel"
              :placeholder="getStudent.contactNumber"
            />
          </p>
          <p>
            <strong>Email Address:</strong>
            <q-input
              outlined
              v-model="email"
              type="email"
              :placeholder="getStudent.email"
            />
          </p>
          <p>
            <strong>Residential Address:</strong>
            <q-input
              outlined
              v-model="residentialAddress"
              :placeholder="getStudent.residentialAddress"
            />
          </p>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn class="bg-primary text-white" label="Submit" @click="submit"/>
        </q-card-actions>
      </q-card>

      <q-card v-else bordered>
        <q-card-section>
          <div class="row q-gutter-lg">
            <div>
              <div class="text-h5">Profile</div><br />
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

        <q-card-actions align="right">
          <q-btn class="bg-primary text-white" label="Edit" @click="edit"/>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { api } from "boot/axios";

export default {
  name: "PersonalProfilePage",

  data() {
    return {
      isPageLoaded: false,

      /* for profile edit purpose */
      isEditOn: false,

      contactNumber: '',
      email: '',
      residentialAddress: ''
    };
  },

  methods: {
    ...mapActions(['fetchStudentIDInfo', 'fetchStudentProfileInfo']),

    async submit() {
      try {
        await api.patch('/student/profile/edit', {
          contactNumber: this.contactNumber,
          email: this.email,
          residentialAddress: this.residentialAddress
        });
        await this.fetchStudentProfileInfo(this.getID.id);

        this.contactNumber = '';
        this.email = '';
        this.residentialAddress = '';

        this.isEditOn = !this.isEditOn;

        this.$q.notify({
          message: 'Profile updated.',
          position: "bottom-left",
          color: 'positive',
          icon: 'done'
        });
      } catch(error) {
        console.log(error);
      }
    },

    edit() {
      this.isEditOn = !this.isEditOn;
    }
  },

  computed: mapGetters(['getID', 'getStudent']),

  async created() {
    try {
      this.$q.loading.show({
        delay: 100,
        message: 'Loading...',
        messageColor: 'white'
      });

      await this.fetchStudentIDInfo();
      await this.fetchStudentProfileInfo(this.getID.id);

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
