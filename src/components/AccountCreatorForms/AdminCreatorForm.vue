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
        outlined></q-input>
      <q-input
        class="col-6"
        v-model="id"
        label="Admin Id"
        outlined></q-input>
      <q-input
        class="col-6"
        v-model="password"
        label="Password"
        outlined>
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
        <q-btn label="Create" color="primary" unelevated @click="createAccount"></q-btn>
        <q-btn label="Reset" color="primary" flat @click="resetForm"></q-btn>
        <q-btn label="Haha" color="primary" flat @click="use"></q-btn>
      </div>
    </q-form></div>
</template>

<script>
import generator from 'src/utils/passwordGenerator'
import apiFetch from 'src/utils/fetcher'

let privilegeList = []

export default {
  name: 'AdminCreatorForm',
  data() {
    return {
      name: '',
      id: '',
      password: '',
      privilegeSelected: [],
      privilegeOptions: []
    }
  },
  methods: {
    generator,
    fetchPrivilegeList() {
      apiFetch('/privileges', null, 'List of ALL privileges')
        .then(response => {
          privilegeList = response.data
        })
        .catch()
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
      this.$api.post('/create-account', {
        userType: 'admin',
        userID: this.id,
        password: this.password,
        name: this.name,
        privileges: this.privilegeSelected
      })
        .then(response => {
          console.log('Account created')
          console.log(response)
        })
        .catch(error => {
          console.log('Could not create account')
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
