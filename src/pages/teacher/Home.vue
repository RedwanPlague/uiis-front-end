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
          <div class="text-h5">Class Routine</div><br />
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
    ...mapActions(['fetchTeacherProfileInfo'])
  },

  computed: mapGetters(['getTeacher']),

  async created() {
    try {
      this.$q.loading.show({
        delay: 100,
        message: 'Loading...',
        messageColor: 'white'
      });

      await this.fetchTeacherProfileInfo();

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
