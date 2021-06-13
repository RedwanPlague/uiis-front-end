<template>
  <div>
    <div class="text-h5 q-my-md">
      {{label}} Student Account
      <q-btn
        :icon="viewing ? 'edit' : 'visibility'"
        :color="viewing ? 'primary' : 'black'"
        @click="viewing = !viewing"
        flat dense
      />
    </div>
    <q-form
      class="row q-col-gutter-md"
      @submit="editAccount"
      @reset="resetForm"
    >
      <q-input
        class="col-6"
        v-model="name"
        label="Name"
        outlined
        :readonly="viewing"
        :rules="[() => !!name || 'Please Enter a Name']"
      />
      <q-input
        class="col-6"
        v-model="id"
        label="Student ID"
        outlined
        readonly
        :rules="[() => !!id || 'Please Enter an ID']"
      />
      <department-picker classes="col-6" label="Department" v-model="department" required :readonly="viewing"/>
      <hall-picker classes="col-6" v-model="hall" required :readonly="viewing"/>
      <teacher-picker
        classes="col-6"
        label="Advisor"
        :department="department ? department.value : null"
        v-model="advisor"
        required
        :readonly="viewing"
      />
      <password-maker-field v-if="!viewing" classes="col-6" v-model="password"/>
      <div class="col-12" v-if="!viewing">
        <q-btn type="submit" label="Edit" color="primary" unelevated :loading="editLoading"/>
        <q-btn type="reset" label="Reset" color="primary" flat/>
      </div>
    </q-form>
    <q-inner-loading :showing="oldDataLoading"/>
  </div>
</template>

<script>
import DepartmentPicker from 'components/FormElements/DepartmentPicker'
import PasswordMakerField from 'components/FormElements/PasswordMakerField'
import TeacherPicker from 'components/FormElements/TeacherPicker'
import HallPicker from 'components/FormElements/HallPicker'
import edit from 'src/mixins/edit'
import {extract} from 'src/utils/apiDataPreProcessor'

export default {
  name: 'StudentCreatorForm',
  components: {
    HallPicker,
    TeacherPicker,
    PasswordMakerField,
    DepartmentPicker
  },
  mixins: [
    edit
  ],
  data() {
    return {
      name: null,
      id: null,
      department: null,
      hall: null,
      advisor: null,
      password: null,
    }
  },
  computed: {
    loadID() {
      return this.$route.params.id
    }
  },
  methods: {
    editAccount() {
      this.callEditApi('account/update/student/' + this.loadID, {
        name: this.name,
        password: this.password,
        department: extract(this.department),
        hall: extract(this.hall),
        advisor: extract(this.advisor)
      }, 'Student Account')
        .catch(() => {})
    },
    resetForm() {
      this.loadOldDataIntoForm()
    },
  },
  created() {
    this.fetchOldData('/account/student/list', {
      id: this.loadID
    }, 'Student Account')
  }
}
</script>

<style scoped>

</style>
