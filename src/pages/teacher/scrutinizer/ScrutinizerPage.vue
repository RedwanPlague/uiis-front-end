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
  name: "ScrutinizerPage", // To change
  components: {
    // ScrutinizerTable: () => import("../../components/ScrutinizerTable.vue")
  },
  props: {
    ke: {
      type: String,
      required: true
    }
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
    ...mapActions("scrutinizer", ["fillCourses", "fillSingleCourse"]), // To change

    async onRowClick(evt, row) {
      this.$router.push({
        name: `${this.ke}-course-page`,
        params: {
          courseID: row.courseID
        },
        props: {
          ke: this.ke
        }
      });
    },

    async toiri() {
      this.$store.commit("scrutinizer/mutKe", this.ke); // To change

      this.$q.loading.show({
        delay: 100 // ms
      });

      await this.$store.dispatch("scrutinizer/fillCourses"); // To change
      this.$q.loading.hide();
    }
  },

  computed: {
    ...mapGetters("scrutinizer", ["currentSession", "allCourses",]), // To change

    currentCourse: {
      get() {
        return this.$store.getters["scrutinizer/currentCourse"]; // To change
      },

      set(curCourse) {
        this.$store.commit("scrutinizer/mutCurCourse", curCourse); // To change
      }
    }
  },

  watch: {
    async currentCourse(newVal, oldVal) {
      //await this.fillSingleCourse();
      //console.log("hemlo");
    },

    async "$route.params"(to, from) {
      await this.toiri();
    }
  },

  async created() {
    await this.toiri();
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
