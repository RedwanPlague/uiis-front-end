<template>
  <q-select
    :class="classes"
    :value="value"
    @input="$emit('input', $event)"
    :options="hallOptions"
    :label="label"
    outlined
    :rules="[() => !!value || `Please Assign a ${label}`]"
    use-input
    @filter="hallFilter"
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
import apiFetch from 'src/utils/apiFetch'
import {isSubstring} from 'src/utils/patternSearch'

export default {
  name: 'HallPicker',
  props: {
    label: {
      type: String,
      default: 'Hall'
    },
    value: {
      type: Object,
      default: null
    },
    classes: {
      type: [Object, String]
    }
  },
  data() {
    return {
      hallList: [],
      hallOptions: [],
    }
  },
  methods: {
    fetchHalls() {
      apiFetch('/hall/list', null, 'All hall list')
        .then(response => {
          this.hallList = response.data.map(x => {
            return {
              value: x.id,
              label: `(${x.id}) ${x.name}`
            }
          })
        })
    },
    hallFilter(value, update) {
      if (value === '') {
        update(() => {
          this.hallOptions = this.hallList
        })
        return
      }
      update(() => {
        this.hallOptions = this.hallList.filter(x => isSubstring(x.label, value))
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
