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
            Attendance: 9,
            ct_1: 18,
            ct_2: 19,
            "term_final_part_1 (teacher_1)": 104,
            "term_final_part_2 (teacher_2)": 103,
          },
          {
            student_id: "1605003",
            Attendance: 9,
            ct_1: 18,
            ct_2: 19,
            "term_final_part_1 (teacher_1)": 104,
            "term_final_part_2 (teacher_2)": 103,
          },
          {
            student_id: "1605004",
            Attendance: 9,
            ct_1: 18,
            ct_2: 19,
            "term_final_part_1 (teacher_1)": 104,
            "term_final_part_2 (teacher_2)": 103,
          },
        ],
      },
      {
        courseName: "CSE313",
        marks: [
          {
            student_id: "1605002",
            Attendance: 9,
            ct_1: 18,
            ct_2: 19,
            "term_final_part_1 (teacher_1)": 104,
            "term_final_part_2 (teacher_2)": 103,
          },
          {
            student_id: "1605023",
            Attendance: 9,
            ct_1: 18,
            ct_2: 19,
            "term_final_part_1 (teacher_1)": 104,
            "term_final_part_2 (teacher_2)": 103,
          },
          {
            student_id: "1605024",
            Attendance: 9,
            ct_1: 18,
            ct_2: 19,
            "term_final_part_1 (teacher_1)": 104,
            "term_final_part_2 (teacher_2)": 103,
          },
          {
            student_id: "1605014",
            Attendance: 9,
            ct_1: 18,
            ct_2: 19,
            "term_final_part_1 (teacher_1)": 104,
            "term_final_part_2 (teacher_2)": 103,
          },
        ],
      },
    ]
  }
};
</script>

<style>

</style>
