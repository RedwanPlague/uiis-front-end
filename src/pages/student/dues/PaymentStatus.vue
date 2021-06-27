<template>
  <q-page padding>
    <div class="text-center text-h4 q-my-lg">
      <div v-if="status === 'success'">
        Your payment was successful<br/>
        <span v-if="transactionID" style="font-size: 0.7em">
          Transaction ID: {{transactionID}}
        </span><br/>
      </div>
      <div v-else-if="status === 'fail'">
        The payment procedure has failed<br/>Please Try Again
      </div>
      <div v-else-if="status === 'cancel'">
        The payment procedure was cancelled.
      </div>
    </div>
    <div class="text-center text-h6 q-my-lg">
      <router-link
        :to="{ name: 'StudentDueViewPage' }"
      >Return to Dues Page</router-link>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PaymentStatus',
  computed: {
    status() {
      return this.$route.params.status
    },
    transactionID() {
      return this.$route.query.txid
    }
  }
}
</script>
