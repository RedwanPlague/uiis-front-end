<template>
  <q-page padding>
    <div class="row">
      <div class="text-h5 q-my-md col-6">
        {{label}} Fees
      </div>
      <div class="col-6">
        <q-toggle class="q-mt-md float-right" v-model="editMode" label="Edit Mode" color="primary" icon="edit"/>
      </div>
    </div>
    <div class="row q-col-gutter-md q-pb-sm">
      <q-select
        class="col-6"
        v-model="feeType"
        label="Fee Type"
        outlined
        :options="Object.values(DUE_TYPES)"
        :rules="[() => !!feeType || 'Please Select Fee Type']"
      />
    </div>
    <q-form v-if="feeType" class="row q-col-gutter-md" @submit="assignFee" @reset="resetForm">
      <session-field
        classes="col-6"
        v-model="yearMonth"
        :label="feeType === DUE_TYPES.DINING_FEE ? 'Month Year' : 'Session'"
        required
        :readonly="feeType !== DUE_TYPES.DINING_FEE"
        :generic="feeType === DUE_TYPES.DINING_FEE"
      />
      <q-input
        class="col-6"
        v-model="amount"
        label="Amount"
        type="number"
        min="0"
        outlined
        :rules="[() => !!amount || 'Please Enter Fee Amount']"
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
        label="Delay Fine"
        type="number"
        min="0"
        outlined
      />
      <div class="col-12 text-h5">
        Filters for Batch {{label}}
      </div>
      <q-select
        class="col-12 q-mb-md"
        v-model="ids"
        label="Student ID(s)"
        multiple use-chips use-input clearable
        new-value-mode="add-unique"
        outlined
      />
      <department-picker classes="col-6" v-model="dept" label="Department"/>
      <hall-picker classes="col-6" v-model="hall" label="Hall"/>
      <q-input
        class="col-6"
        v-model="level"
        label="Level"
        type="number"
        min="1" max="4"
        outlined
      />
      <q-input
        class="col-6"
        v-model="term"
        label="Term"
        type="number"
        min="1" max="2"
        outlined
      />
      <div class="col-12 q-mt-md">
        <q-btn
          :label="label"
          type="submit" color="primary" unelevated
          :loading="(editMode && createLoading) || (!editMode && editLoading)"
        />
        <q-btn label="Reset" type="reset" color="primary" flat/>
      </div>
    </q-form>
    <div style="min-height: 200px"></div>
  </q-page>
</template>

<script>
import {DUE_TYPES} from 'src/utils/constants'
import SessionField from 'components/FormElements/SessionField'
import creator from 'src/mixins/creator'
import edit from 'src/mixins/edit'
import DepartmentPicker from 'components/FormElements/DepartmentPicker'
import HallPicker from 'components/FormElements/HallPicker'

export default {
  name: 'FeeAssignment',
  components: {HallPicker, DepartmentPicker, SessionField},
  mixins: [
    creator,
    edit
  ],
  data() {
    return {
      feeType: DUE_TYPES.DINING_FEE,
      amount: null,
      deadline: null,
      delayFine: null,
      yearMonth: null,
      ids: [],
      dept: null,
      hall: null,
      level: null,
      term: null,
      editMode: false,
      DUE_TYPES
    }
  },
  computed: {
    label() {
      return this.editMode ? 'Update' : 'Assign'
    }
  },
  methods: {
    assignFee() {

    },
    resetForm() {

    }
  }
}
</script>
