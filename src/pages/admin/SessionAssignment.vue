<template>
  <q-page padding>
    <div class="text-h5 q-my-md">
      Current Session
    </div>
    <q-form class="row q-col-gutter-md" @submit="assignSession" @reset="resetForm">
      <q-input
        class="col-6"
        outlined
        input-class="cursor-pointer"
        label="Session"
        v-model="date"
        @click="$refs.monthPicker.show()"
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy ref="monthPicker" transition-show="scale" transition-hide="scale">
              <q-date
                minimal
                mask="MMM YYYY"
                emit-immediately
                default-view="Years"
                v-model="date"
                @input="checkValue"
              />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <div class="col-12">
        <q-btn label="Assign" type="submit" color="primary" unelevated :loading="assignLoading"/>
        <q-btn label="Reset" type="reset" color="primary" flat/>
      </div>
    </q-form>
  </q-page>
</template>

<script>
export default {
  name: 'SessionAssigner',
  data() {
    return {
      date: '',
      assignLoading: false
    }
  },
  methods: {
    checkValue (val, reason/*, details*/) {
      if (reason === 'month') {
        this.$refs.monthPicker.hide()
      }
    },
    assignSession() {

    },
    resetForm() {
      this.date = ''
    }
  }
}
</script>
