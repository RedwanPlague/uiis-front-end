<template>
  <div>
    <div class="text-h5 q-my-md">
      Create Student Account
    </div>
    <q-form
      class="row q-col-gutter-md"
      @submit="submit"
      @reset="reset"
    >
      <q-input
        class="col-6"
        v-model="name"
        label="Name"
        outlined
        :rules="[() => !!name || 'Please Enter a Name']"
      ></q-input>
      <q-input
        class="col-6"
        v-model="id"
        label="Student ID"
        outlined
        :rules="[() => !!id || 'Please Enter an ID']"
      ></q-input>
      <department-picker classes="col-6" v-model="department"></department-picker>
      <hall-picker classes="col-6" v-model="hall"></hall-picker>
      <teacher-picker
        classes="col-6"
        label="Advisor"
        :department="department ? department.value : null"
        v-model="advisor"
        required
      ></teacher-picker>
      <password-maker-and-picker classes="col-6" v-model="password"></password-maker-and-picker>
      <div class="col-12">
        <q-btn type="submit" label="Create" color="primary" unelevated :loading="createLoading"></q-btn>
        <q-btn type="reset" label="Reset" color="primary" flat></q-btn>
      </div>
    </q-form>
  </div>
</template>

<script>
import generator from 'src/utils/passwordGenerator'
import DepartmentPicker from 'components/FormElements/DepartmentPicker'
import PasswordMakerAndPicker from 'components/FormElements/PasswordMakerAndPicker'
import TeacherPicker from 'components/FormElements/TeacherPicker'
import HallPicker from 'components/FormElements/HallPicker'

export default {
  name: 'StudentCreatorForm',
  components: {
    HallPicker,
    TeacherPicker,
    PasswordMakerAndPicker,
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
      createLoading: false
    }
  },
  methods: {
    generator,
    submit() {
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
    reset() {
      this.name = ''
      this.id = ''
      this.password = ''
      this.department = null
      this.hall= null
      this.advisor = null
    }
  }
}
</script>

<style scoped>

</style>
