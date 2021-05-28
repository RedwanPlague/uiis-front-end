<template>
  <q-page padding>
    <!--<q-tabs-->
    <!--  v-model="tab"-->
    <!--  dense-->
    <!--  class="text-grey"-->
    <!--  active-color="primary"-->
    <!--  indicator-color="primary"-->
    <!--  align="justify"-->
    <!--  narrow-indicator-->
    <!--&gt;-->
    <!--  <q-tab name="student" label="Student"/>-->
    <!--  <q-tab name="teacher" label="Teacher"/>-->
    <!--  <q-tab name="admin" label="Admin"/>-->
    <!--</q-tabs>-->

    <!--<q-separator/>-->

    <!--<q-tab-panels v-model="tab" animated>-->
    <!--  <q-tab-panel name="student" class="q-pa-none">-->
    <!--    <student-edit-form/>-->
    <!--  </q-tab-panel>-->
    <!--  <q-tab-panel name="teacher" class="q-pa-none">-->
    <!--    <teacher-edit-form/>-->
    <!--  </q-tab-panel>-->
    <!--  <q-tab-panel name="admin" class="q-pa-none">-->
    <!--    <admin-edit-form/>-->
    <!--  </q-tab-panel>-->
    <!--</q-tab-panels>-->
    <student-edit-form v-if="userType==='student'"/>
    <teacher-edit-form v-else-if="userType==='teacher'"/>
    <admin-edit-form v-else-if="userType==='admin'"/>
  </q-page>
</template>

<script>
import StudentEditForm from 'components/AccountCreatorForms/StudentEditForm'
import TeacherEditForm from 'components/AccountCreatorForms/TeacherEditForm'
import AdminEditForm from 'components/AccountCreatorForms/AdminEditForm'

export default {
  name: 'AccountEdit',
  components: {
    StudentEditForm,
    TeacherEditForm,
    AdminEditForm
  },
  data() {
    return {
    }
  },
  computed: {
    userType() {
      return this.$route.params.userType
    }
  }
}
</script>
