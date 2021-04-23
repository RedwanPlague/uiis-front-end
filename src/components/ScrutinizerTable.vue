<template>
  <div class="q-pa-sm">
    <h6>{{courseName}}</h6>

    <div class="q-pa-md">
      <q-table
        style="textAlign: left"
        :data="marks"
        row-key="student_id"
        separator="cell"
      >
      </q-table>
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
