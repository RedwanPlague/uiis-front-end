<template>
  <div class="q-pa-sm column items-center" v-if="info">
    <h6>
      {{
        info.courseID + " (" + info.courseTitle + ") - " + "Part " + info.part
      }}
    </h6>
    <q-checkbox v-model="canEdit" v-if="canSave" label="Edit" />

    <q-table
      class="table"
      title="Marks"
      :data="students"
      :columns="columns"
      row-key="studentID"
      separator="cell"
      :pagination="initialPagination"
      table-header-class="bg-primary text-white"
    >
      <template v-slot:body="props">
        <q-tr
          :props="props"
          :class="{ bhul: info.hasForwarded && props.row.editAccess }"
        >
          <q-td key="studentID" :props="props">
            {{ props.row.studentID }}
          </q-td>
          <q-td key="mark" :props="props">
            <q-input
              type="number"
              :value="props.row.mark"
              :disable="!canEdit || !props.row.editAccess"
              @change="updateMarks($event, props.row.studentID)"
            ></q-input>
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <div class="btns">
      <q-btn
        color="primary"
        label="Save"
        class="q-ma-md"
        @click="saveMarks"
        v-if="canSave"
      >
      </q-btn>
      <q-btn
        color="primary"
        label="Submit"
        class="q-ma-md"
        @click="submitting = true"
        v-if="!info.hasForwarded"
      />

      <q-dialog v-model="submitting" persistent>
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
              @click="submitMarks"
              v-close-popup
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </div>
  <div v-else>{{ info }}</div>
</template>

<script>
import { mapGetters } from "vuex";
import { api } from "boot/axios";
import { ref } from "vue";

export default {
  name: "ExaminerTable",

  setup() {
    return {
      //submitting: ref(false)
    };
  },

  data() {
    return {
      submitting: false,
      loading: true,
      canEdit: false,
      probRolls: [],
      initialPagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: null
        // rowsNumber: xx if getting data from a server
      },
      columns: [
        {
          name: "studentID",
          label: "Student ID",
          field: "studentID",
          required: true,
          align: "left",
          sortable: true
        },
        {
          name: "mark",
          label: "Mark",
          field: "mark",
          align: "left"
        }
      ]
    };
  },

  methods: {
    updateMarks(e, studentID) {
      this.$store.commit("examiner/mutSingleMark", {
        studentID,
        mark: Number(e.target.value)
      });
    },

    async uploadMarks(dhoron) {
      try {
        const courseID = this.info.courseID;
        const session = this.currentSession;
        const part = this.info.part;

        this.probRolls = [];
        this.info.students.forEach(student => {

          if (student.mark < 0 || student.mark > this.info.totalMarks)
            this.probRolls.push(student.studentID);
        });

        if (this.probRolls.length) {
          this.$q.notify({
            icon: "error",
            message: `Please recheck the marks of ${this.probRolls.join()}!`,
            position: "bottom-left",
            actions: [
              {
                label: "Dismiss",
                color: "yellow",
                handler: () => {
                  /* ... */
                }
              }
            ]
          });

          return false;
        }

        const students = this.info.students.map(student => ({
          studentID: student.studentID,
          mark: student.mark ? student.mark : null
        }));

        const sucMes = dhoron === "save" ? "saved!" : "forwarded!";
        const loadMes = dhoron === "save" ? "saving!" : "forwarding!";

        const notif = this.$q.notify({
          spinner: true,
          message: loadMes,
          group: false, // required to be updatable
          timeout: 0, // we want to be in control when it gets dismissed,
          position: "bottom-left"
        });

        const ashbe = await api.put(
          `teacher/examiner/${courseID}/${session}/${dhoron}`,
          {
            part,
            students
          }
        );

        notif({
          icon: "done",
          message: sucMes,
          position: "bottom-left",
          spinner: false,
          timeout: 1500
        });

        return true;
      } catch (e) {}
    },

    async saveMarks() {
      await this.uploadMarks("save");
    },

    async submitMarks() {
      const paise = await this.uploadMarks("forward");
      if (paise) {
        this.$store.commit("examiner/mutHasForwarded");
      }
    }
  },

  computed: {
    ...mapGetters("examiner", {
      info: "currentCourseInfo",
      currentSession: "currentSession"
    }),

    students() {
      return this.info.students ? this.info.students : [];
    },

    canSave() {
      for (const stu of this.students) {
        if (stu.editAccess) return true;
      }
      return false;
    }
  },

  watch: {
    async "$route.params"(to, from) {
      if (!this.$route.params.courseID || !this.$route.params.part) {
        return;
      }

      this.$store.commit("examiner/mutCurCourse", this.$route.params.courseID);
      this.$store.commit("examiner/mutCurPart", this.$route.params.part);

      this.loading = true;
      this.$q.loading.show({
        delay: 100 // ms
      });

      this.courseLoading = true;
      await this.$store.dispatch("examiner/fillCurrentCourse");
      this.courseLoading = false;

      consoloe.log(this.students);

      this.$q.loading.hide();
      this.loading = false;
    },

    info(to) {
      this.loading = false;
    }
  },

  async created() {
    this.$q.loading.show({
      delay: 100 // ms
    });
    this.loading = true;

    if (!this.info) {
      await this.$store.dispatch("examiner/fillCurrentSession");
      await this.$store.dispatch("examiner/fillCourses");
    }

    this.$store.commit("examiner/mutCurCourse", this.$route.params.courseID);
    this.$store.commit("examiner/mutCurPart", this.$route.params.part);

    await this.$store.dispatch("examiner/fillCurrentCourse");

    this.loading = false;
    this.$q.loading.hide();
  }
};
</script>
<style scoped>
.btns {
  margin-top: 30px;
}
.bhul {
  background: rgba(255, 0, 0, 0.2);
}
.bhul.q-table tbody td:after {
  background: rgba(255, 0, 0, 0.2);
}
</style>
