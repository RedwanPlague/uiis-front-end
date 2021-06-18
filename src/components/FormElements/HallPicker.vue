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
  name: 'HallPicker',
  mixins: [
    picker
  ],
  computed: {
    ...mapGetters('admin', [
      'hallList'
    ])
  },
  methods: {
    ...mapActions('admin', [
      'loadHalls'
    ]),
    fetchHalls() {
      this.loadHalls().then(() => {
        this.mainList = this.hallList
        this.fixValue()
      })
    },
  },
  created() {
    this.fetchHalls()
  }
}
</script>

<style scoped>

</style>
