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
              @click.native="selectedAdvisee = advisee; visitInformationPage();"
            >
              {{ advisee.id }}
            </q-btn>
          </div>
        </q-card-section>
      </q-card>
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
      selectedAdvisee: {}
    };
  },

  methods: {
    ...mapActions(['fetchAdvisees']),

    visitInformationPage() {
      this.$router.push({ name: 'adviseeInformation',
        params: {
          studentID: this.selectedAdvisee.id
        },
        query: {} });
    }
  },

  computed: mapGetters(['getAdvisees']),

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
