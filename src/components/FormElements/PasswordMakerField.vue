<template>
  <q-input
    :class="classes"
    :value="value"
    @input="$emit('input', $event)"
    :label="label"
    outlined
    :rules="[() => !required || !!value || `Please Enter a ${label}`]"
  >
    <template v-slot:append>
      <q-btn
        label="generate"
        flat dense
        color="primary"
        @click="$emit('input', passwordGenerator())"
      ></q-btn>
    </template>
  </q-input>
</template>

<script>
import passwordGenerator from 'src/utils/passwordGenerator'

export default {
  name: 'PasswordMakerAndPicker',
  props: {
    label: {
      type: String,
      default: 'Password'
    },
    value: {
      type: String,
      default: ''
    },
    classes: {
      type: [Object, String],
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    passwordGenerator
  }
}
</script>

<style scoped>

</style>
