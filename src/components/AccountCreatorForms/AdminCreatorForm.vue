<template>
  <div>
    <div class="text-h5 q-my-md">
      Create Admin Account
    </div>
    <q-form class="row q-col-gutter-md">
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
        label="Admin Id"
        outlined
        :rules="[() => !!id || 'Please Enter an ID']"
      ></q-input>
      <q-input
        class="col-6"
        v-model="password"
        label="Password"
        outlined
        :rules="[() => !!password || 'Please Enter a Password']"
      >
        <template v-slot:append>
          <q-btn label="generate" flat dense color="primary" @click="password = generator()"></q-btn>
        </template>
      </q-input>
      <div class="col-6"></div>
      <q-select
        class="col-12"
        v-model="privilegeSelected"
        :options="privilegeOptions"
        label="Privileges"
        outlined
        use-chips
        multiple
        clearable
        use-input
        input-debounce="0"
        @filter="privilegeFilter"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              No results
            </q-item-section>
          </q-item>
        </template>
      </q-select>
      <div class="col-12">
        <q-btn label="Create" color="primary" unelevated @click="createAccount" :loading="createLoading"></q-btn>
        <q-btn label="Reset" color="primary" flat @click="resetForm"></q-btn>
      </div>
    </q-form>
  </div>
</template>

<script>
import generator from 'src/utils/passwordGenerator'
import apiFetch from 'src/utils/apiFetch'

let privilegeList = []

export default {
  name: 'AdminCreatorForm',
  data() {
    return {
      name: '',
      id: '',
      password: '',
      privilegeSelected: [],
      privilegeOptions: [],
      createLoading: false
    }
  },
  methods: {
    generator,
    fetchPrivilegeList() {
      apiFetch('/privileges', null, 'List of ALL privileges')
        .then(response => {
          privilegeList = response.data
        })
    },
    privilegeFilter(value, update) {
      if (value === '') {
        update(() => {
          this.privilegeOptions = privilegeList
        })
        return
      }
      update(() => {
        const substring = value.toLowerCase()
        this.privilegeOptions = privilegeList.filter(x => x.toLowerCase().indexOf(substring) > -1)
      })
    },
    createAccount() {
      this.createLoading = true
      this.$api.post('/create-account', {
        userType: 'admin',
        userID: this.id,
        password: this.password,
        name: this.name,
        privileges: this.privilegeSelected
      })
        .then(response => {
          this.createLoading = false
          console.log('Admin account created')
          console.log(response)
        })
        .catch(error => {
          this.createLoading = false
          console.log('Could not create Admin account')
          console.log(error.response)
        })
    },
    resetForm() {
      this.name = ''
      this.id = ''
      this.password = ''
      this.privilegeSelected = []
    }
  },
  created() {
    this.fetchPrivilegeList()
  }
}
</script>

<style scoped>

</style>
