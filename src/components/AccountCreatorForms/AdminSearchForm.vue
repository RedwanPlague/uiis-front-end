<template>
  <div>
    <div class="text-h5 q-my-md">
      Search Admin Account
    </div>
    <q-form class="row q-col-gutter-md" @submit="searchAccount" @reset="resetForm">
      <q-input
        class="col-6"
        v-model="name"
        label="Name"
        filled
        :rules="[() => !!columns || 'Dummy Text']"
      />
      <q-input
        class="col-6"
        v-model="id"
        label="Admin Id"
        filled
        :rules="[() => !!columns || 'Dummy Text']"
      />
      <privilege-picker
        classes="col-12"
        v-model="privileges"
        label="Privileges"
        multiple
      />
      <div class="col-12">
        <q-btn label="Search" type="submit" color="primary" unelevated/>
        <q-btn label="Reset" type="reset" color="primary" flat/>
      </div>
    </q-form>
    <div v-if="showResults" class="q-mt-lg">
      <q-table
        title="Results"
        :data="tableData"
        :columns="columns"
        @row-click="onRowClick"
      />
    </div>
    <q-inner-loading :showing="searchLoading"/>
  </div>
</template>

<script>
import PrivilegePicker from "components/FormElements/PrivilegePicker";
import columnMerger from 'src/utils/columnMerger'
import search from 'src/mixins/search'

const format = val => {
  if (val.length === 0) {
    return 'None'
  }
  let newVal = ''
  for (const privilege of val) {
    newVal += privilege + ', '
  }
  return newVal
}

const columns = [
  {name: 'id', label: 'Admin ID', field: 'id', style: 'width: 10%;', sortable: true},
  {name: 'name', label: 'Name', field: 'name', align: 'left'},
  {name: 'privileges', label: 'Privileges', field: 'privileges', format},
]
const commonAttr = {
  style: 'font-size: 1.05em;', headerStyle: 'font-size: 1.05em;'
}
columnMerger(columns, commonAttr)

export default {
  name: 'AdminCreatorForm',
  components: {
    PrivilegePicker,
  },
  mixins: [
    search
  ],
  data() {
    return {
      name: '',
      id: '',
      privileges: [],
      columns
    }
  },
  methods: {
    searchAccount() {
      this.callSearchApi('account/admin/list', {
        id: this.id,
        name: this.name,
        privileges: this.privileges
      }, 'Admin account')
    },
    resetForm() {
      this.name = ''
      this.id = ''
      this.privileges = []
    },
    onRowClick(event, row) {
      this.$router.push({
        name: 'AdminAccountEditPage',
        params: {
          userType: 'admin',
          id: row.id
        }
      })
    },
    loadResults(use) {
      console.log('this is it')
      console.log(use)
      if (use.q) {
        this.name = use.name
        this.id = use.id
        this.privileges = use.privileges
        this.searchAccount()
      }
    }
  },
  created() {
    this.loadResults(this.$route.query)
  },
  watch: {
    $route(to/*, from*/) {
      this.loadResults(to.query)
    }
  }
}
</script>

<style scoped>

</style>
