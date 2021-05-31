<template>
  <q-select
    :class="classes"
    :value="value"
    @input="$emit('input', $event)"
    :options="teacherOptions"
    :label="label"
    outlined
    :readonly="readonly"
    :rules="[() => !required || !!value || `Please Assign ${label}`]"
    :use-chips="multiple"
    :multiple="multiple"
    :clearable="multiple"
    use-input
    @filter="teacherFilter"
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
import {isSubstring} from 'src/utils/patternSearch'
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'TeacherPicker',
  props: {
    label: {
      type: String,
      default: 'Teacher'
    },
    value: {
      type: [Object, Array, String],
      default: null
    },
    department: {
      type: String,
      default: null
    },
    classes: {
      type: [Object, String]
    },
    multiple: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      teacherOptions: [],
    }
  },
  computed: {
    ...mapGetters([
      'teacherList'
    ])
  },
  methods: {
    ...mapActions([
      'loadTeachers'
    ]),
    fixValue(value) {
      if (this.teacherList.length === 0) return
      if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          const cur = this.teacherList.filter(x => value.includes(x.value))
          this.$emit('input', cur)
        }
      }
      else if (typeof value === 'string') {
        const cur = this.teacherList.filter(x => x.value === value)[0]
        this.$emit('input', cur)
      }
    },
    fetchTeachers(dept) {
      this.loadTeachers(dept).then(() => this.fixValue(this.value))
    },
    teacherFilter(value, update) {
      if (value === '') {
        update(() => {
          this.teacherOptions = this.teacherList
        })
        return
      }
      update(() => {
        this.teacherOptions = this.teacherList.filter(x => isSubstring(x.label, value))
      })
    },
  },
  created() {
    this.fetchTeachers(this.department)
  },
  watch: {
    value: {
      handler(newVal/*, oldVal*/) {
        this.fixValue(newVal)
      }
    },
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
