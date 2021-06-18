<template>
  <q-page padding>
    <div class="text-h5 q-my-md">
      Assign Dues
    </div>
    <q-form class="row q-col-gutter-md" @submit="assignDues" @reset="resetForm">
      <q-input
        class="col-6"
        v-model="syllabusID"
        label="Syllabus ID"
        outlined
        :rules="[() => !!syllabusID || 'Please Enter Syllabus ID']"
      />
      <q-input
        class="col-6"
        v-model="courseID"
        label="Course ID"
        outlined
        :rules="[() => !!courseID || 'Please Enter Course ID']"
      />
      <div class="col-12">
        <q-btn label="Create" type="submit" color="primary" unelevated :loading="createLoading"/>
        <q-btn label="Reset" type="reset" color="primary" flat/>
      </div>
    </q-form>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
}
</script>
