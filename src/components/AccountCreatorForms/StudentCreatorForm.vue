<template>
  <div>
    <div class="text-h5 q-my-md">
      Create Student Account
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
        outlined
        :rules="[() => !!name || 'Please Enter a Name']"
      />
      <q-input
        class="col-6"
        v-model="id"
        label="Student ID"
        outlined
        :rules="[() => !!id || 'Please Enter an ID']"
      />
      <department-picker classes="col-6" v-model="department" required/>
      <hall-picker classes="col-6" v-model="hall" required/>
      <teacher-picker
        classes="col-6"
        label="Advisor"
        :department="department ? department.value : null"
        v-model="advisor"
        required
      />
      <password-maker-field classes="col-6" v-model="password"/>
      <div class="col-12">
        <q-btn type="submit" label="Create" color="primary" unelevated :loading="createLoading"/>
        <q-btn type="reset" label="Reset" color="primary" flat/>
      </div>
    </q-form>
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
  data() {
    return {
      name: '',
      id: '',
      department: null,
      hall: null,
      advisor: null,
      password: '',
      createLoading: false,
    }
  },
  methods: {
    createAccount() {
      this.createLoading = true
      this.$adminAPI.post('account/create', {
        userType: 'student',
        id: this.id,
        name: this.name,
        password: this.password,
        department: this.department.value,
        hall: this.hall.value,
        advisor: this.advisor.value
      })
        .then(response => {
          this.createLoading = false
          console.log('Student account created')
          console.log(response)
        })
        .catch(error => {
          this.createLoading = false
          console.log('Could not create Student account')
          console.log(error.response)
        })
    },
    resetForm() {
      this.name = ''
      this.id = ''
      this.password = ''
      this.department = null
      this.hall= null
      this.advisor = null
    },
  },
}
</script>

<style scoped>

</style>
