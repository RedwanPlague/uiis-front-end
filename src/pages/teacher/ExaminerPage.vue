<template>
  <q-page padding>
    <ExaminerTable v-for="course in courses" :key="course.courseName" v-bind="course"></ExaminerTable>
  </q-page>
</template>

<script>
import axios from 'axios';

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
  }
};
</script>

<style>

</style>
