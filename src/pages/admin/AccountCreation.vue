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

    <q-tab-panels v-model="tab" animated keep-alive>
      <q-tab-panel name="student">
        <student-creator-form/>
      </q-tab-panel>
      <q-tab-panel name="teacher">
        <teacher-creator-form/>
      </q-tab-panel>
      <q-tab-panel name="admin">
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
  name: 'CoursePage',
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
