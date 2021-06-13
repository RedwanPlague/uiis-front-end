<template>
  <q-select
    :class="classes"
    :value="value"
    @input="$emit('input', $event)"
    :options="options"
    :label="label"
    outlined
    :readonly="readonly"
    :rules="[() => !required || !!value || `Please Select ${label}`]"
    :use-chips="multiple"
    :multiple="multiple"
    :clearable="multiple"
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
  name: 'TeacherPicker',
  mixins: [
    picker
  ],
  props: {
    department: {
      type: String,
      default: null
    },
    preList: {
      type: Array,
      default: null
    }
  },
  computed: {
    ...mapGetters('admin', [
      'teacherList'
    ])
  },
  methods: {
    ...mapActions('admin', [
      'loadTeachers'
    ]),
    fetchTeachers(dept) {
      if (this.preList) {
        this.mainList = this.preList
      }
      else {
        this.loadTeachers(dept).then(() => {
          this.mainList = this.teacherList
          this.fixValue()
        })
      }
    },
  },
  created() {
    this.fetchTeachers(this.department)
  },
  watch: {
    department: {
      handler(newVal/*, oldVal*/) {
        this.fetchTeachers(newVal)
      }
    }
  }
}
</script>

<style scoped>

</style>
