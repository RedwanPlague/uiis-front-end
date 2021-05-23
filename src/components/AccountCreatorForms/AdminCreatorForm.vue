<template>
  <div>
    <div class="text-h5 q-my-md">
      Create Admin Account
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
        label="Admin Id"
        outlined
        :rules="[() => !!id || 'Please Enter an ID']"
      />
      <password-maker-field classes="col-6" v-model="password"/>
      <div class="col-6"></div>
      <privilege-picker
        classes="col-12"
        v-model="privileges"
        label="Privileges"
        multiple
        required
      />
      <div class="col-12">
        <q-btn label="Create" type="submit" color="primary" unelevated :loading="createLoading"/>
        <q-btn label="Reset" type="reset" color="primary" flat/>
      </div>
    </q-form>
  </div>
</template>

<script>
import PasswordMakerField from 'components/FormElements/PasswordMakerField'
import PrivilegePicker from 'components/FormElements/PrivilegePicker'

export default {
  name: 'AdminCreatorForm',
  components: {
    PasswordMakerField,
    PrivilegePicker,
  },
  data() {
    return {
      name: '',
      id: '',
      password: '',
      privileges: [],
      createLoading: false
    }
  },
  methods: {
    createAccount() {
      this.createLoading = true
      this.$adminAPI.post('account/create', {
        userType: 'admin',
        id: this.id,
        password: this.password,
        name: this.name,
        privileges: this.privileges
      })
        .then(response => {
          this.createLoading = false
          this.$q.notify({
            message: 'Admin account created successfully',
            type: 'positive'
          })
          console.log('Admin account created')
          console.log(response)
        })
        .catch(error => {
          this.createLoading = false
          this.$q.notify({
            message: 'Could not create Admin account',
            type: 'negative'
          })
          console.log('Could not create Admin account')
          console.log(error.response)
        })
    },
    resetForm() {
      this.name = ''
      this.id = ''
      this.password = ''
      this.privileges = []
    }
  },
}
</script>

<style scoped>

</style>
