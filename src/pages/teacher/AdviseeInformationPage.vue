<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-card bordered class="bg-grey-2">
        <q-card-section>
          <div class="text-h6">
            <p>
              <strong>Advisees</strong>
            </p>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <div class="q-gutter-sm">
            <q-btn
              flat class="bg-primary text-white"
              v-for="advisee in getAdvisees"
              :key="advisee.studentID"
              v-bind="advisee"
              @click.native="selectedAdvisee = advisee; onAdviseeClick();"
            >
              {{ advisee.studentID }}
            </q-btn>
          </div>
        </q-card-section>
      </q-card>

      <q-dialog v-model="adviseeInfoDialogBox" full-width>
        <q-card>
          <q-card-section>
            <div class="text-h6">
              <p>
                <strong>Student ID:</strong> {{ selectedAdvisee.studentID }}
              </p>
              <p>
                <strong>Name:</strong> {{ selectedAdvisee.name }}
              </p>
              <p>
                <strong>Level/Term:</strong> {{ selectedAdvisee.level }}/{{ selectedAdvisee.term }}
              </p>
              <p>
                <strong>Department:</strong> {{ selectedAdvisee.department }}
              </p>
              <p>
                <strong>Contact Number:</strong> {{ selectedAdvisee.contactNumber }}
              </p>
              <p>
                <strong>Email Address:</strong> {{ selectedAdvisee.emailAddress }}
              </p>
            </div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat class="bg-secondary text-white" label="View Grades" @click="visitedSemesterSelectionPage" />
            <q-btn flat class="bg-primary text-white" label="Back" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "AdviseeInformationPage",

  data() {
    return {
      /* for showing selected Advisee information in dialog box */
      selectedAdvisee: {},
      adviseeInfoDialogBox: false  /* open when true */
    };
  },

  methods: {
    ...mapActions(['fetchAdvisees']),

    onAdviseeClick() {
      this.adviseeInfoDialogBox = true;
    },

    visitedSemesterSelectionPage() {
      this.$router.push({ name: 'adviseeSemesterSelection', params: { studentID: this.selectedAdvisee.studentID }});
    }
  },

  computed: mapGetters(['getAdvisees']),

  created() {
    this.fetchAdvisees();
  }
};
</script>

<style scoped>

</style>
