<template>
  <q-page padding>
    <div class="text-h5 q-mb-md">
      Departments
    </div>
    <q-form
      v-if="!dataLoading"
      @submit="updateDepartments"
      @reset="resetForm"
    >
      <div v-for="(dept, idx) in departments" :key="idx" class="row q-col-gutter-md q-mb-sm">
        <q-input
          class="col-2"
          v-model="dept.id"
          label="Department ID"
          outlined
          :readonly="dept.old"
          :rules="[() => !!dept.id || 'Please Enter Department ID']"
        />
        <q-input
          class="col-5"
          v-model="dept.name"
          label="Name"
          :rules="[() => !!dept.name || 'Please Enter Name']"
          outlined
          :readonly="dept.viewing"
        />
        <teacher-picker
          classes="col-4"
          v-model="dept.head"
          label="Head"
          :readonly="dept.viewing"
          :required="dept.old"
        />
        <div class="col-1">
          <q-btn
            v-if="dept.old"
            :icon="dept.viewing ? 'edit' : 'visibility'"
            :color="dept.viewing ? 'primary' : 'black'"
            @click="dept.viewing = !dept.viewing"
            flat dense
          />
          <q-btn
            v-else
            icon="delete" color="primary" flat dense
            @click="localRemoveDepartment(idx)"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-3"></div>
        <q-btn
          class="col-6" color="primary"
          outline icon="add" :ripple="false"
          @click="localAddDepartment"
        />
      </div>
      <div class="col-12 q-mt-lg">
        <q-btn label="Update" type="submit" color="primary" unelevated/>
        <q-btn label="Reset" type="reset" color="primary" flat/>
      </div>
    </q-form>
    <q-inner-loading :showing="dataLoading"/>
  </q-page>
</template>

<script>
import {apiFetch} from 'src/utils/apiWrappers'
import TeacherPicker from 'components/FormElements/TeacherPicker'
import creator from 'src/mixins/creator'
import edit from 'src/mixins/edit'
import {extract} from 'src/utils/apiDataPreProcessor'

export default {
  name: 'DeptManagement',
  components: {TeacherPicker},
  mixins: [
    creator,
    edit
  ],
  data() {
    return {
      departments: [],
      deptList: [],
      dataLoading: false,
    }
  },
  methods: {
    fetchDepartments() {
      this.dataLoading = true
      apiFetch('/department/list', null, 'Departments')
        .then(response => {
          this.dataLoading = false
          this.deptList = response.data
          this.resetForm()
        })
        .catch(() => {
          this.dataLoading = false
        })
    },
    localAddDepartment() {
      this.departments.push({
        id: null,
        name: null,
        head: null,
        viewing: false,
        old: false
      })
    },
    localRemoveDepartment(idx) {
      this.departments.splice(idx, 1)
    },
    updateDepartments() {
      this.departments.forEach((dept, idx) => {
        if (dept.old) {
          const prev = this.deptList[idx]
          if (
            prev.name !== dept.name ||
            !dept.head ||
            prev.head !== dept.head.value
          ) {
            this.editDepartment(dept)
            this.fetchDepartments()
          }
        } else {
          this.createDepartment(dept)
          this.fetchDepartments()
        }
      })
    },
    createDepartment(dept) {
      this.callCreateApi('/department/create', {
        id: dept.id,
        name: dept.name,
        head: extract(dept.head)
      }, `${dept.id} department`)
    },
    editDepartment(dept) {
      this.callEditApi('/department/update/' + dept.id, {
        name: dept.name,
        head: extract(dept.head)
      }, `${dept.id} department`)
    },
    resetForm() {
      this.departments = this.deptList.map(x => {
        return {
          ...x,
          viewing: true,
          old: true
        }
      })
    },
  },
  created() {
    this.fetchDepartments()
  }
}
</script>
