<template>
  <q-page class="container">
    <div class="column items-center">
      <h6>Current Session: {{ currentSession }}</h6>

      <q-table
        class="table"
        title="Incomplete Courses"
        :data="incompleteCourses"
        :columns="columns"
        row-key="courseID"
        table-header-class="bg-primary text-white"
        separator="cell"
      />

      <q-table
        class="table"
        title="Pending Courses"
        :data="checkingCourses"
        :columns="columns"
        row-key="courseID"
        separator="cell"
        :selected-rows-label="getSelectedString"
        selection="multiple"
        :selected.sync="selected"
        table-header-class="bg-primary text-white"
        @row-click="onRowClick"
      />

      <q-table
        class="table"
        title="Forwarded Courses"
        :data="forwardedCourses"
        :columns="columns"
        row-key="courseID"
        separator="cell"
        table-header-class="bg-primary text-white"
        @row-click="onRowClick"
      />

      <div class="row justify-center">
        <q-btn
          class="submit-btn q-mt-xl"
          color="primary"
          :label="forwardLabel"
          @click="forwardResults"
          :disable="selected.length === 0"
          no-caps
        />
      </div>

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
          sortable: true
        },
        {
          name: "courseTitle",
          label: "Course Title",
          field: "courseTitle",
          required: true,
          align: "left",
          sortable: true
        }
      ],
      selected: []
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
    },

    getSelectedString() {
      return this.selected.length === 0
        ? ""
        : `${this.selected.length} course${
            this.selected.length > 1 ? "s" : ""
          } selected`;
    },

    porerjon() {
      if (this.ke === "head") return "ECO";
      else if (this.ke === "scrutinizer") return "Internal";
      else if (this.ke === "internal") return "Department Head";
      else return "Janina";
    },

    async forwardResults() {
      for (const cr of selected) {
        await api.put(
          `/teacher/${this.ke}/${this.info.courseID}/${this.currentSession}/approve`
        );
      }

      this.$q.notify({
        icon: "done",
        message: `Result Forwarded to ${this.porerjon()}`,
        position: "bottom-left"
      });

      await this.toiri();
    }
  },

  computed: {
    ...mapGetters("scrutinizer", ["currentSession", "allCourses"]), // To change

    currentCourse: {
      get() {
        return this.$store.getters["scrutinizer/currentCourse"]; // To change
      },

      set(curCourse) {
        this.$store.commit("scrutinizer/mutCurCourse", curCourse); // To change
      }
    },

    incompleteCourses() {
      return this.allCourses.filter(cr => cr.prevDone === false);
    },

    checkingCourses() {
      return this.allCourses.filter(
        cr => cr.prevDone === true && cr.hasForwarded === false
      );
    },

    forwardedCourses() {
      return this.allCourses.filter(cr => cr.hasForwarded === true);
    },

    forwardLabel() {
      return `Forward to ${this.porerjon()}`;
    },
  },

  watch: {
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
.submit-btn {
  margin-bottom: 30px;
}
</style>
