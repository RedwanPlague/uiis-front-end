<template>
  <div>
    <div class="text-h5 q-my-md">
      Search Teacher Account
    </div>
    <q-form class="row q-col-gutter-md" @submit="searchAccount" @reset="resetForm">
      <q-input
        class="col-6"
        v-model="name"
        label="Name"
        outlined
        :rules="[() => !!columns || 'Dummy Text']"
      />
      <q-input
        class="col-6"
        v-model="id"
        label="Teacher ID"
        outlined
        :rules="[() => !!columns || 'Dummy Text']"
      />
      <department-picker classes="col-6" label="Department" v-model="department"/>
      <div class="col-12">
        <q-btn type="submit" label="Search" color="primary" unelevated/>
        <q-btn type="reset" label="Reset" color="primary" flat/>
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
import DepartmentPicker from 'components/FormElements/DepartmentPicker'
import columnMerger from 'src/utils/columnMerger'
import search from 'src/mixins/search'
import {extract} from 'src/utils/apiDataPreProcessor'

const columns = [
  {name: 'id', label: 'Student ID', field: 'id', style: 'width: 10%', sortable: true},
  {name: 'name', label: 'Name', field: 'name', align: 'left', sortable: true},
  {name: 'department', label: 'Department', field: 'department', align: 'center'},
]
const commonAttr = {
  style: 'font-size: 1.05em', headerStyle: 'font-size: 1.05em'
}
columnMerger(columns, commonAttr)

export default {
  name: 'TeacherCreatorForm',
  components: {
    DepartmentPicker
  },
  mixins: [
    search
  ],
  data() {
    return {
      name: null,
      id: null,
      department: null,
      columns
    }
  },
  methods: {
    searchAccount() {
      this.callSearchApi('/account/teacher/list', {
        name: this.name,
        id: this.id,
        department: extract(this.department)
      }, 'Teacher account')
      // this.$router.push({
      //   name: 'AdminAccountSearchPage',
      //   query: {
      //     type: 'teacher',
      //     name: this.name,
      //     id: this.id,
      //     department: extract(this.department)
      //   }
      // }).catch(() => {})
    },
    resetForm(query) {
      if (!query) query = {}
      this.name = query.name
      this.id = query.id
      this.department = query.department
    },
    onRowClick(event, row) {
      const routeData = this.$router.resolve({
        name: 'AdminAccountEditPage',
        params: {
          userType: 'teacher',
          id: row.id
        }
      })
      window.open(routeData.href, '_blank')
    },
    loadResults(query) {
      if (query.type === 'teacher') {
        this.resetForm(query)
        this.callSearchApi('/account/teacher/list', {
          name: query.name,
          id: query.id,
          department: query.department
        }, 'Teacher account')
      }
    }
  },
  // created() {
  //   this.loadResults(this.$route.query)
  // },
  // watch: {
  //   $route(to/*, from*/) {
  //     this.loadResults(to.query)
  //   }
  // }
}
</script>

<style scoped>

</style>
