<template>
  <div>
    <div class="text-h5 q-my-md">
      Search Student Account
    </div>
    <q-form
      class="row q-col-gutter-md"
      @submit="createAccount"
      @reset="resetForm"
    >
      <q-input
        class="col-6"
        v-model="name"
        label="Name"
        filled
        :rules="[() => !!name || 'Please Enter a Name']"
      />
      <q-input
        class="col-6"
        v-model="id"
        label="Student ID"
        filled
        :rules="[() => !!id || 'Please Enter an ID']"
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
        row-key="name"
        @row-click="$router.push({name: 'AdminAccountEditPage'})"
      />
    </div>
    <q-inner-loading :showing="dataLoading"/>
  </div>
</template>

<script>
import DepartmentPicker from 'components/FormElements/DepartmentPicker'
import TeacherPicker from 'components/FormElements/TeacherPicker'
import HallPicker from 'components/FormElements/HallPicker'

const commonAttr = {
  style: 'font-size: 1.05em', headerStyle: 'font-size: 1.05em'
}
const columns = [
  {name: 'id', label: 'Student ID', field: 'id', style: 'width: 10%', sortable: true},
  {name: 'name', label: 'Name', field: 'name', align: 'left', style: 'width: 60%', sortable: true},
  {name: 'dept', label: 'Department', field: 'dept', align: 'left'},
  {name: 'lt', label: 'Level/Term', field: 'lt', align: 'left'},
]

export default {
  name: 'StudentCreatorForm',
  components: {
    HallPicker,
    TeacherPicker,
    DepartmentPicker
  },
  data() {
    return {
      name: '',
      id: '',
      department: null,
      hall: null,
      advisor: null,
      password: '',
      dataLoading: false,
      showResults: false,
      tableData: [],
      columns
    }
  },
  methods: {
    createAccount() {
      // this.createLoading = true
      // this.$adminAPI.post('account/create', {
      //   userType: 'student',
      //   id: this.id,
      //   name: this.name,
      //   password: this.password,
      //   department: this.department.value,
      //   hall: this.hall.value,
      //   advisor: this.advisor.value
      // })
      //   .then(response => {
      //     this.createLoading = false
      //     console.log('Student account created')
      //     console.log(response)
      //   })
      //   .catch(error => {
      //     this.createLoading = false
      //     console.log('Could not create Student account')
      //     console.log(error.response)
      //   })
      this.createLoading = true
      setTimeout(() => {
        this.createLoading = false
        this.viewing = true
        if (this.openFields) {
          this.$q.notify({
            message: `Account of ${this.name} Edited Successfully`,
            color: 'positive',
            position: 'bottom-right',
            icon: 'check',
          })
        }
        else {
          this.showResults = !this.showResults
        }
      }, 1000)
    },
    resetForm() {
      this.name = ''
      this.id = ''
      this.password = ''
      this.department = null
      this.hall= null
      this.advisor = null
    },
    preset() {
      this.viewing = true
      this.dataLoading = true
      setTimeout(() => {
        this.dataLoading = false
        this.name = 'Md. Ashraful Islam'
        this.id = '1605001'
        this.department = {value: 'CSE', label: 'CSE'}
        this.hall = {value: 'AULA', label: '(AULA) AHSAN ULLAH HALL'}
        this.advisor = {value: 't3', label: 'Navid Bin Hasan'}
      }, 1000)
    }
  },
  created() {
    if (this.$route.name === 'AdminAccountEditPage') {
      this.preset()
    }
  },
  watch: {
    $route(to /*, from*/) {
      if (to.name === 'AdminAccountEditPage') {
        this.preset()
      }
      else {
        this.viewing = false
        this.resetForm()
      }
    }
  }
}
</script>

<style scoped>

</style>
