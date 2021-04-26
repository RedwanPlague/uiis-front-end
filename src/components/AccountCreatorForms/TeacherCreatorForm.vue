<template>
  <div>
    <div class="text-h5 q-my-md">
      Create Teacher Account
    </div>
    <q-form class="row q-col-gutter-md">
      <q-input
        class="col-6"
        v-model="name"
        label="Name"
        outlined
      ></q-input>
      <q-input
        class="col-6"
        v-model="id"
        label="Teacher ID"
        outlined
      ></q-input>
      <q-select
        class="col-6"
        v-model="dept"
        :options="departments"
        label="Department"
        outlined
      ></q-select>
      <q-input
        class="col-6"
        v-model="password"
        label="Password"
        outlined
      >
        <template v-slot:append>
          <q-btn label="generate" flat dense color="primary" @click="password = generator()"></q-btn>
        </template>
      </q-input>
      <div class="col-12">
        <q-btn label="Create" color="primary" unelevated></q-btn>
        <q-btn label="Reset" color="primary" flat></q-btn>
      </div>
    </q-form></div>
</template>

<script>
import generator from 'src/utils/passwordGenerator'

export default {
  name: 'TeacherCreatorForm',
  data() {
    return {
      name: '',
      id: '',
      dept: '',
      password: '',
      departments: [],
    }
  },
  methods: {
    generator
  }
}
</script>

<style scoped>

</style>
