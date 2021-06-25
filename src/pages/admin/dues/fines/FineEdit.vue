<template>
  <q-page padding>
    <div class="row">
      <div class="col-6 text-h5 q-my-md">
        {{label}} Fine
        <q-btn
          v-if="status === DUE_STATUS.PENDING"
          :icon="viewing ? 'edit' : 'visibility'"
          :color="viewing ? 'primary' : 'black'"
          @click="viewing = !viewing"
          flat dense
        />
      </div>
      <div class="col-6">
        <q-btn
          class="q-mt-md float-right"
          icon="delete" flat color="red"
          @click="deleteFine"
        >
          <q-tooltip content-style="font-size: 1em; background-color: red">delete this fine</q-tooltip>
        </q-btn>
      </div>
    </div>
    <q-form v-if="fineType" class="row q-col-gutter-md" @submit="updateFine" @reset="resetForm">
      <q-select
        class="col-6"
        v-model="fineType"
        label="Fine Type"
        outlined
        readonly
        :options="fineOptions"
        :rules="[() => !!fineType || 'Please Select Fine Type']"
      />
      <q-input
        class="col-6"
        v-model="issuedTo"
        label="Student ID"
        outlined
        readonly
        :rules="[() => !!issuedTo || 'Please Enter Student ID']"
      />
      <q-input
        class="col-6"
        v-model="amount"
        label="Amount"
        type="number"
        min="0"
        outlined
        :readonly="viewing"
        :rules="[() => !!amount || 'Please Enter Fine Amount', noNegative(amount)]"
      />
      <q-input
        class="col-6" label="Deadline" v-model="deadline"
        outlined :readonly="viewing"
        mask="date" :rules="['date']"
      >
        <template v-slot:append v-if="!viewing">
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
              <q-date v-model="deadline">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat/>
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-input
        class="col-6"
        v-model="delayFine"
        :label="`Delay Fine ${fineType === FINE_TYPES.LIBRARY_FINE ? '(Per Day)' : ''}`"
        type="number"
        min="0"
        outlined
        :readonly="viewing"
        :rules="[() => !!delayFine || 'Please Enter Delay Fine', noNegative(delayFine)]"
      />
      <q-input
        class="col-6"
        v-model="status"
        label="Status"
        outlined
        readonly
        :rules="[() => !!status || 'Please Assign Status']"
      />
      <q-input
        class="col-12"
        v-model="description"
        :label="'Description' + (descTooLong ? ` (${description.length}/${descLimit})` : '')"
        outlined
        :readonly="viewing"
        autogrow
        :rules="[
          () => !!description || 'Please provide a reason for this Fine',
          () => !descTooLong || `Maximum ${descLimit} characters allowed`
        ]"
      />
      <div class="col-12" v-if="status === DUE_STATUS.PENDING && !viewing">
        <q-btn label="Update" color="primary" unelevated @click="updateFine" :loading="editLoading"/>
        <q-btn label="Reset" color="primary" flat @click="resetForm"/>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import {FINE_TYPES, DUE_STATUS} from 'src/utils/constants'
import edit from 'src/mixins/edit'
import {noNegative} from 'src/utils/utilities'
import {fineOptions} from 'src/utils/privilegedConstants'

export default {
  name: 'FineAssignment',
  mixins: [
    edit
  ],
  data() {
    return {
      fineType: null,
      issuedTo: null,
      amount: null,
      deadline: null,
      delayFine: null,
      status: null,
      description: null,
      descLimit: 200,
      FINE_TYPES,
      DUE_STATUS,
      fineOptions
    }
  },
  computed: {
    descTooLong() {
      return !!this.description && this.description.length > this.descLimit
    },
    fineID() {
      return this.$route.params.fineID
    }
  },
  methods: {
    noNegative,
    updateFine() {
      this.callEditApi('/fine/update/'+this.fineID, {
        // fineType: this.fineType,
        // issuedTo: this.issuedTo,
        amount: this.amount,
        deadline: new Date(this.deadline),
        delayFine: this.delayFine,
        description: this.description
      }, 'Fine')
        .catch(() => {})
    },
    deleteFine() {
      this.$adminAPI.delete('/fine/delete/'+this.fineID)
        .then(() => {
          this.$router.replace({name: 'AdminFineSearchPage'})
        })
        .catch(() => {
          this.$q.notify({
            message: 'Failed to delete fine, Try Again',
            type: 'negative'
          })
        })
    },
    resetForm() {
      this.loadOldDataIntoForm()
    }
  },
  created() {
    this.fetchOldData('/fine/get/'+this.fineID, {}, 'Fine')
      .catch(() => {})
  }
}
</script>
