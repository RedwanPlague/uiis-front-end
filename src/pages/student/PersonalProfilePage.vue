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
            <img alt="" class="profile-photo" src="https://cdn.ttgtmedia.com/rms/computerweekly/3_ImitationGame_Cumberbatch.jpg" />
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <p>
            <strong>Contact Number:</strong>
            <q-input
              clearable
              outlined
              v-model="contactNumber"
              type="tel"
              :placeholder="getStudent.contactNumber"
            />
          </p>
          <p>
            <strong>Email Address:</strong>
            <q-input
              clearable
              outlined
              v-model="email"
              type="email"
              :placeholder="getStudent.email"
            />
          </p>
          <p>
            <strong>Residential Address:</strong>
            <q-input
              clearable
              outlined
              v-model="residentialAddress"
              :placeholder="getStudent.residentialAddress"
            />
          </p>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn class="bg-primary text-white" label="Submit" @click="submit"/>
          <q-btn class="bg-secondary text-white" label="Back" @click="isEditOn = !isEditOn"/>
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
            <img alt="" class="profile-photo" src="https://cdn.ttgtmedia.com/rms/computerweekly/3_ImitationGame_Cumberbatch.jpg" />
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn class="bg-primary text-white" label="Edit" @click="isEditOn = !isEditOn"/>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { api } from 'boot/axios';

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
        this.contactNumber = (this.contactNumber === '')? this.getStudent.contactNumber: this.contactNumber;
        this.email = (this.email === '')? this.getStudent.email: this.email;
        this.residentialAddress = (this.residentialAddress === '')? this.getStudent.residentialAddress: this.residentialAddress;

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
