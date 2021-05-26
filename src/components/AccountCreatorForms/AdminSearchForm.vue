<template>
  <div>
    <div class="text-h5 q-my-md">
      Search Admin Account
    </div>
    <q-form class="row q-col-gutter-md" @submit="searchAccount" @reset="resetForm">
      <q-input
        class="col-6"
        v-model="name"
        label="Name"
        filled
        :rules="[() => !!name || 'Please Enter a Name']"
      />
      <q-input
        class="col-6"
        v-model="id"
        label="Admin Id"
        filled
        :rules="[() => !!id || 'Please Enter an ID']"
      />
      <privilege-picker
        classes="col-12"
        v-model="privileges"
        label="Privileges"
        multiple
      />
      <div class="col-12">
        <q-btn label="Search" type="submit" color="primary" unelevated :loading="searchLoading"/>
        <q-btn label="Reset" type="reset" color="primary" flat/>
      </div>
    </q-form>
  </div>
</template>

<script>
import PrivilegePicker from "components/FormElements/PrivilegePicker";

export default {
  name: 'AdminCreatorForm',
  components: {
    PrivilegePicker,
  },
  data() {
    return {
      name: '',
      id: '',
      password: '',
      privileges: [],
      searchLoading: false
    }
  },
  methods: {
    searchAccount() {
      this.searchLoading = true
      this.$adminAPI.post('account/create', {
        userType: 'admin',
        id: this.id,
        password: this.password,
        name: this.name,
        privileges: this.privileges
      })
        .then(response => {
          this.searchLoading = false
          console.log('Admin account created')
          console.log(response)
        })
        .catch(error => {
          this.searchLoading = false
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
