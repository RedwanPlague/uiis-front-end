<template>
  <q-page padding>
    <div class="text-h5 q-my-md">
      Permit Clearance for Thesis Submission
    </div>
    <q-form class="row q-col-gutter-md" @submit="permit" @reset="resetForm">
      <q-select
        class="col-12"
        v-model="ids"
        label="Student ID(s)"
        multiple use-chips use-input clearable
        new-value-mode="add-unique"
        outlined
        :rules="[() => (!!ids && ids.length > 0) || 'Please Enter at least one Student ID']"
      />
      <div class="col-12">
        <q-btn label="Permit" type="submit" color="primary" unelevated :loading="permitLoading"/>
        <q-btn label="Reset" type="reset" color="primary" flat/>
      </div>
    </q-form>
  </q-page>
</template>

<script>
export default {
  name: 'ThesisClearance',
  title: 'Thesis Submission Clearance',
  data() {
    return {
      ids: null,
      permitLoading: false
    }
  },
  methods: {
    permit() {
      this.permitLoading = true
      setTimeout(() => {
        this.permitLoading = false
        this.$q.notify({
          message: 'Thesis Clearance Permitted for Selected Students',
          type: 'positive'
        })
      }, 1000)
    },
    resetForm() {
      this.ids = null
    }
  }
}
</script>
