<template>
  <q-page padding>
    <div class="text-h5 q-my-md">
      Edit Slots for Classes
    </div>
    <div class="row q-col-gutter-md q-mb-md">
      <slot-picker
        classes="col-6"
        v-model="slotToEdit"
        label="Slot to Edit"
        @input="setEditSlot"
      />
    </div>
    <q-form
      v-show="!!slotToEdit"
      class="row q-col-gutter-md"
      @submit="createSlot"
      @reset="resetForm"
    >
      <q-input
        class="col-6"
        v-model="editSlotTime"
        label="Starting Time"
        stack-label
        type="time"
        :rules="[() => !!editSlotTime || 'Please Enter a Starting Time']"
        outlined
      />
      <q-input
        class="col-6"
        v-model="editSlotDuration"
        label="Duration"
        stack-label
        type="number"
        suffix="minutes"
        min="0"
        outlined
        :rules="[() => !!editSlotDuration || 'Please Enter Duration']"
      />
      <div class="col-12">
        <q-btn label="Edit" color="primary" unelevated :loading="createLoading"/>
        <q-btn label="Reset" color="primary" flat/>
      </div>
    </q-form>
    <div class="text-h5 q-my-md q-pt-lg">
      Create New Slots
    </div>
    <q-form class="row q-col-gutter-md" @submit="createSlot" @reset="resetForm">
      <q-input
        class="col-4"
        v-model="id"
        outlined
        :rules="[() => !!id || 'Please Enter an ID']"
      />
      <q-input
        class="col-4"
        v-model="startingTime"
        label="Starting Time"
        stack-label
        type="time"
        :rules="[() => !!startingTime || 'Please Enter a Starting Time']"
        outlined
      />
      <q-input
        class="col-4"
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
        <q-btn label="Create" type="submit" color="primary" unelevated :loading="createLoading"/>
        <q-btn label="Reset" type="reset" color="primary" flat/>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import SlotPicker from 'components/FormElements/SlotPicker'
import creator from 'src/mixins/creator'

export default {
  name: 'SlotsCreation',
  components: {SlotPicker},
  mixins: [
    creator
  ],
  data() {
    return {
      id: '',
      startingTime: '',
      duration: '',
      date: '',
      slotToEdit: null,
      editSlotTime: '',
      editSlotDuration: '',
    }
  },
  methods: {
    setEditSlot() {
      this.editSlotTime = this.slotToEdit
      this.editSlotDuration = 120
    },
    createSlot() {
      const [h, m] = this.startingTime.split(':').map(x => parseInt(x))
      this.callCreateApi('/slot/create', {
        id: this.id,
        startingTime: 60 * (60 * h + m),
        duration: this.duration
      }, 'Slot')
    },
    resetForm() {
      this.startingTime = ''
      this.duration = ''
    },
  }
}
</script>
