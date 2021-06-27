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
            v-if="!slot.old"
            icon="delete" color="primary" flat dense
            @click="localRemoveSlot(idx)"
          />
          <q-btn
            v-else
            :icon="slot.viewing ? 'edit' : 'visibility'"
            :color="slot.viewing ? 'primary' : 'black'"
            @click="slot.viewing = !slot.viewing"
            flat dense
          />
        </div>
      </div>
      <div class="row" v-if="canCreate">
        <div class="col-3"></div>
        <q-btn
          class="col-6" color="primary"
          outline icon="add" :ripple="false"
          @click="localAddSlot"
        />
      </div>
      <div class="col-12 q-mt-lg">
        <q-btn label="Update" type="submit" color="primary" unelevated/>
        <q-btn label="Reset" type="reset" color="primary" flat/>
      </div>
    </q-form>
    <q-inner-loading :showing="dataLoading"/>
  </q-page>
</template>

<script>
import {apiFetch} from 'src/utils/apiWrappers'
import {secondsToHour24, hour24ToSeconds} from 'src/utils/dateFormatters'
import creator from 'src/mixins/creator'
import edit from 'src/mixins/edit'
import {mapGetters} from 'vuex'
import {PRIVILEGES} from 'src/utils/constants'

export default {
  name: 'SlotManagement',
  mixins: [
    creator,
    edit
  ],
  data() {
    return {
      slots: [],
      slotList: [],
      dataLoading: false,
    }
  },
  computed: {
    ...mapGetters([
      'userHasPrivilege'
    ]),
    canCreate() {
      return this.userHasPrivilege(PRIVILEGES.SLOT_CREATION)
    },
    canUpdate() {
      return this.userHasPrivilege(PRIVILEGES.SLOT_UPDATE)
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
        id: null,
        startingTime: null,
        duration: null,
        viewing: false,
        old: false
      })
    },
    localRemoveSlot(idx) {
      this.slots.splice(idx, 1)
    },
    updateSlots() {
      this.slots.forEach((slot, idx) => {
        if (slot.old) {
          const prev = this.slotList[idx]
          if (
            prev.startingTime !== hour24ToSeconds(slot.startingTime) ||
            prev.duration !== parseInt(slot.duration)
          ) {
            this.editSlot(slot)
          }
        } else {
          this.createSlot(slot)
        }
      })
      this.fetchSlots()
    },
    createSlot(slot) {
      this.callCreateApi('/slot/create', {
        id: slot.id,
        startingTime: hour24ToSeconds(slot.startingTime),
        duration: slot.duration
      }, `Slot ${slot.id}`)
    },
    editSlot(slot) {
      this.callEditApi('/slot/update/' + slot.id, {
        startingTime: hour24ToSeconds(slot.startingTime),
        duration: slot.duration
      }, `Slot ${slot.id}`)
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
