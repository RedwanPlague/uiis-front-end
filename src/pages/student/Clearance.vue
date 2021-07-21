<template>
  <q-page padding>
    <div v-if="!statusLoading" class="text-h5 q-mt-lg text-center">
      <div v-if="isEligible">
        <div v-if="hasApplied">
          <div class="text-bold" v-if="thesisSubmitted" style="color: darkgreen">
            You have received clearance
          </div>
          <div v-else>
            Your clearance application is pending<br/>
            <span class="text-small">
              Waiting for Thesis hard copy submission approval
            </span>
          </div>
        </div>
        <div v-else>
          You are eligible for clearance<br/><br/>
          <q-btn
            label="Apply for Clearance" color="primary"
            unelevated @click="apply" :loading="applying"
          />
        </div>
      </div>
      <div v-else>
        You are not eligible for clearance
        <div class="text-small" style="color: red">
          <span v-if="!minCreditDone">
            Minimum credit requirement not fulfilled
          </span>
          <span v-else-if="!hasGraduated">
            You have not graduated yet
          </span>
          <span v-else-if="!duesCleared">
            You have pending dues
          </span>
        </div>
      </div>
    </div>
    <q-inner-loading :showing="statusLoading"/>
  </q-page>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'Clearance',
  title: 'Clearance',
  data() {
    return {
      minCreditDone: false,
      hasGraduated: false,
      duesCleared: false,
      thesisSubmitted: false,
      hasApplied: false,
      statusLoading: false,
      applying: false
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ]),
    isEligible() {
      return this.minCreditDone && this.hasGraduated && this.duesCleared
    }
  },
  methods: {
    apply() {
      this.applying = true
      this.$adminAPI.post('/clearance/apply/'+this.user.id)
        .then(() => {
          this.hasApplied = true
          this.applying = false
        })
        .catch(() => {
          this.applying = false
          this.$q.notify({
            message: 'Failed to Apply for Clearance, Please Try Again',
            type: 'negative'
          })
        })
    },
    loadClearanceStatus() {
      this.statusLoading = true
      this.$adminAPI.get('/clearance/status/'+this.user.id)
        .then(response => {
          this.statusLoading = false
          this.minCreditDone = response.data.minCreditDone
          this.duesCleared = response.data.duesCleared
          this.thesisSubmitted = response.data.thesisSubmitted
          this.hasApplied = response.data.hasApplied
          this.hasGraduated = response.data.hasGraduated
        })
        .catch(() => {
          this.statusLoading = false
          this.$q.notify({
            message: 'Failed to load Clearance status, Please reload',
            type: 'negative'
          })
        })
    }
  },
  created() {
    this.loadClearanceStatus()
  }
}
</script>

<style scoped>
.text-small {
  font-size: 0.8em;
}
</style>
