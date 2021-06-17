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
          headerClasses: 'bg-primary text-white'
        },
        {
          name: "courseTitle",
          label: "Course Title",
          field: "courseTitle",
          required: true,
          align: "left",
          sortable: true,
          headerClasses: 'bg-primary text-white'
        },
        {
          name: "part",
          label: "Part",
          field: "part",
          required: true,
          align: "left",
          headerClasses: 'bg-primary text-white'
        }
      ]
    };
  },

  async created() {
    this.$q.loading.show({
      delay: 100 // ms
    });
    await this.$store.dispatch("examiner/fillCourses");
    this.$q.loading.hide();
  },

  methods: {
    async onRowClick(evt, row) {

      this.$router.push({
        name: "examiner-evaluation-page",
        params: {
          courseID: row.courseID
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
