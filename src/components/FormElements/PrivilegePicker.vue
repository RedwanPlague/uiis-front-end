<template>
  <q-select
    :class="classes"
    :value="value"
    @input="$emit('input', $event)"
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
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'PrivilegePicker',
  mixins: [
    picker
  ],
  computed: {
    ...mapGetters('admin', [
      'privilegeList'
    ]),
  },
  methods: {
    ...mapActions('admin', [
      'fetchPrivilegeList'
    ]),
    loadPrivileges() {
      this.fetchPrivilegeList().then(() => {
        this.mainList = Object.values(this.privilegeList).map(x => {
          return {
            value: x,
            label: x
          }
        })
      })
      this.fixValue()
    },
  },
  created() {
    this.loadPrivileges()
  },
  watch: {
    privilegeList() {
      this.loadPrivileges()
    }
  }
}
</script>

<style scoped>

</style>
