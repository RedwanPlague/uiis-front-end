<template>
  <q-page class="container">
    <div class="column items-center">
      <h6>Current Session: {{ currentSession }}</h6>

      <q-table
        class="table"
        title="Current Courses"
        :data="allCourses"
        :columns="columns"
        row-key="courseID"
        separator="cell"
        @row-click="onRowClick"
      />

      <!-- <ScrutinizerTable v-if="currentCourse" :key="currentCourse" /> -->
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ScrutinizerPage",
  components: {
    // ScrutinizerTable: () => import("../../components/ScrutinizerTable.vue")
  },
  data() {
    return {
      columns: [
        {
          name: "courseID",
          label: "CourseID",
          field: "courseID",
          required: true,
          align: "left",
          sortable: true,
          headerClasses: "bg-primary text-white"
        },
        {
          name: "courseTitle",
          label: "Course Title",
          field: "courseTitle",
          required: true,
          align: "left",
          sortable: true,
          headerClasses: "bg-primary text-white"
        }
      ]
    };
  },

  methods: {
    ...mapActions("scrutinizer", ["fillCourses", "fillSingleCourse"]),

    async onRowClick(evt, row) {
      // this.$store.commit("scrutinizer/mutCurCourse", row.courseID);

      // this.$q.loading.show({
      //   delay: 100 // ms
      // });
      // this.$q.loading.hide();

      // await this.$store.dispatch("scrutinizer/fillSingleCourse");

      // this.$q.loading.hide();

      this.$router.push({
        name: "scrutinizer-course-page",
        params: {
          courseID: row.courseID
        }
      });
    }
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
    }
  },

  async created() {
    // API call

    this.$q.loading.show({
      delay: 100 // ms
    });

    await this.$store.dispatch("scrutinizer/fillCourses");
    this.$q.loading.hide();
  }
};
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.table {
  width: 800px;
  margin-top: 30px;
}
</style>
