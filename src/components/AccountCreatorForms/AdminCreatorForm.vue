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
import {extract} from 'src/utils/apiDataPreProcessor'

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
      name: null,
      id: null,
      password: null,
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
        privileges: extract(this.privileges)
      }, 'Admin account')
        .catch(() => {})
    },
    resetForm() {
      this.name = null
      this.id = null
      this.password = null
      this.privileges = []
    }
  },
}
</script>

<style scoped>

</style>
