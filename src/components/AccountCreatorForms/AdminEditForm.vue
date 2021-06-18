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
        :readonly="viewing"
        :rules="[() => !!name || 'Please Enter a Name']"
      />
      <q-input
        class="col-6"
        v-model="id"
        label="Admin Id"
        outlined
        readonly
        :rules="[() => !!id || 'Please Enter an ID']"
      />
      <password-maker-field v-if="!viewing" classes="col-6" v-model="password"/>
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
        <q-btn label="Update" type="submit" color="primary" unelevated :loading="editLoading"/>
        <q-btn label="Reset" type="reset" color="primary" flat/>
      </div>
    </q-form>
    <q-inner-loading :showing="oldDataLoading"/>
  </div>
</template>

<script>
import PasswordMakerField from 'components/FormElements/PasswordMakerField'
import PrivilegePicker from 'components/FormElements/PrivilegePicker';
import edit from 'src/mixins/edit'
import {extract} from 'src/utils/apiDataPreProcessor'

export default {
  name: 'AdminEditForm',
  components: {
    PrivilegePicker,
    PasswordMakerField
  },
  mixins: [
    edit
  ],
  data() {
    return {
      name: null,
      id: null,
      password: null,
      privileges: [],
    }
  },
  computed: {
    loadID() {
      return this.$route.params.id
    }
  },
  methods: {
    editAccount() {
      this.callEditApi('account/update/admin/' + this.loadID, {
        name: this.name,
        password: this.password,
        privileges: this.privileges ? extract(this.privileges) : []
      }, 'Admin account').catch(() => {})
    },
    resetForm() {
      this.loadOldDataIntoForm()
      this.password = null
    }
  },
  created() {
    this.fetchOldData('account/admin/list', {
      id: this.loadID
    }, 'Admin account')
  }
}
</script>

<style scoped>

</style>
