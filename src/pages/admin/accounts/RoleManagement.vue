<template>
  <q-page padding>
    <div class="text-h5 q-my-md">
      Manage Roles
    </div>
    <div class="row q-col-gutter-md q-pb-sm">
      <role-picker
        classes="col-6"
        v-model="roleToEdit"
        label="Role"
        required
        :allow-add-new="userHasPrivilege(PRIVILEGES.ROLE_UPDATE)"
        @input="resetForm"
      />
    </div>
    <q-form
      class="row q-col-gutter-sm"
      @submit="updateRole" @reset="resetForm"
      v-if="roleToEdit"
    >
      <privilege-picker
        classes="col-12"
        v-model="privileges"
        label="Privileges"
        multiple
      />
      <div class="col-12">
        <q-btn label="Update" type="submit" color="primary" unelevated/>
        <q-btn label="Reset" type="reset" color="primary" flat/>
      </div>
    </q-form>
    <q-inner-loading :showing="roleListLoading"/>
  </q-page>
</template>

<script>
import RolePicker from 'components/FormElements/RolePicker'
import PrivilegePicker from 'components/FormElements/PrivilegePicker'
import edit from 'src/mixins/edit'
import {mapGetters} from 'vuex'
import {extract} from 'src/utils/apiDataPreProcessor'
import {PRIVILEGES} from 'src/utils/constants'

export default {
  name: 'RoleManagement',
  components: {
    PrivilegePicker,
    RolePicker
  },
  mixins: [
    edit
  ],
  data() {
    return {
      roleToEdit: null,
      privileges: [],
      PRIVILEGES
    }
  },
  computed: {
    ...mapGetters([
      'userHasPrivilege'
    ]),
    ...mapGetters('admin', [
      'roleList',
      'roleListLoading'
    ])
  },
  methods: {
    use(data) {
      this.roleToEdit = data
    },
    updateRole() {
      this.callEditApi('/role/update/' + this.roleToEdit.value, {
        privileges: extract(this.privileges)
      }, `Role '${this.roleToEdit.value}'`)
    },
    resetForm() {
      const role = this.roleList.find(x => x._id === this.roleToEdit.value)
      this.privileges = role ? role.privileges : null
    }
  }
}
</script>
