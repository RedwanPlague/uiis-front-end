<template>
  <div>
    <div class="text-h5 q-my-md">
      Create Teacher Account
    </div>
    <q-form class="row q-col-gutter-md" @submit="createAccount" @reset="resetForm">
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
        label="Teacher ID"
        outlined
        :rules="[() => !!id || 'Please Enter an ID']"
      />
      <department-picker classes="col-6" v-model="department"/>
      <password-maker-and-picker classes="col-6" v-model="password"/>
      <div class="col-12">
        <q-btn type="submit" label="Create" color="primary" unelevated :loading="createLoading"/>
        <q-btn type="reset" label="Reset" color="primary" flat/>
      </div>
    </q-form>
  </div>
</template>

<script>
import DepartmentPicker from 'components/FormElements/DepartmentPicker'
import PasswordMakerAndPicker from 'components/FormElements/PasswordMakerAndPicker'

export default {
  name: 'TeacherCreatorForm',
  components: {
    PasswordMakerAndPicker,
    DepartmentPicker
  },
  data() {
    return {
      name: '',
      id: '',
      department: null,
      password: '',
      createLoading: false
    }
  },
  methods: {
    createAccount() {
      this.createLoading = true
      this.$adminAPI.post('/account/create', {
        userType: 'teacher',
        id: this.id,
        name: this.name,
        password: this.password,
        department: this.department.value
      })
        .then(response => {
          this.createLoading = false
          console.log('Teacher account created')
          console.log(response)
        })
        .catch(error => {
          this.createLoading = false
          console.log('Could not create Teacher account')
          console.log(error.response)
        })
    },
    resetForm() {
      this.name = ''
      this.id = ''
      this.password = ''
      this.department = null
    }
  }
}
</script>

<style scoped>

</style>
