<template>
  <q-page padding>
    <h6>Current Session: {{ currentSession }}</h6>
    <span>Select course: </span>
    <select v-model="currentCourseName">
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
import { api } from "boot/axios";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "ExaminerPage",
  components: {
    ExaminerTable: () => import("../../components/ExaminerTable.vue")
  },
  data() {
    return {
      currentSession: null,
    };
  },

  async created() {
    // API call
    /*axios.get("http://localhost:3000/courses").then(cutu=> {
      this.courses = cutu.data;
    });*/

    this.currentSession = "2021";
    
    await this.$store.dispatch("examiner/fillCourses");
  },

  methods: {
    upload(course) {
      // API call
      console.log(course);
    },
  },

  computed: {

    ...mapGetters("examiner", ["allCourses"], ),

    currentCourseName: {
      get() {
        return this.$store.getters["examiner/currentCourseName"];
      },

      set(newCurCourse) {
        this.$store.commit("examiner/mutCurCourse", newCurCourse);
      }
    }
  }
};
</script>

<style></style>
