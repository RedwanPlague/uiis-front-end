<template>
  <q-page padding>
    <div class="text-h5 q-my-sm">
      Unpaid Dues
    </div>
    <div v-if="showResults">
      <q-separator class="q-mb-sm"/><q-separator/>
      <q-table
        title="Fees"
        :data="tableData.dues"
        :columns="feeColumns"
        flat
        wrap-cells
        row-key="_id"
        no-data-label="You have no unpaid fees"
      >
        <template v-slot:body-cell-yearMonth="props">
          <q-td :props="props">
            {{props.value}}<br/>
            <span style="font-size: 0.9em">
              <span v-if="props.row.dueType === DUE_TYPES.DINING_FEE">(dining month)</span>
              <span v-else>(session)</span>
            </span>
          </q-td>
        </template>
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <payment-initiator :row="props.row" type="due"/>
          </q-td>
        </template>
      </q-table>
      <q-separator class="q-mb-sm"/><q-separator/>
      <q-table
        title="Fines"
        :data="tableData.fines"
        :columns="fineColumns"
        flat
        wrap-cells
        row-key="_id"
        no-data-label="You have no unpaid Fines"
      >
        <template v-slot:body-cell-description="props">
          <q-td :props="props" class="cursor-pointer">
            {{props.value}}
            <q-tooltip content-style="font-size: 1.1em; background-color: black" max-width="50vw">
              {{props.row.description}}
            </q-tooltip>
          </q-td>
        </template>
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <payment-initiator :row="props.row" type="fine"/>
          </q-td>
        </template>
      </q-table>
    </div>
    <q-inner-loading :showing="searchLoading"/>
    <div style="min-height: 200px"></div>
  </q-page>
</template>

<script>
import search from 'src/mixins/search'
import columnMerger from 'src/utils/columnMerger'
import {DUE_TYPES} from 'src/utils/constants'
import PaymentInitiator from 'components/PaymentInitiator'

const moneyFormat = val => `৳ ${val}`
const dateFormat = val => new Intl.DateTimeFormat('en', {month: 'short', day: 'numeric', year: 'numeric'}).format(new Date(val))
const monthYearFormat = val => new Intl.DateTimeFormat('en', {month: 'short', year: 'numeric'}).format(new Date(val))

const maxLen = 20
const descFormat = val => val.slice(0, maxLen).trim() + (val.length > maxLen ? '...' : '')

const feeColumns = [
  {name: 'dueType', label: 'Type', field: 'dueType', align: 'center'},
  {name: 'yearMonth', label: 'For', field: row => row.session || row.yearMonth,
    align: 'center', format: monthYearFormat},
  {name: 'amount', label: 'Initial Amount', field: 'amount', align: 'center', format: moneyFormat},
  {name: 'deadline', label: 'Deadline', field: 'deadline', align: 'center', format: dateFormat},
  {name: 'currentAmount', label: 'Current Amount', field: 'currentAmount', align: 'center', format: moneyFormat},
  {name: 'action', label: 'Action', field: 'action', align: 'center'},
]
const commonAttr = {
  style: 'font-size: 1.02em;', headerStyle: 'font-size: 1.02em;'
}
columnMerger(feeColumns, commonAttr)

const fineColumns = [
  {name: 'fineType', label: 'Type', field: 'fineType', align: 'center'},
  {name: 'amount', label: 'Initial Amount', field: 'amount', align: 'center', format: moneyFormat},
  {name: 'deadline', label: 'Deadline', field: 'deadline', align: 'center', format: dateFormat},
  {name: 'currentAmount', label: 'Current Amount', field: 'currentAmount', align: 'center', format: moneyFormat},
  {name: 'description', label: 'Description', field: 'description', align: 'center', format: descFormat},
  {name: 'action', label: 'Action', align: 'center'},
]
columnMerger(fineColumns, commonAttr)

export default {
  name: 'DueView',
  components: {PaymentInitiator},
  mixins: [
    search
  ],
  data() {
    return {
      feeColumns,
      fineColumns,
      DUE_TYPES
    }
  },
  methods: {
    loadDues() {
      this.callSearchApi('/student/due/list', {}, 'Dues List').catch(() => {})
    },
  },
  created() {
    this.loadDues()
  }
}
</script>

<style scoped>
.money {
  color: #118C4F;
}
</style>
