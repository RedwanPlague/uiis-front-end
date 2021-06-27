<template>
  <q-page padding>
    <div class="text-h5 q-my-md">
      Search Fees
    </div>
    <q-form class="row q-col-gutter-md" @submit="loadFees" @reset="resetForm">
      <q-select
        class="col-12"
        v-model="ids"
        label="Student ID(s)"
        multiple use-chips use-input clearable
        new-value-mode="add-unique"
        outlined
        :rules="[() => (!!ids && ids.length > 0) || 'Please Enter at least one Student ID']"
      />
      <q-select
        class="col-6"
        v-model="feeType"
        label="Fee Type"
        outlined
        :options="feeOptions"
        :rules="[() => !!feeType || 'Please Select Fee Type']"
      />
      <session-field
        classes="col-6"
        v-model="yearMonth"
        :label="feeType === DUE_TYPES.DINING_FEE ? 'Month Year' : 'Session'"
        required
        :readonly="feeType !== DUE_TYPES.DINING_FEE"
        :generic="feeType === DUE_TYPES.DINING_FEE"
      />
      <div class="col-12">
        <q-btn label="Search" type="submit" color="primary" unelevated/>
        <q-btn label="Reset" type="reset" color="primary" flat/>
      </div>
    </q-form>
    <div v-if="showResults" class="q-mt-lg">
      <q-separator class="q-my-sm"/>
      <q-table
        title="Results"
        :data="fees"
        :columns="columns"
        flat
        wrap-cells
        row-key="_id"
        :selected-rows-label="getSelectedString"
        :selected.sync="selected"
        selection="multiple"
      >
        <template v-slot:header-selection="scope">
          <q-checkbox v-model="scope.selected" @input="onSelect"/>
        </template>
        <template v-slot:body-selection="scope">
          <q-checkbox v-if="scope.row.status === DUE_STATUS.PENDING" v-model="scope.selected"/>
        </template>
        <template v-slot:body-cell-status="props">
          <q-td :props="props" :style="{color: (props.value === DUE_STATUS.PENDING ? 'red' : 'green')}">
            {{props.value}}
          </q-td>
        </template>
      </q-table>
      <q-btn
        label="Clear Selected" color="primary" unelevated @click="clearFees"
        :loading="clearLoading" :disable="selected.length === 0"
      />
    </div>
    <q-inner-loading :showing="resultsLoading"/>
    <div style="min-height: 200px"></div>
  </q-page>
</template>

<script>
import SessionField from 'components/FormElements/SessionField'
import {DUE_TYPES, DUE_STATUS} from 'src/utils/constants'
import columnMerger from 'src/utils/columnMerger'
import {feeOptions} from 'src/utils/privilegedConstants'

const moneyFormat = val => `৳ ${val}`
const dateFormat = val => new Intl.DateTimeFormat('en', {month: 'short', day: 'numeric', year: 'numeric'}).format(new Date(val))

const columns = [
  {name: 'issuedTo', label: 'Student ID', field: 'issuedTo', align: 'center'},
  {name: 'amount', label: 'Initial Amount', field: 'amount', align: 'center', format: moneyFormat},
  {name: 'deadline', label: 'Deadline', field: 'deadline', align: 'center', format: dateFormat},
  {name: 'delayFine', label: 'Delay Fine', field: 'delayFine', align: 'center', format: moneyFormat},
  {name: 'currentAmount', label: 'Current Amount', field: 'currentAmount', align: 'center', format: moneyFormat},
  // {name: 'issueDate', label: 'Issue Date', field: 'issueDate', align: 'center', format: dateFormat},
  {name: 'status', label: 'Status', field: 'status', align: 'center', sortable: true},
]

const commonAttr = {
  style: 'font-size: 1.02em;', headerStyle: 'font-size: 1.02em;'
}

columnMerger(columns, commonAttr)

export default {
  name: 'FeeSearch',
  components: {
    SessionField
  },
  data() {
    return {
      ids: [],
      feeType: null,
      yearMonth: null,
      showResults: false,
      resultsLoading: false,
      clearLoading: false,
      fees: [],
      selected: [],
      DUE_TYPES,
      DUE_STATUS,
      feeOptions,
      columns,
    }
  },
  computed: {
    partialData() {
      const data = {
        dueType: this.feeType
      }
      if (this.feeType === DUE_TYPES.DINING_FEE) {
        data.yearMonth = new Date(this.yearMonth).toString()
      } else {
        data.session = new Date(this.yearMonth).toString()
      }
      return data
    },
    selectedIDs() {
      return this.selected.map(x => x.issuedTo)
    }
  },
  methods: {
    getSelectedString () {
      return this.selected.length === 0 ? '' : `${this.selected.length} record${this.selected.length > 1 ? 's' : ''} selected of ${this.fees.length}`
    },
    onSelect() {
      this.selected = this.selected.filter(x => x.status === DUE_STATUS.PENDING)
    },
    loadFees() {
      this.resultsLoading = true
      this.$adminAPI.post('/due/getDue', {...this.partialData, ids: this.ids})
        .then(response => {
          this.fees = response.data.sort((a, b) => a.status > b.status ? -1 : 1)
          this.resultsLoading = false
          this.showResults = true
        })
        .catch(() => {
          this.resultsLoading = false
          this.$q.notify({
            message: 'Failed to load due list, Try Again',
            type: 'negative'
          })
        })
    },
    clearFees() {
      this.clearLoading = true
      this.$adminAPI.post('/due/clearDue', {...this.partialData, ids: this.selectedIDs})
        .then(() => {
          this.clearLoading = false
          this.fees = this.fees.map(x => {
            if (this.selectedIDs.includes(x.issuedTo)) {
              x.status = DUE_STATUS.CLEARED
            }
            return x
          })
          this.selected = []
        })
        .catch(() => {
          this.clearLoading = false
          this.$q.notify({
            message: 'Failed to clear selected fees',
            type: 'negative'
          })
        })
    },
    resetForm() {
      this.ids = []
      this.feeType = null
      this.yearMonth = null
    }
  }
}
</script>
