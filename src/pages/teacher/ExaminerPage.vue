<template>
  <q-page padding>
    <div class="column items-center">
      <h6>Current Session: {{ currentSession }}</h6>
      <div>
        <span>Select course: </span>
        <select v-model="currentCourse">
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
      </div>

      <ExaminerTable v-if="currentCourse" :key="currentCourse" />
    </div>
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
    return {};
  },

  async created() {
    // API call
    /*axios.get("http://localhost:3000/courses").then(cutu=> {
      this.courses = cutu.data;
    });*/

    await this.$store.dispatch("examiner/fillCourses");
  },

  methods: {},

  computed: {
    ...mapGetters("examiner", ["allCourses", "currentSession"]),

    currentCourse: {
      get() {
        return this.$store.getters["examiner/currentCourse"];
      },

      set(newCurCourse) {
        this.$store.commit("examiner/mutCurCourse", newCurCourse);
      }
    }
  }
};
</script>

<style></style>
