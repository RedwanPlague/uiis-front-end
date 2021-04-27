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
    axios.get("http://localhost:3000/courses").then(cutu=> {
      this.courses = cutu.data;
    });
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
