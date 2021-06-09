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
          <div class="q-gutter-md">
            <q-btn
              class="bg-primary text-white"
              v-for="advisee in getAdvisees"
              :key="advisee.id"
              v-bind="advisee"
              @click.native="selectedAdvisee = advisee; onAdviseeClick();"
            >
              {{ advisee.id }}
            </q-btn>
          </div>
        </q-card-section>
      </q-card>

      <q-dialog v-model="adviseeInfoDialogBox" full-width>
        <q-card class="q-pa-md">
          <q-card-section>
            <div class="text-h6">
              <p>
                <strong>Student ID:</strong> {{ getAdvisee.id }}
              </p>
              <p>
                <strong>Name:</strong> {{ getAdvisee.name }}
              </p>
              <p>
                <strong>Level/Term:</strong> {{ getAdvisee.level }}/{{ getAdvisee.term }}
              </p>
              <p>
                <strong>Department:</strong> {{ getAdvisee.department }}
              </p>
              <p>
                <strong>Contact Number:</strong> {{ getAdvisee.contactNumber }}
              </p>
              <p>
                <strong>Email Address:</strong> {{ getAdvisee.email }}
              </p>
            </div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn class="bg-secondary text-white" label="View Grades" @click="visitInformationPage" />
            <q-btn class="bg-primary text-white" label="Back" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "AdviseeSelectionPage",

  data() {
    return {
      /* for showing selected Advisee information in dialog box */
      selectedAdvisee: {},
      adviseeInfoDialogBox: false  /* open when true */
    };
  },

  methods: {
    ...mapActions(['fetchAdvisees', 'fetchAdvisee']),

    async onAdviseeClick() {
      try {
        await this.fetchAdvisee(this.selectedAdvisee.id);
      } catch(error) {
        console.log(error);
      }
      this.adviseeInfoDialogBox = true;
    },

    visitInformationPage() {
      this.$router.push({ name: 'adviseeInformation',
        params: {
          studentID: this.getAdvisee.id
        },
        query: {} });
    }
  },

  computed: mapGetters(['getAdvisees', 'getAdvisee']),

  async created() {
    try {
      await this.fetchAdvisees();
    } catch(error) {
      console.log(error);
    }
  }
};
</script>

<style scoped>

</style>
