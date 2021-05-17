<template>
  <q-page padding>
    <ExaminerTable v-for="course in courses" :key="course.courseName" v-bind="course" @upload="upload"></ExaminerTable>
  </q-page>
</template>

<script>
import axios from 'axios';
import CourseEvaluationPageVue from './CourseEvaluationPage.vue';

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
    /*axios.get("http://localhost:3000/courses").then(cutu=> {
      this.courses = cutu.data;
    });*/

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
  },

  methods: {
    upload(course) {
      // API call
      console.log(course);
    }
  }
};
</script>

<style>

</style>
