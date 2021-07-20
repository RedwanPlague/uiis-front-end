<template>
  <q-page padding>
    <div class="text-h5 q-my-md">
      Current Session
    </div>
    <q-form class="row q-col-gutter-md" @submit="assignSession" @reset="resetForm">
      <session-field
        classes="col-6"
        v-model="date"
        required
      />
      <div class="col-12">
        <q-btn label="Update" type="submit" color="primary" unelevated :loading="editLoading"/>
        <q-btn label="Reset" type="reset" color="primary" flat/>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import SessionField from 'components/FormElements/SessionField'
import edit from 'src/mixins/edit'

export default {
  name: 'SessionAssigner',
  title: 'Current Session',
  components: {SessionField},
  mixins: [edit],
  data() {
    return {
      date: null,
    }
  },
  methods: {
    assignSession() {
      this.$adminAPI.post('/currentSession/updateLevelTerm')
        .then(() => {
          this.callEditApi('/currentSession/update', {
            session: new Date(this.date).toString()
          }, 'Session')
        })
        .catch(() => {
          this.$q.notify({
            message: 'Failed to Update Level-Term, Please Try Again Later',
            type: 'negative'
          })
        })
    },
    resetForm() {
      this.date = null
    },
  },
}
</script>
