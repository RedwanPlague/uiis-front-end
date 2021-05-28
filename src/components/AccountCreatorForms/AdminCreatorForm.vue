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
import creator from 'src/mixins/creator'

export default {
  name: 'AdminCreatorForm',
  components: {
    PasswordMakerField,
    PrivilegePicker,
  },
  mixins: [
    creator
  ],
  data() {
    return {
      name: '',
      id: '',
      password: '',
      privileges: [],
    }
  },
  methods: {
    createAccount() {
      this.callCreateApi('account/create', {
        userType: 'admin',
        id: this.id,
        password: this.password,
        name: this.name,
        privileges: this.privileges
      }, 'Admin account')
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
