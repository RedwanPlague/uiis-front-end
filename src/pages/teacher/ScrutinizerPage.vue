<template>
  <q-page padding>
    <h6>Current Session: {{ currentSession }}</h6>
    <span>Select course: </span>
    <select v-model="currentCourse">
      <option disabled value="">Please select one</option>
      <option
        v-for="course in allCourses"
        :value="course.courseID"
        :key="course.courseID"
      >
        {{
          course.courseID +
            " - " +
            course.courseTitle
        }}
      </option>
    </select>

    <ScrutinizerTable v-if="currentCourse" :key="currentCourse" />
  </q-page>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';

export default {

  name: "ScrutinizerPage",
  components: {
    ScrutinizerTable: () => import('../../components/ScrutinizerTable.vue'),
  },
  data() {
    return {
      
    };
  },

  methods: {
    ...mapActions("scrutinizer", ["fillCourses", "fillSingleCourse"]),

  },

  computed: {
    ...mapGetters("scrutinizer", ["currentSession", "allCourses"]),

    currentCourse: {
      get() {
        return this.$store.getters["scrutinizer/currentCourse"];
      },

      set(curCourse) {
        this.$store.commit("scrutinizer/mutCurCourse", curCourse);
      }
    }
  },

  watch: {
    async currentCourse(newVal, oldVal) {
      //await this.fillSingleCourse();
      //console.log("hemlo");
    },
  },

  created() {
    // API call

    this.$store.dispatch("scrutinizer/fillCourses");
  },
};
</script>

<style>

</style>
