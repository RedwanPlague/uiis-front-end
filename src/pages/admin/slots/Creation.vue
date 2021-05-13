<template>
  <q-page padding>
    <div class="text-h5 q-my-md">
      Create Slots for Classes
    </div>
    <q-form class="row q-col-gutter-md" @submit="createSlot" @reset="resetForm">
      <q-input
        class="col-6"
        v-model="startingTime"
        label="Starting Time"
        stack-label
        type="time"
        :rules="[() => !!startingTime || 'Please Enter a Starting Time']"
        outlined
      />
      <q-input
        class="col-6"
        v-model="duration"
        label="Duration"
        stack-label
        type="number"
        suffix="minutes"
        min="0"
        outlined
        :rules="[() => !!duration || 'Please Enter Duration']"
      />
      <div class="col-12">
        <q-btn label="Create" color="primary" unelevated :loading="createLoading"/>
        <q-btn label="Reset" color="primary" flat/>
      </div>
    </q-form>
  </q-page>
</template>

<script>
export default {
  name: 'SlotsCreation',
  data() {
    return {
      startingTime: '',
      duration: '',
      date: '',
      createLoading: false
    }
  },
  methods: {
    createSlot() {

    },
    resetForm() {
      this.startingTime = ''
      this.duration = ''
    }
  }
}
</script>
