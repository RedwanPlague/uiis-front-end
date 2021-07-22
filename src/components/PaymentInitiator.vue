<template>
  <q-spinner v-if="initiating" :thickness="6" size="xs"/>
  <div
    v-else
    style="color: green; cursor: pointer"
    @click="initiate"
  >
    Pay <q-icon name="payments"/>
  </div>
</template>

<script>
export default {
  name: 'PaymentInitiator',
  props: {
    row: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      initiating: false
    }
  },
  methods: {
    initiate() {
      this.initiating = true
      this.$adminAPI.get('/student/due/initiate-payment', {
        params: {
          id: this.row._id,
          type: this.type
        }
      })
        .then(response => {
          this.initiating = false
          window.open(response.data, '_blank')
        })
        .catch(() => {
          this.initiating = false
          this.$q.notify({
            message: 'Failed to initiate payment procedure. Try Again',
            type: 'negative'
          })
        })
    },
  }
}
</script>

<style scoped>

</style>
