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
      'loadDepartments'
    ]),
    fetchDepartments() {
      this.loadDepartments().then(() => {
        this.mainList = this.deptList
        this.fixValue()
      })
    },
  },
  created() {
    this.fetchDepartments()
  }
}
</script>

<style scoped>

</style>
