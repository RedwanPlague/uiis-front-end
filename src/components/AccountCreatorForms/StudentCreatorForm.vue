<template>
  <div>
    <div class="text-h5 q-my-md">
      Create Student Account
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
        value=""
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
        <q-btn label="Create" color="primary" unelevated></q-btn>
        <q-btn label="Reset" color="primary" flat></q-btn>
      </div>
    </q-form>
  </div>
</template>

<script>
import generator from 'src/utils/passwordGenerator'

let deptList = []
let hallList = []
let teacherList = []

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
      deptOptions: [],
      hallOptions: [],
      teacherOptions: []
    }
  },
  methods: {
    generator,
    loadDepartments() {
      deptList = [
        'CSE', 'EEE', 'ME', 'CE', 'WRE'
      ]
    },
    deptFilter(value, update) {
      if (value === '') {
        update(() => {
          this.deptOptions = deptList
        })
        return
      }
      update(() => {
        const substring = value.toLowerCase()
        this.deptOptions = deptList.filter(x => x.toLowerCase().indexOf(substring) > -1)
      })
    },
    loadHalls() {
      hallList = [
        'Ahsanulla', 'Sohrawardy', 'Titumir', 'Rashid'
      ]
    },
    hallFilter(value, update) {
      if (value === '') {
        update(() => {
          this.hallOptions = hallList
        })
        return
      }
      update(() => {
        const substring = value.toLowerCase()
        this.hallOptions = hallList.filter(x => x.toLowerCase().indexOf(substring) > -1)
      })
    },
    loadTeachers() {
      teacherList = [
        {id: '1', name: 'ami'},
        {id: '2', name: 'tumi'},
        {id: '3', name: 'amra'},
      ].map(x => {
        return {
          value: x.id,
          label: `(${x.id}) ${x.name}`
        }
      })
    },
    teacherFilter(value, update) {
      if (value === '') {
        update(() => {
          this.teacherOptions = teacherList
        })
        return
      }
      update(() => {
        const substring = value.toLowerCase()
        this.teacherOptions = teacherList.filter(x => x.label.toLowerCase().indexOf(substring) > -1)
      })
    },
    loadAllLists() {
      this.loadDepartments()
      this.loadHalls()
      this.loadTeachers()
    },
  },
  created() {
    this.loadAllLists()
  }
}
</script>

<style scoped>

</style>
