<template>
  <div>
    <div class="text-h5 q-my-md">
      Create Student Account
    </div>
    <q-form
      class="row q-col-gutter-md"
      @submit="submit"
      @reset="reset"
    >
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
        label="Student ID"
        outlined
        :rules="[() => !!id || 'Please Enter an ID']"
      ></q-input>
      <q-select
        class="col-6"
        v-model="deptSelected"
        :options="deptOptions"
        label="Department"
        outlined
        :rules="[() => !!deptSelected || 'Please Assign a Department']"
        use-input
        @filter="deptFilter"
        @input="fetchTeachers(deptSelected.value)"
      ></q-select>
      <q-select
        class="col-6"
        v-model="hallSelected"
        :options="hallOptions"
        label="Hall"
        outlined
        :rules="[() => !!hallSelected || 'Please Assign a Hall']"
        use-input
        @filter="hallFilter"
      ></q-select>
      <q-select
        class="col-6"
        v-model="advisor"
        :options="teacherOptions"
        label="Advisor"
        outlined
        :rules="[() => !!advisor || 'Please Assign an Advisor']"
        use-input
        @filter="teacherFilter"
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
import apiFetch from 'src/utils/apiFetch'
import departments from 'src/mixins/departments'
import filter from 'src/mixins/filter'
import {isSubstring} from 'src/utils/patternSearch'

export default {
  name: 'StudentCreatorForm',
  data() {
    return {
      name: '',
      id: '',
      deptSelected: '',
      hallSelected: '',
      advisor: '',
      password: '',
      deptList: [],
      deptOptions: [],
      hallList: [],
      hallOptions: [],
      teacherList: [],
      teacherOptions: [],
      createLoading: false
    }
  },
  mixins: [
    departments,
    filter
  ],
  methods: {
    generator,
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
    fetchTeachers(dept) {
      apiFetch('account/teacher/list', {dept}, `teachers of ${dept}`)
        .then(response => {
          this.teacherList = response.data.map(x => {
            return {
              value: x.id,
              label: `(${x.id}) ${x.name}`
            }
        })
      })
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
    fetchAllLists() {
      this.fetchHalls()
    },
    submit() {
      this.createLoading = true
      this.$api.post('account/create', {
        userType: 'student',
        id: this.id,
        name: this.name,
        password: this.password,
        department: this.deptSelected.value,
        hall: this.hallSelected.value,
        advisor: this.advisor.value
      })
        .then(response => {
          this.createLoading = false
          console.log('Student account created')
          console.log(response)
        })
        .catch(error => {
          this.createLoading = false
          console.log('Could not create Student account')
          console.log(error.response)
        })
    },
    reset() {
      this.name = ''
      this.id = ''
      this.password = ''
      this.deptSelected = ''
      this.hallSelected = ''
      this.advisor = ''
    }
  },
  created() {
    this.fetchAllLists()
  }
}
</script>

<style scoped>

</style>
