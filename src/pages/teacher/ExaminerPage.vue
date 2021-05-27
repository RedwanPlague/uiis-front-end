<template>
  <q-page padding>
    <h6>Current Sessoin: {{ currentSession }}</h6>
    <span>Select course: </span>
    <select @change="mutCurCourse">
      <option disabled value="">Please select one</option>
      <option
        v-for="course in allCourses"
        :value="course.courseID"
        :key="course.courseID + course.part"
      >
        {{
          course.courseID +
            " - " +
            course.courseTitle +
            " - Part " +
            course.part
        }}
      </option>
    </select>
    
    <ExaminerTable v-if="currentCourseName" :key="currentCourseName" />
  </q-page>
</template>

<script>
import axios from "axios";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "ExaminerPage",
  components: {
    ExaminerTable: () => import('../../components/ExaminerTable.vue'),
  },
  data() {
    return {
      emni: null,
      currentSession: null
    };
  },

  created() {
    // API call
    /*axios.get("http://localhost:3000/courses").then(cutu=> {
      this.courses = cutu.data;
    });*/

    this.currentSession = "2021";
  },

  methods: {
    upload(course) {
      // API call
      console.log(course);
    },

    mutCurCourse(e) {
      this.$store.commit("examiner/mutCurCourse", e.target.value);
    }
  },

  computed: {
    ...mapGetters("examiner", ["allCourses", "currentCourseName"])
  }
};
</script>

<style></style>
