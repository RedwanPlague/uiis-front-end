<template>
  <q-page padding>
    <div class="text-h5 q-my-md">
      User Roles
    </div>
    <div class="row q-col-gutter-md">
      <course-picker
        classes="col-6"
        v-model="courseToEdit"
        label="Course to Edit"
        required
        @input="loadCourseSessionData"
      />
      <session-field
        classes="col-5"
        v-model="sessionToEdit"
        label="Session"
        required
        readonly
      />
      <div class="col-1" v-if="courseToEdit">
        <q-btn icon="refresh" size="lg" dense flat @click="loadCourseSessionData"/>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
}
</script>
