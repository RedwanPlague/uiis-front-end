<template>
  <q-page padding>
    <ExaminerTable v-for="course in courses" :key="course.courseName" v-bind="course"></ExaminerTable>
  </q-page>
</template>

<script>

export default {
  name: "ExaminerPage",
  components: {
    ExaminerTable: () => import('../../components/ExaminerTable.vue'),
  },
  data() {
    return {
      courses: null
    };
  },

  created() {
    // API call

    this.courses = [
      {
        courseName: "CSE311",
        marks: [
          {
            student_id: "1605002",
            marks: 34,
          },
          {
            student_id: "1605003",
            marks: 31,
          },
          {
            student_id: "1605004",
            marks: 37,
          },
        ],
      },
      {
        courseName: "CSE313",
        marks: [
          {
            student_id: "1605002",
            marks: 43,
          },
          {
            student_id: "1605003",
            marks: 13,
          },
          {
            student_id: "1605004",
            marks: 73,
          },
        ],
      },
    ]
  }
};
</script>

<style>

</style>
