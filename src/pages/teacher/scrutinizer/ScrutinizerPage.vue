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
        v-if="ke != `eco`"
        class="table"
        title="Arrived Courses"
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
        v-else
        class="table"
        title="Arrived Courses"
        :data="checkingCourses"
        :columns="columns"
        row-key="courseID"
        separator="cell"
        table-header-class="bg-primary text-white"
        @row-click="onRowClick"
      />

      <q-table
        v-if="ke != `eco`"
        class="table"
        title="Forwarded Courses"
        :data="forwardedCourses"
        :columns="columns"
        row-key="courseID"
        separator="cell"
        table-header-class="bg-primary text-white"
        @row-click="onRowClick"
      />

      <div class="row justify-center" v-if="ke != `eco`">
        <q-btn
          class="submit-btn q-mt-xl"
          color="primary"
          :label="forwardLabel"
          @click="submitting = true"
          :disable="selected.length === 0"
          no-caps
        />
        <q-dialog v-model="submitting">
          <q-card>
            <q-card-section class="row items-center">
              <span class="q-ml-sm">Are you sure to submit?</span>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="No" color="primary" v-close-popup />
              <q-btn
                flat
                label="yes"
                color="primary"
                @click="forwardResults"
                v-close-popup
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
      <div class="row justify-center" v-else-if="!resultPublished && incompleteCourses.length === 0">
        <q-btn
          class="submit-btn q-mt-xl"
          color="primary"
          label="Publish Results"
          @click="submitting = true"
          no-caps
        />
        <q-dialog v-model="submitting">
          <q-card>
            <q-card-section class="row items-center">
              <span class="q-ml-sm publish-text"
                >Are you sure to publish results?</span
              >
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="No" color="primary" v-close-popup />
              <q-btn
                flat
                label="yes"
                color="primary"
                @click="publishResults"
                v-close-popup
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { api } from "boot/axios";

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
      submitting: false,
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
      this.selected = [];
      this.$store.commit("scrutinizer/mutKe", this.ke); // To change

      this.$q.loading.show({
        delay: 100 // ms
      });
      await this.$store.dispatch("scrutinizer/fillResPublished"); // To change
      await this.$store.dispatch("scrutinizer/fillCurrentSession"); // To change
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
      const notif = this.$q.notify({
        spinner: true,
        message: "Forwarding",
        group: false, // required to be updatable
        timeout: 0, // we want to be in control when it gets dismissed,
        position: "bottom-left"
      });

      for (const cr of this.selected) {
        await api.put(
          `/teacher/${this.ke}/${cr.courseID}/${this.currentSession}/approve`
        );
      }

      notif({
        icon: "done",
        message: `Result Forwarded to ${this.porerjon()}`,
        position: "bottom-left",
        spinner: false,
        timeout: 1500
      });

      await this.toiri();
    },

    async publishResults() {
      const notif = this.$q.notify({
        spinner: true,
        message: "Publishing",
        group: false, // required to be updatable
        timeout: 0, // we want to be in control when it gets dismissed,
        position: "bottom-left"
      });

      await api.put(
        `/teacher/${this.ke}/publish`
      );

      notif({
        icon: "done",
        message: `Result published!`,
        position: "bottom-left",
        spinner: false,
        timeout: 1500
      });

      await this.toiri();
    }
  },

  computed: {
    ...mapGetters("scrutinizer", ["currentSession", "allCourses", "resultPublished"]), // To change

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
    }
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
  margin-bottom: 30px;
}
.submit-btn {
  margin-bottom: 30px;
}
.publish-text {
  font-weight: bolder;
  color: red;
}
</style>
