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
      <department-picker classes="col-6" label="Department" v-model="department" required/>
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
import creator from 'src/mixins/creator'
import {extract} from 'src/utils/apiDataPreProcessor'

export default {
  name: 'TeacherCreatorForm',
  components: {
    PasswordMakerField,
    DepartmentPicker
  },
  mixins: [
    creator
  ],
  data() {
    return {
      name: null,
      id: null,
      department: null,
      password: null,
    }
  },
  methods: {
    createAccount() {
      this.callCreateApi('/account/create', {
        userType: 'teacher',
        id: this.id,
        name: this.name,
        password: this.password,
        department: extract(this.department)
      }, 'Teacher account')
        .catch(() => {})
    },
    resetForm() {
      this.name = null
      this.id = null
      this.password = null
      this.department = null
    }
  }
}
</script>

<style scoped>

</style>
