<template>
  <q-page class="container">
    <div class="column items-center">
      <h5>Current Session: {{ currentSession }}</h5>

      <q-table
        class="table"
        title="Current Courses"
        :data="allCourses"
        :columns="columns"
        row-key="courseID"
        separator="cell"
        @row-click="onRowClick"
        table-header-class="bg-primary text-white"
      />
    </div>
  </q-page>
</template>

<script>
import { api } from "boot/axios";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "ExaminerPage",
  components: {
    // ExaminerTable: () => import("../../components/ExaminerTable.vue")
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
        },
        {
          name: "courseTitle",
          label: "Course Title",
          field: "courseTitle",
          required: true,
          align: "left",
          sortable: true,
        },
        {
          name: "part",
          label: "Part",
          field: "part",
          required: true,
          align: "left",
        }
      ]
    };
  },

  async created() {
    this.$q.loading.show({
      delay: 100 // ms
    });
    await this.$store.dispatch("examiner/fillCurrentSession");
    await this.$store.dispatch("examiner/fillCourses");
    this.$q.loading.hide();
  },

  methods: {
    async onRowClick(evt, row) {

      this.$router.push({
        name: "examiner-evaluation-page",
        params: {
          courseID: row.courseID,
          part: row.part,
        }
      });
    }
  },

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
