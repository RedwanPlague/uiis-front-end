<template>
  <q-select
    :class="classes"
    :value="value"
    @input="$emit('input', $event)"
    :options="options"
    :label="label"
    outlined
    :readonly="readonly"
    :rules="[() => !required || !!value || `Please Select a ${label}`]"
    use-input
    @filter="optionFilter"
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
  name: 'DepartmentPicker',
  mixins: [
    picker
  ],
  computed: {
    ...mapGetters('admin', [
      'deptList'
    ])
  },
  methods: {
    ...mapActions('admin', [
      'fetchDeptList'
    ]),
    loadDepartments() {
      this.fetchDeptList().then(() => {
        this.mainList = this.deptList.map(x => {
          return {
            value: x.id,
            label: `${x.id} - ${x.name}`
          }
        })
        this.fixValue()
      })
    },
  },
  created() {
    this.loadDepartments()
  },
  watch: {
    deptList() {
      this.loadDepartments()
    }
  }
}
</script>

<style scoped>

</style>
