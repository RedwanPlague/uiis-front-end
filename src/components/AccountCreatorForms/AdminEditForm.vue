<template>
  <div>
    <div class="text-h5 q-my-md">
      {{submitLabel}} Admin Account
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
        label="Admin Id"
        :filled="!openFields"
        :outlined="openFields"
        :rules="[() => !openFields || !!id || 'Please Enter an ID']"
      />
      <password-maker-field v-if="openFields" classes="col-6" v-model="password"/>
      <div v-if="openFields" class="col-6"></div>
      <q-select
        class="col-12"
        v-model="privilegesSelected"
        :options="privilegeOptions"
        label="Privileges"
        :filled="!openFields"
        :outlined="openFields"
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
        <q-btn :label="submitLabel" type="submit" color="primary" unelevated :loading="createLoading"/>
        <q-btn label="Reset" type="reset" color="primary" flat/>
      </div>
    </q-form>
  </div>
</template>

<script>
import apiFetch from 'src/utils/apiFetch'
import {isSubstring} from 'src/utils/patternSearch'
import PasswordMakerField from 'components/FormElements/PasswordMakerField'

export default {
  name: 'AdminCreatorForm',
  components: {
    PasswordMakerField
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
      password: '',
      privilegesSelected: [],
      privilegeOptions: [],
      privilegeList: [],
      createLoading: false
    }
  },
  methods: {
    fetchPrivilegeList() {
      apiFetch('/account/privileges', null, 'List of ALL privileges')
        .then(response => {
          this.privilegeList = response.data
        })
    },
    privilegeFilter(value, update) {
      if (value === '') {
        update(() => {
          this.privilegeOptions = this.privilegeList
        })
        return
      }
      update(() => {
        this.privilegeOptions = this.privilegeList.filter(x => isSubstring(x, value))
      })
    },
    createAccount() {
      this.createLoading = true
      this.$adminAPI.post('account/create', {
        userType: 'admin',
        id: this.id,
        password: this.password,
        name: this.name,
        privileges: this.privilegesSelected
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
      this.privilegesSelected = []
    }
  },
  created() {
    this.fetchPrivilegeList()
  }
}
</script>

<style scoped>

</style>
