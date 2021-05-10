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
        :rules="[() => !!name || 'Please Enter a Name']"
      ></q-input>
      <q-input
        class="col-6"
        v-model="id"
        label="Teacher ID"
        outlined
        :rules="[() => !!id || 'Please Enter an ID']"
      ></q-input>
      <q-select
        class="col-6"
        v-model="deptSelected"
        :options="deptOptions"
        label="Department"
        outlined
        :rules="[() => !!deptSelected || 'Please Enter a Department']"
        use-input
        @filter="deptFilter"
      ></q-select>
      <q-input
        class="col-6"
        v-model="password"
        label="Password"
        outlined
        :rules="[() => !!password || 'Please Enter a Password']"
      >
        <template v-slot:append>
          <q-btn label="generate" flat dense color="primary" @click="password = generator()"></q-btn>
        </template>
      </q-input>
      <div class="col-12">
        <q-btn type="submit" label="Create" color="primary" unelevated :loading="createLoading"></q-btn>
        <q-btn type="reset" label="Reset" color="primary" flat></q-btn>
      </div>
    </q-form>
  </div>
</template>

<script>
import generator from 'src/utils/passwordGenerator'
import departments from 'src/mixins/departments'

export default {
  name: 'TeacherCreatorForm',
  data() {
    return {
      name: '',
      id: '',
      deptSelected: '',
      password: '',
      deptOptions: [],
      createLoading: false
    }
  },
  mixins: [
    departments
  ],
  methods: {
    generator,
    submit() {
      this.createLoading = true
      this.$api.post('/account/create', {
        userType: 'teacher',
        id: this.id,
        name: this.name,
        password: this.password,
        department: this.deptSelected.value,
      })
        .then(response => {
          this.createLoading = false
          console.log('Teacher account created')
          console.log(response)
        })
        .catch(error => {
          this.createLoading = false
          console.log('Could not create Teacher account')
          console.log(error.response)
        })
    },
    reset() {
      this.name = ''
      this.id = ''
      this.password = ''
      this.deptSelected = ''
    }
  }
}
</script>

<style scoped>

</style>
