<template>
  <q-page padding>
    <div class="text-h5 q-my-md">
      Assign Fines
    </div>
    <div class="row q-col-gutter-md q-pb-sm">
      <q-select
        class="col-6"
        v-model="fineType"
        label="Fine Type"
        outlined
        :options="Object.values(FINE_TYPES)"
        :rules="[() => !!fineType || 'Please Select Fine Type']"
      />
    </div>
    <q-form v-if="fineType" class="row q-col-gutter-md" @submit="assignFine" @reset="resetForm">
      <q-input
        class="col-6"
        v-model="id"
        label="Student ID"
        outlined
        :rules="[() => !!id || 'Please Enter an ID']"
      />
      <q-input
        class="col-6"
        v-model="amount"
        label="Amount"
        type="number"
        min="0"
        outlined
        :rules="[() => !!amount || 'Please Enter Fine Amount', noNegative(amount)]"
      />
      <q-input class="col-6" label="Deadline" outlined v-model="deadline" mask="date" :rules="['date']">
        <template v-slot:append>
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
        :rules="[() => !!delayFine || 'Please Enter Delay Fine', noNegative(delayFine)]"
      />
      <q-input
        class="col-12"
        v-model="description"
        :label="'Description' + (descTooLong ? ` (${description.length}/${descLimit})` : '')"
        outlined
        autogrow
        :rules="[
          () => !!description || 'Please provide a reason for this Fine',
          () => !descTooLong || `Maximum ${descLimit} characters allowed`
        ]"
      />
      <div class="col-12 q-mt-lg">
        <q-btn label="Assign" color="primary" unelevated @click="assignFine" :loading="createLoading"/>
        <q-btn label="Reset" color="primary" flat @click="resetForm"/>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import {FINE_TYPES} from 'src/utils/constants'
import creator from 'src/mixins/creator'
import {noNegative} from 'src/utils/utilities'

export default {
  name: 'FineAssignment',
  mixins: [
    creator
  ],
  data() {
    return {
      fineType: null,
      id: null,
      amount: null,
      deadline: null,
      delayFine: null,
      description: null,
      descLimit: 200,
      FINE_TYPES
    }
  },
  computed: {
    descTooLong() {
      return !!this.description && this.description.length > this.descLimit
    }
  },
  methods: {
    noNegative,
    assignFine() {

    },
    resetForm() {
      this.id = null
      this.amount = null
      this.deadline = null
      this.delayFine = null
      this.description = null
    }
  }
}
</script>
