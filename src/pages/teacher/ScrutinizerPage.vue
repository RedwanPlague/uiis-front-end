<template>
  <q-page padding>
    <ScrutinizerTable v-for="course in courses" :key="course.courseName" v-bind="course"></ScrutinizerTable>
  </q-page>
</template>

<script>

export default {
  name: "ScrutinizerPage",
  components: {
    ScrutinizerTable: () => import('../../components/ScrutinizerTable.vue'),
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
            marks: 49,
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
            student_id: "1605023",
            marks: 13,
          },
          {
            student_id: "1605024",
            marks: 73,
          },
          {
            student_id: "1605014",
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
