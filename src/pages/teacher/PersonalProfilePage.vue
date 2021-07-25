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
                  <strong>Name:</strong> {{ getTeacher.name }} ({{ getTeacher.id }})
                </p>
                <p>
                  <strong>Department:</strong> {{ getTeacher.department }}
                </p>
              </div>
            </div>

            <q-space />

            <img alt="" class="profile-photo" :src="this.getTeacherProfilePicture.display_image_link" />
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
              :placeholder="this.getTeacher.contactNumber"
            />
          </p>
          <p>
            <strong>Email Address:</strong>
            <q-input
              clearable
              outlined
              v-model="email"
              type="email"
              :placeholder="this.getTeacher.email"
            />
          </p>
          <p>
            <strong>Residential Address:</strong>
            <q-input
              clearable
              outlined
              v-model="residentialAddress"
              :placeholder="this.getTeacher.residentialAddress"
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

            <img alt="" class="profile-photo" :src="this.getTeacherProfilePicture.display_image_link" />
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
    ...mapActions(['fetchTeacherProfileInfo', 'fetchTeacherProfilePicture']),

    async submit() {
      try {
        this.contactNumber = (this.contactNumber === '')? this.getTeacher.contactNumber: this.contactNumber;
        this.email = (this.email === '')? this.getTeacher.email: this.email;
        this.residentialAddress = (this.residentialAddress === '')? this.getTeacher.residentialAddress: this.residentialAddress;

        await api.patch('/teacher/profile/edit', {
          contactNumber: this.contactNumber,
          email: this.email,
          residentialAddress: this.residentialAddress
        });
        await this.fetchTeacherProfileInfo();

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

  computed: mapGetters(['getTeacher', 'getTeacherProfilePicture']),

  async created() {
    try {
      this.$q.loading.show({
        delay: 100,
        message: 'Loading...',
        messageColor: 'white'
      });

      await this.fetchTeacherProfileInfo();
      await this.fetchTeacherProfilePicture();

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
