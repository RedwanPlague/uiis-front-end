<template>
  <div class="q-pa-sm">
    <div class="q-pa-md column items-center">
      <h6>{{courseName}}</h6>
      <q-table
        style="textAlign: left"
        :data="marks"
        row-key="student_id"
        separator="cell"
      >
      </q-table>
    </div>
    <div class="row q-pa-md justify-center">
      <q-btn no-caps color="primary" label="Forward to Department head" class="" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExaminerTable',
  props: {
    courseName: {
      type: String,
      required: true,
    },

    marks: {
      type: Array,
      required: true
    },
  },

  data() {
    return {
      
    }
  }
}
</script>

<style scoped>
.q-table {
 text-align: left;   
}
</style>
