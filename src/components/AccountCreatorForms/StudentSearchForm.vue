<template>
  <div>
    <div class="text-h5 q-my-md">
      Search Student Account
    </div>
    <q-form
      class="row q-col-gutter-md"
      @submit="searchAccount"
      @reset="resetForm($route.query)"
    >
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
        label="Student ID"
        outlined
        :rules="[() => !!columns || 'Dummy Text']"
      />
      <department-picker classes="col-6" v-model="department"/>
      <hall-picker classes="col-6" v-model="hall"/>
      <teacher-picker
        classes="col-6"
        label="Advisor"
        :department="department ? department.value : null"
        v-model="advisor"
      />
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
import TeacherPicker from 'components/FormElements/TeacherPicker'
import HallPicker from 'components/FormElements/HallPicker'
import columnMerger from 'src/utils/columnMerger'
import search from 'src/mixins/search'
import {extract} from 'src/utils/apiDataPreProcessor'

const format = (val, row) => {
  return row.level + '-' + row.term
}

const columns = [
  {name: 'id', label: 'Student ID', field: 'id', style: 'width: 10%', sortable: true},
  {name: 'name', label: 'Name', field: 'name', align: 'left', style: 'width: 60%'},
  {name: 'department', label: 'Department', field: 'department', align: 'center'},
  {name: 'lt', label: 'Level/Term', field: 'lt', align: 'center', sortable: true, format},
]
const commonAttr = {
  style: 'font-size: 1.05em', headerStyle: 'font-size: 1.05em'
}
columnMerger(columns, commonAttr)

export default {
  name: 'StudentCreatorForm',
  components: {
    HallPicker,
    TeacherPicker,
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
      hall: null,
      advisor: null,
      columns
    }
  },
  methods: {
    searchAccount() {
      this.callSearchApi('/account/student/list', {
        name: this.name,
        id: this.id,
        department: extract(this.department),
        hall: extract(this.hall),
        advisor: extract(this.advisor)
      }, 'Student account')
      // this.$router.push({
      //   name: 'AdminAccountSearchPage',
      //   query: {
      //     type: 'student',
      //     name: this.name,
      //     id: this.id,
      //     department: extract(this.department),
      //     hall: extract(this.hall),
      //     advisor: extract(this.advisor)
      //   }
      // }).catch(() => {})
    },
    resetForm(query) {
      if (!query) query = {}
      this.name = query.name
      this.id = query.id
      this.department = query.department
      this.hall= query.hall
      this.advisor = query.advisor
    },
    onRowClick(event, row) {
      const routeData = this.$router.resolve({
        name: 'AdminAccountEditPage',
        params: {
          userType: 'student',
          id: row.id
        }
      })
      window.open(routeData.href, '_blank')
    },
    loadResults(query) {
      if (query.type === 'student') {
        this.resetForm(query)
        this.callSearchApi('/account/student/list', {
          name: query.name,
          id: query.id,
          department: query.department,
          hall: query.hall,
          advisor: query.advisor
        }, 'Student account')
      }
    },
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
