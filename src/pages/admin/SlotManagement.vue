<template>
  <q-page padding>
    <div class="text-h5 q-mb-md">
      Slots
    </div>
    <q-form
      v-if="!dataLoading"
      @submit="updateSlots"
      @reset="resetForm"
    >
      <div v-for="(slot, idx) in slots" :key="idx" class="row q-col-gutter-md q-mb-sm">
        <q-input
          class="col-3"
          v-model="slot.id"
          label="Slot No"
          outlined
          stack-label
          :readonly="slot.old"
          :rules="[() => !!slot.id || 'Please Enter Slot No']"
        />
        <q-input
          class="col-4"
          v-model="slot.startingTime"
          label="Starting Time"
          stack-label
          type="time"
          :rules="[() => !!slot.startingTime || 'Please Enter Starting Time']"
          outlined
          :readonly="slot.viewing"
        />
        <q-input
          class="col-4"
          v-model="slot.duration"
          label="Duration"
          stack-label
          type="number"
          min="0"
          step="5"
          suffix="minutes"
          outlined
          :readonly="slot.viewing"
          :rules="[() => !!slot.duration || 'Please Enter Duration']"
        />
        <div class="col-1">
          <q-btn
            v-if="slot.old"
            :icon="slot.viewing ? 'edit' : 'visibility'"
            :color="slot.viewing ? 'primary' : 'black'"
            @click="slot.viewing = !slot.viewing"
            flat dense
          />
          <q-btn
            v-else
            icon="delete" color="primary" flat dense
            @click="localRemoveSlot(idx)"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-3"></div>
        <q-btn
          class="col-6" color="primary"
          outline icon="add" :ripple="false"
          @click="localAddSlot"
        />
      </div>
      <div class="col-12 q-mt-lg">
        <q-btn label="Update" type="submit" color="primary" unelevated :loading="doneCounter > 0"/>
        <q-btn label="Reset" type="reset" color="primary" flat/>
      </div>
    </q-form>
    <q-inner-loading :showing="dataLoading"/>
  </q-page>
</template>

<script>
import {apiFetch} from 'src/utils/apiWrappers'
import {secondsToHour24, hour24ToSeconds} from 'src/utils/dateFormatters'

export default {
  name: 'SlotManagement',
  data() {
    return {
      slots: [],
      slotList: [],
      dataLoading: false,
      doneCounter: 0
    }
  },
  methods: {
    fetchSlots() {
      this.dataLoading = true
      apiFetch('/slot/list', null, 'Slots')
        .then(response => {
          this.dataLoading = false
          this.slotList = response.data
          this.resetForm()
        })
        .catch(() => {
          this.dataLoading = false
        })
    },
    localAddSlot() {
      this.slots.push({
        id: '',
        startingTime: '',
        duration: '',
        viewing: false,
        old: false
      })
    },
    localRemoveSlot(idx) {
      this.slots.splice(idx, 1)
    },
    doneUpdate() {
      this.doneCounter--
      if (this.doneCounter === 0) {
        // this.fetchSlots()
        this.$q.notify({
          message: 'Updated slots successfully',
          type: 'positive'
        })
      }
    },
    updateSlots() {
      this.doneCounter = this.slots.length
      for (const slot of this.slots) {
        if (slot.old) {
          this.editSlot(slot)
        } else {
          this.createSlot(slot)
        }
      }
    },
    createSlot(slot) {
      this.$adminAPI.post('/slot/create', {
        id: slot.id,
        startingTime: hour24ToSeconds(slot.startingTime),
        duration: slot.duration
      })
        .then(() => this.doneUpdate())
        .catch(error => {
          this.doneUpdate()
          console.log('Failed to create slot: ' + slot.id)
          console.log(error.response)
        })
    },
    editSlot(slot) {
      this.$adminAPI.patch('/slot/update/' + slot.id, {
        startingTime: hour24ToSeconds(slot.startingTime),
        duration: slot.duration
      })
        .then(() => this.doneUpdate())
        .catch(error => {
          this.doneUpdate()
          console.log('Failed to edit slot: ' + slot.id)
          console.log(error.response)
        })
    },
    resetForm() {
      this.slots = this.slotList.map(x => {
        return {
          id: x.id,
          startingTime: secondsToHour24(x.startingTime),
          duration: x.duration,
          viewing: true,
          old: true
        }
      })
    },
  },
  created() {
    this.fetchSlots()
  }
}
</script>
