<template>
  <div>
    <div class="text-h5 q-my-md">
      {{submitLabel}} Teacher Account
    </div>
    <q-form class="row q-col-gutter-md" @submit="createAccount" @reset="resetForm">
      <q-input
        class="col-6"
        v-model="name"
        label="Name"
        :filled="!openFields"
        :outlined="openFields"
        :rules="[() => !openFields || !!name || 'Please Enter a Name']"
      />
      <q-input
        class="col-6"
        v-model="id"
        label="Teacher ID"
        :filled="!openFields"
        :outlined="openFields"
        :rules="[() => !openFields || !!id || 'Please Enter an ID']"
      />
      <department-picker classes="col-6" v-model="department" :required="openFields"/>
      <password-maker-and-picker v-if="openFields" classes="col-6" v-model="password"/>
      <div class="col-12">
        <q-btn type="submit" :label="submitLabel" color="primary" unelevated :loading="createLoading"/>
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
        return 'Edit'
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
