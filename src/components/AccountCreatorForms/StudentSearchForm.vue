<template>
  <div>
    <div class="text-h5 q-my-md">
      {{submitLabel}} Student Account
      <q-btn
        v-if="$route.name === 'AdminAccountEditPage'"
        :icon="viewing ? 'edit' : 'visibility'"
        :color="viewing ? 'primary' : 'black'" flat dense
        @click="viewing = !viewing"
      ></q-btn>
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
        :filled="!openFields"
        :outlined="openFields"
        :readonly="viewing"
        :rules="[() => !openFields || !!name || 'Please Enter a Name']"
      />
      <q-input
        class="col-6"
        v-model="id"
        label="Student ID"
        :filled="!openFields"
        :outlined="openFields"
        :readonly="viewing"
        :rules="[() => !openFields || !!id || 'Please Enter an ID']"
      />
      <department-picker classes="col-6" v-model="department" :required="openFields" :readonly="viewing"/>
      <hall-picker classes="col-6" v-model="hall" :required="openFields" :readonly="viewing"/>
      <teacher-picker
        classes="col-6"
        label="Advisor"
        :department="department ? department.value : null"
        v-model="advisor"
        :required="openFields"
        :readonly="viewing"
      />
      <password-maker-field v-if="openFields && !viewing" classes="col-6" v-model="password"/>
      <div class="col-12" v-if="!viewing">
        <q-btn type="submit" :label="submitLabel" color="primary" unelevated :loading="createLoading"/>
        <q-btn type="reset" label="Reset" color="primary" flat/>
      </div>
    </q-form>
    <div v-if="showResults && !openFields" class="q-mt-lg">
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
import PasswordMakerField from 'components/FormElements/PasswordMakerField'
import TeacherPicker from 'components/FormElements/TeacherPicker'
import HallPicker from 'components/FormElements/HallPicker'

export default {
  name: 'StudentCreatorForm',
  components: {
    HallPicker,
    TeacherPicker,
    PasswordMakerField,
    DepartmentPicker
  },
  computed: {
    submitLabel() {
      const route = this.$route.name
      if (route === 'AdminAccountCreationPage') {
        return 'Create'
      }
      else if (route === 'AdminAccountSearchPage') {
        return 'Search'
      }
      else if (route === 'AdminAccountEditPage') {
        return this.viewing ? 'View' : 'Edit'
      }
      return 'Label Error'
    },
    openFields() {
      const route = this.$route.name
      return (route === 'AdminAccountCreationPage') || (route === 'AdminAccountEditPage')
    }
  },
  data() {
    return {
      name: '',
      id: '',
      department: null,
      hall: null,
      advisor: null,
      password: '',
      createLoading: false,
      dataLoading: false,
      showResults: false,
      viewing: false,
      tableData: [
        {id: 1605001, name: 'Md. Ashraful Islam', dept: 'CSE', lt: 'L4-T1'},
        {id: 1605002, name: 'Zawad Abdullah', dept: 'CSE', lt: 'L4-T1'},
        {id: 1605003, name: 'Bishwajit Bhattacharjee', dept: 'CSE', lt: 'L4-T1'},
        {id: 1605005, name: 'Navid Bin Hasan', dept: 'CSE', lt: 'L4-T1'},
        {id: 1605006, name: 'Avijit Biswas', dept: 'CSE', lt: 'L4-T1'},
        {id: 1605007, name: 'Shahrar Swapnil', dept: 'CSE', lt: 'L4-T1'},
        {id: 1605008, name: 'Fardin Zaman', dept: 'CSE', lt: 'L4-T1'},
        {id: 1605009, name: 'Hasibul Hussain Hisham', dept: 'CSE', lt: 'L4-T1'},
        {id: 1605010, name: 'Rakibul Hasan Sarker', dept: 'CSE', lt: 'L4-T1'},
        {id: 1605011, name: 'Mir Mahathir Mohammad', dept: 'CSE', lt: 'L4-T1'},
        {id: 1605014, name: 'Sudipa Saha', dept: 'CSE', lt: 'L4-T1'},
      ],
      columns: [
        {name: 'id', label: 'Student ID', field: 'id', style: 'width: 10%; font-size: 1.05em', sortable: true, headerStyle: 'font-size: 1.05em'},
        {name: 'name', label: 'Name', field: 'name', align: 'left', style: 'width: 60%; font-size: 1.05em', sortable: true, headerStyle: 'font-size: 1.05em'},
        {name: 'dept', label: 'Department', field: 'dept', align: 'left', style: 'font-size: 1.05em', headerStyle: 'font-size: 1.05em'},
        {name: 'lt', label: 'Level/Term', field: 'lt', align: 'left', style: 'font-size: 1.05em', headerStyle: 'font-size: 1.05em'},
      ]
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
