<template>
  <q-page padding>
    <div class="text-h5 q-my-md">
      Search Fines
    </div>
    <div class="row q-col-gutter-md">
      <q-input
        class="col-6"
        v-model="id"
        label="Student ID"
        outlined
        :rules="[() => !!id || 'Please Enter Student ID']"
      >
        <template v-slot:append>
          <q-btn icon="search" flat color="primary" :disable="!id" @click="loadFines"/>
        </template>
      </q-input>
    </div>
    <div v-if="showResults" class="q-mt-lg">
      <q-separator class="q-my-sm"/>
      <q-table
        title="Results"
        :data="tableData"
        :columns="columns"
        flat
        wrap-cells
        row-key="_id"
        @row-click="onRowClick"
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
        <template v-slot:body-cell-description="props">
          <q-td :props="props">
            {{props.value}}
            <q-tooltip content-style="font-size: 1.1em; background-color: black" max-width="50vw">
              {{props.row.description}}
            </q-tooltip>
          </q-td>
        </template>
      </q-table>
      <q-btn
        label="Clear Selected" color="primary" unelevated @click="clearFines"
        :loading="clearLoading" :disable="selected.length === 0"
      />
    </div>
    <q-inner-loading :showing="searchLoading"/>
    <div style="min-height: 200px"></div>
  </q-page>
</template>

<script>
import {DUE_STATUS} from 'src/utils/constants'
import columnMerger from 'src/utils/columnMerger'
import search from 'src/mixins/search'

const moneyFormat = val => `৳ ${val}`
const dateFormat = val => new Intl.DateTimeFormat('en', {month: 'short', day: 'numeric', year: 'numeric'}).format(new Date(val))

const maxLen = 20
const descFormat = val => val.slice(0, maxLen).trim() + (val.length > maxLen ? '...' : '')

const columns = [
  {name: 'fineType', label: 'Fine Type', field: 'fineType', align: 'center'},
  {name: 'amount', label: 'Initial Amount', field: 'amount', align: 'center', format: moneyFormat},
  {name: 'deadline', label: 'Deadline', field: 'deadline', align: 'center', format: dateFormat},
  // {name: 'delayFine', label: 'Delay Fine', field: 'delayFine', align: 'center', format: moneyFormat},
  {name: 'currentAmount', label: 'Current Amount', field: 'currentAmount', align: 'center', format: moneyFormat},
  // {name: 'issueDate', label: 'Issue Date', field: 'issueDate', align: 'center', format: dateFormat},
  {name: 'status', label: 'Status', field: 'status', align: 'center', sortable: true},
  {name: 'description', label: 'Description', field: 'description', align: 'center', format: descFormat}
]

const commonAttr = {
  style: 'font-size: 1.02em;', headerStyle: 'font-size: 1.02em;'
}

columnMerger(columns, commonAttr)

export default {
  name: 'FineSearch',
  mixins: [
    search
  ],
  data() {
    return {
      id: null,
      clearLoading: false,
      selected: [],
      DUE_STATUS,
      columns,
    }
  },
  computed: {
    selectedIDs() {
      return this.selected.map(x => x._id)
    }
  },
  methods: {
    getSelectedString () {
      return this.selected.length === 0 ? '' : `${this.selected.length} record${this.selected.length > 1 ? 's' : ''} selected of ${this.tableData.length}`
    },
    onSelect() {
      this.selected = this.selected.filter(x => x.status === DUE_STATUS.PENDING)
    },
    loadFines() {
      this.callSearchApi('/fine/list/'+this.id, {}, 'Fine')
        .then(() => this.tableData = this.tableData.sort((a, b) => a.status > b.status ? -1 : 1))
    },
    clearFines() {
      this.clearLoading = true
      this.$adminAPI.post('/fine/clear', {
        ids: this.selected.map(x => x._id)
      })
        .then(() => {
          this.clearLoading = false
          this.tableData = this.tableData.map(x => {
            if (this.selectedIDs.includes(x._id)) {
              x.status = DUE_STATUS.CLEARED
            }
            return x
          })
          this.selected = []
        })
        .catch(() => {
          this.clearLoading = false
          this.$q.notify({
            message: 'Failed to clear selected fines',
            type: 'negative'
          })
        })
    },
    onRowClick(event, row) {
      const routeData = this.$router.resolve({
        name: 'AdminFineEditPage',
        params: {
          fineID: row._id,
        }
      })
      window.open(routeData.href, '_blank')
    }
  }
}
</script>
