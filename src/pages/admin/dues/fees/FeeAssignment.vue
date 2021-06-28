<template>
  <q-page padding>
    <div class="row">
      <div class="text-h5 q-my-md col-6">
        Assign Fees
      </div>
      <!--<div class="col-6">-->
      <!--  <q-toggle class="q-mt-md float-right" v-model="editMode" label="Edit Mode" color="primary" icon="edit"/>-->
      <!--</div>-->
    </div>
    <div class="row q-col-gutter-md q-pb-sm">
      <q-select
        class="col-6"
        v-model="feeType"
        label="Fee Type"
        outlined
        :options="feeOptions"
        :rules="[() => !!feeType || 'Please Select Fee Type']"
      />
    </div>
    <q-form v-if="feeType" class="row q-col-gutter-md" @submit="checkAssignFee" @reset="resetForm">
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
        :rules="[() => !!amount || 'Please Enter Fee Amount', noNegative(amount)]"
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
        :rules="[() => !!delayFine || 'Please Enter Delay Fine', noNegative(delayFine)]"
      />
      <div class="col-12 text-h5">
        Filters for Batch Assign
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
        <q-btn label="Assign" type="submit" color="primary" unelevated :loading="assignInfoLoading"/>
        <q-btn label="Reset" type="reset" color="primary" flat/>
      </div>
    </q-form>
    <div style="min-height: 200px"></div>
    <q-dialog v-model="showDialog">
      <q-card>
        <q-card-section>
          <div v-if="assignDone">
            <q-icon name="analytics" size="lg"/>
            <span class="text-h5 vertical-middle q-ml-sm">Batch Process Result</span>
          </div>
          <div v-else>
            <q-icon name="info" size="lg"/>
            <span class="text-h5 vertical-middle q-ml-sm">Attention</span>
          </div>
        </q-card-section>
        <q-separator/>
        <q-card-section>
          <div style="height: 120px; width: 500px">
            <div v-if="assignDone">
              <q-markup-table flat dense separator="cell" class="q-mb-md">
                <tbody>
                <tr>
                  <td :style="dialogStyle">Total:</td>
                  <td :style="dialogStyle">{{effectCount}}</td>
                </tr>
                <tr>
                  <td :style="dialogStyle">Successful:</td>
                  <td :style="{...dialogStyle, color: 'green'}">
                    {{successCount}}
                  </td>
                </tr>
                <tr>
                  <td :style="dialogStyle">Failed:</td>
                  <td :style="{...dialogStyle, color: 'red'}">
                    {{effectCount - successCount}}
                  </td>
                </tr>
                </tbody>
              </q-markup-table>
              <span v-if="!allSuccess" :style="dialogStyle">
                Try again to complete the batch process
              </span>
            </div>
            <div v-else :style="dialogStyle">
              <span style="font-size: 1.2em">{{effectCount}}</span> students will be affected by this<br/>
              Do you wish to continue?
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <div v-if="assignDone">
            <q-btn flat label="OK" color="primary" v-close-popup/>
          </div>
          <div v-else>
            <q-btn unelevated label="Continue" color="primary" @click="assignFee"/>
            <q-btn flat label="Cancel" color="primary" v-close-popup/>
          </div>
        </q-card-actions>
        <q-inner-loading :showing="assignLoading"/>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import {noNegative} from 'src/utils/utilities'
import {extract} from 'src/utils/apiDataPreProcessor'
import {DUE_TYPES} from 'src/utils/constants'
import SessionField from 'components/FormElements/SessionField'
import DepartmentPicker from 'components/FormElements/DepartmentPicker'
import HallPicker from 'components/FormElements/HallPicker'
import {feeOptions} from 'src/utils/privilegedConstants'

const dialogStyle = {
  fontSize: '1.2em'
}

export default {
  name: 'FeeAssignment',
  components: {HallPicker, DepartmentPicker, SessionField},
  data() {
    return {
      feeType: null,
      amount: null,
      deadline: null,
      delayFine: null,
      yearMonth: null,
      ids: null,
      dept: null,
      hall: null,
      level: null,
      term: null,
      effectCount: 0,
      successCount: 0,
      showDialog: false,
      assignInfoLoading: false,
      assignLoading: false,
      assignDone: false,
      dialogStyle,
      DUE_TYPES,
      feeOptions
    }
  },
  computed: {
    allSuccess() {
      return this.effectCount === this.successCount
    },
    filterData() {
      return {
        dueType: this.feeType,
        ids: this.ids,
        department: extract(this.dept),
        hall: extract(this.hall),
        level: this.level,
        term: this.term,
      }
    }
  },
  methods: {
    noNegative,
    checkAssignFee() {
      this.assignDone = false
      this.assignInfoLoading = true
      this.$adminAPI.post('/due/batchInfo', this.filterData)
        .then(response => {
          this.assignInfoLoading = false
          this.effectCount = response.data.willAffect
          this.showDialog = true
        })
        .catch(() => {
          this.assignInfoLoading = false
          this.$q.notify({
            message: 'Failed to load batch process info',
            type: 'negative'
          })
        })
    },
    assignFee() {
      this.assignLoading = true
      const data = {
        amount: this.amount,
        deadline: new Date(this.deadline),
        delayFine: this.delayFine,
        ...this.filterData
      }
      if (this.feeType === DUE_TYPES.DINING_FEE) {
        data.yearMonth = new Date(this.yearMonth).toString()
      } else {
        data.session = new Date(this.yearMonth).toString()
      }
      this.$adminAPI.post('/due/upsert', data)
        .then(response => {
          this.assignLoading = false
          this.assignDone = true
          this.successCount = response.data.duesModified
        })
        .catch(error => {
          this.assignLoading = false
          this.assignDone = true
          this.successCount = error.response.data.duesModified
        })
    },
    resetForm() {
      this.amount = null
      this.deadline = null
      this.delayFine = null
      this.yearMonth = null
      this.ids = null
      this.dept = null
      this.hall = null
      this.level = null
      this.term = null
    }
  }
}
</script>
