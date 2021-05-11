<template>
  <q-page padding>
    <q-tabs
      v-model="tab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab name="student" label="Student"/>
      <q-tab name="teacher" label="Teacher"/>
      <q-tab name="admin" label="Admin"/>
    </q-tabs>

    <q-separator/>

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="student" class="q-pa-none">
        <student-creator-form/>
      </q-tab-panel>
      <q-tab-panel name="teacher" class="q-pa-none">
        <teacher-creator-form/>
      </q-tab-panel>
      <q-tab-panel name="admin" class="q-pa-none">
        <admin-creator-form/>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script>
import StudentCreatorForm from "components/AccountCreatorForms/StudentCreatorForm";
import TeacherCreatorForm from "components/AccountCreatorForms/TeacherCreatorForm";
import AdminCreatorForm from "components/AccountCreatorForms/AdminCreatorForm";

export default {
  name: 'AccountCreation',
  components: {
    StudentCreatorForm,
    TeacherCreatorForm,
    AdminCreatorForm
  },
  data() {
    return {
      tab: 'student',
    }
  },
}
</script>
