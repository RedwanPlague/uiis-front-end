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
        <student-search-form/>
      </q-tab-panel>
      <q-tab-panel name="teacher" class="q-pa-none">
        <teacher-search-form/>
      </q-tab-panel>
      <q-tab-panel name="admin" class="q-pa-none">
        <admin-search-form/>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script>
import StudentSearchForm from 'components/AccountCreatorForms/StudentSearchForm'
import TeacherSearchForm from 'components/AccountCreatorForms/TeacherSearchForm'
import AdminSearchForm from 'components/AccountCreatorForms/AdminSearchForm'

export default {
  name: 'AccountSearch',
  title: 'Search for Accounts',
  components: {
    StudentSearchForm,
    TeacherSearchForm,
    AdminSearchForm
  },
  data() {
    return {
      tab: 'student',
    }
  },
  methods: {
    setTab(type) {
      if (type) {
        this.tab = type
      }
    }
  },
  created() {
    this.setTab(this.$route.query.type)
  },
  watch: {
    $route(to/*, from*/) {
      this.setTab(to.query.type)
    }
  }
}
</script>
