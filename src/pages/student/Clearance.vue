<template>
  <q-page padding>
    <div class="text-h5 q-mt-lg text-center">
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
          <q-btn label="Apply for Clearance" color="primary" unelevated @click="apply"/>
        </div>
      </div>
      <div v-else>
        You are not eligible for clearance
        <div class="text-small" style="color: red">
          <span v-if="!minCreditDone">
            Minimum credit requirement not fulfilled
          </span>
          <span v-else-if="!duesCleared">
            You have pending dues
          </span>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Clearance',
  title: 'Clearance',
  data() {
    return {
      minCreditDone: true,
      duesCleared: true,
      thesisSubmitted: false,
      hasApplied: false
    }
  },
  computed: {
    isEligible() {
      return this.minCreditDone && this.duesCleared
    }
  },
  methods: {
    apply() {
      this.hasApplied = true
    }
  }
}
</script>

<style scoped>
.text-small {
  font-size: 0.8em;
}
</style>
