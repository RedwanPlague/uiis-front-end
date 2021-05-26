<template>
  <div>
    <div class="text-h5 q-my-md">
      {{label}} Admin Account
      <q-btn
        :icon="viewing ? 'edit' : 'visibility'"
        :color="viewing ? 'primary' : 'black'"
        @click="viewing = !viewing"
        flat dense
      />
    </div>
    <q-form class="row q-col-gutter-md" @submit="editAccount" @reset="resetForm">
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
      <password-maker-field v-if="viewing" classes="col-6" v-model="password"/>
      <div v-if="viewing" class="col-6"></div>
      <privilege-picker
        classes="col-12"
        v-model="privileges"
        label="Privileges"
        multiple
        :readonly="viewing"
        required
      />
      <div class="col-12" v-if="!viewing">
        <q-btn label="Edit" type="submit" color="primary" unelevated :loading="editLoading"/>
        <q-btn label="Reset" type="reset" color="primary" flat/>
      </div>
    </q-form>
  </div>
</template>

<script>
import PasswordMakerField from 'components/FormElements/PasswordMakerField'
import PrivilegePicker from "components/FormElements/PrivilegePicker";

export default {
  name: 'AdminCreatorForm',
  components: {
    PrivilegePicker,
    PasswordMakerField
  },
  data() {
    return {
      viewing: true,
      name: '',
      id: '',
      password: '',
      privileges: [],
      editLoading: false
    }
  },
  computed: {
    label() {
      return this.viewing ? 'View' : 'Edit'
    }
  },
  methods: {
    editAccount() {
      this.editLoading = true
      this.$adminAPI.post('account/create', {
        userType: 'admin',
        id: this.id,
        password: this.password,
        name: this.name,
        privileges: this.privileges
      })
        .then(response => {
          this.editLoading = false
          console.log('Admin account created')
          console.log(response)
        })
        .catch(error => {
          this.editLoading = false
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
