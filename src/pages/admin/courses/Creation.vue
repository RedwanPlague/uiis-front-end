<template>
  <q-page padding>
    <div class="text-h5 q-my-md">
      Create New Course
    </div>
    <q-form class="row q-col-gutter-md">
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
      <q-input
        class="col-6"
        v-model="title"
        label="Title"
        outlined
        :rules="[() => !!title || 'Please Enter a Title']"
      ></q-input>
      <q-input
        class="col-6"
        v-model="name"
        label="Name"
        outlined
        :rules="[() => !!name || 'Please Enter a Name']"
      ></q-input>
    </q-form>
  </q-page>
</template>

<script>
import departments from 'src/mixins/departments'

export default {
  name: 'CourseCreation',
  data() {
    return {
      title: '',
      name: '',
    }
  },
  mixins: [
    departments
  ]
}
</script>
