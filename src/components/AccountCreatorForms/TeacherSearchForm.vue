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
        filled
        :rules="[() => !!columns || 'Dummy Text']"
      />
      <q-input
        class="col-6"
        v-model="id"
        label="Teacher ID"
        filled
        :rules="[() => !!columns || 'Dummy Text']"
      />
      <department-picker classes="col-6" v-model="department"/>
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
      name: '',
      id: '',
      department: null,
      columns
    }
  },
  methods: {
    searchAccount() {
      this.callSearchApi('/account/teacher/list', {
        name: this.name,
        id: this.id,
        department: this.department
      }, 'Teacher account')
    },
    resetForm() {
      this.name = ''
      this.id = ''
      this.department = null
    },
    onRowClick(event, row) {
      this.$router.push({
        name: 'AdminAccountEditPage',
        params: {
          userType: 'teacher',
          id: row.id
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
