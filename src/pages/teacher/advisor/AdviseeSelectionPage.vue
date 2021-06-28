<template>
  <q-page padding>
    <div v-if="isPageLoaded" class="q-pa-md">
      <q-card bordered>
        <q-card-section>
          <div class="text-h5">
            Advisees
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
      isPageLoaded: false,

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
      this.$q.loading.show({
        delay: 100,
        message: 'Loading...',
        messageColor: 'white'
      });

      await this.fetchAdvisees();

      this.$q.loading.hide();
      this.isPageLoaded = !this.isPageLoaded;
    } catch(error) {
      console.log(error);
    }
  }
};
</script>

<style scoped>

</style>
