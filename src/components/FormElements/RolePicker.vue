<template>
  <q-select
    :class="classes"
    :value="value"
    @input="$emit('input', $event)"
    @input-value="newRole = $event"
    :options="options"
    :label="label"
    :readonly="readonly"
    outlined
    :use-chips="multiple"
    :multiple="multiple"
    :clearable="multiple"
    use-input
    input-debounce="0"
    @filter="optionFilter"
    :rules="[() => !required || multiple || !!value || `Please Select ${label}`]"
  >
    <template v-slot:append v-if="notDuplicate">
      <q-btn icon="add" flat color="primary" @click="addNewRole"/>
    </template>
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey">
          No results
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script>
import picker from 'src/mixins/picker'
import creator from 'src/mixins/creator'
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'RolePicker',
  mixins: [
    picker,
    creator
  ],
  data() {
    return {
      newRole: null,
    }
  },
  props: {
    allowAddNew: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters('admin', [
      'roleList'
    ]),
    notDuplicate() {
      return this.newRole && !this.mainList.find(x => x.value === this.newRole)
    },
  },
  methods: {
    ...mapActions('admin', [
      'fetchRoleList'
    ]),
    loadRoles() {
      this.fetchRoleList().then(() => {
        this.mainList = this.roleList.map(x => {
          return {
            value: x._id,
            label: x._id
          }
        })
        this.fixValue()
      })
    },
    addNewRole() {
      this.callCreateApi('/role/create', {
        role: this.newRole,
        privileges: []
      }, 'Role')
        .then(() => {
          this.fetchRoleList().catch(() => {})
          const newRoleElement = {
            value: this.newRole,
            label: this.newRole
          }
          this.mainList.push(newRoleElement)
          this.$emit('input', newRoleElement)
        })
    }
  },
  created() {
    this.loadRoles()
  },
  watch: {
    roleList() {
      this.loadRoles()
    }
  }
}
</script>

<style scoped>

</style>
