<template>
  <q-page class="container">
    <div class="column items-center">
      <h6>Current Session: {{ currentSession }}</h6>
      <!-- <div> -->
      <!-- <span>Select course: </span>
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
      </div> -->

      <q-table
        class="table"
        title="Current Courses"
        :data="allCourses"
        :columns="columns"
        row-key="courseID"
        separator="cell"
        @row-click="onRowClick"
      />

      <!-- <ExaminerTable v-if="currentCourse" :key="currentCourse" /> -->
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
    await this.$store.dispatch("examiner/fillCourses");
  },

  methods: {
    async onRowClick(evt, row) {
      this.$store.commit("examiner/mutCurCourse", row.courseID);

      await this.$store.dispatch("examiner/fillCurrentCourse");

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
