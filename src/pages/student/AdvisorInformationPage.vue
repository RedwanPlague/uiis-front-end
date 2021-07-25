<template>
  <q-page padding>
    <div v-if="isPageLoaded" class="q-pa-md">
      <q-card bordered style="width: 700px; margin-left: auto; margin-right: auto;">
        <q-card-section>
          <div class="row q-gutter-lg">
            <div>
              <div class="text-h5">Advisor</div><br />
              <div class="text-subtitle2">
                <p>
                  <strong>Name:</strong> {{ getTeacher.advisor.name }}
                </p>
                <p>
                  <strong>Contact Number:</strong> {{ getTeacher.advisor.contactNumber }}
                </p>
                <p>
                  <strong>Email:</strong> {{ getTeacher.advisor.email }}
                </p>
                <p>
                  <strong>Department:</strong> {{ getTeacher.advisor.department }}
                </p>
              </div>
            </div>

            <q-space />

            <img alt="" class="profile-photo" :src="this.getTeacherProfilePicture.advisor.display_image_link" />
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "AdvisorInformationPage",

  data() {
    return {
      isPageLoaded: false
    };
  },

  methods: {
    ...mapActions(['fetchAdvisorProfileInfo', 'fetchAdvisorProfilePicture'])
  },

  computed: mapGetters(['getTeacher', 'getTeacherProfilePicture']),

  async created() {
    try {
      this.$q.loading.show({
        delay: 100,
        message: 'Loading...',
        messageColor: 'white'
      });

      await this.fetchAdvisorProfileInfo();
      await this.fetchAdvisorProfilePicture();

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
