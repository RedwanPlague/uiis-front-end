<template>
  <div class="q-pa-sm column items-center" v-if="info">
    <h6>
      {{
        info.courseID + " (" + info.courseTitle + ") - " + "Part " + info.part
      }}
    </h6>
    <q-checkbox v-model="canEdit" label="Edit" />

    <q-table
      class="table"
      title="Marks"
      :data="students"
      :columns="columns"
      row-key="studentID"
      separator="cell"
      table-header-class="bg-primary text-white"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="studentID" :props="props">
            {{ props.row.studentID }}
          </q-td>
          <q-td key="mark" :props="props">
            <q-input
              type="number"
              :value="props.row.mark"
              @change="updateMarks($event, props.row.studentID)"
            ></q-input>
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <div class="">
      <q-btn
        color="primary"
        label="Save"
        class="q-ma-md"
        @click="saveMarks"
        :disable="!info.editAccess"
      >
      </q-btn>
      <q-btn
        color="primary"
        label="Submit"
        class="q-ma-md"
        @click="submitMarks"
        :disable="!info.editAccess"
      />
    </div>
  </div>
  <div v-else>{{ info }}</div>
</template>

<script>
import { mapGetters } from "vuex";
import { api } from "boot/axios";

export default {
  name: "ExaminerTable",

  data() {
    return {
      loading: true,
      canEdit: false,
      probRolls: [],

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
      ],

      studentss: [
        {
          studentID: "1605002",
          studentName: "Zawad",
          mark: 0,
          editAccess: true
        },
        {
          studentID: "1605003",
          studentName: "Bishwa",
          mark: 10,
          editAccess: true
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

      console.log(this.students);
    },

    async uploadMarks(dhoron) {
      const courseID = this.info.courseID;
      const session = this.currentSession;
      const part = this.info.part;

      this.probRolls = [];
      this.info.students.forEach(student => {
        console.log(student.studentID);
        console.log(student.mark);
        console.log(this.info.totalMarks);

        if (student.mark < 0 || student.mark > this.info.totalMarks)
          this.probRolls.push(student.studentID);
      });

      console.log(this.probRolls);

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

      const ashbe = await api.put(
        `teacher/examiner/${courseID}/${session}/${dhoron}`,
        {
          part,
          students
        }
      );

      console.log(ashbe);

      const sucMes = dhoron === "save" ? "saved!" : "forwarded!";

      this.$q.notify({
        icon: "done",
        message: sucMes,
        position: "bottom-left"
      });

      return true;
    },

    async saveMarks() {
      await this.uploadMarks("save");
    },

    async submitMarks() {
      const paise = await this.uploadMarks("forward");
      if (paise) {
        this.canEdit = false;
        this.$store.commit("examiner/mutHasEditAccess");
      }
    }
  },

  computed: {
    ...mapGetters("examiner", {
      info: "currentCourseInfo",
      currentSession: "currentSession"
    }),

    students() {
      console.log(this.info.students);
      return this.info.students ? this.info.students : [];
    }
  },

  watch: {
    async "$route.params"(to, from) {
      if (!this.$route.params.courseID || !this.$route.params.part) {
        return;
      }

      this.$store.commit("examiner/mutCurCourse", this.$route.params.courseID);
      this.$store.commit("examiner/mutCurPart", this.$route.params.part);

      this.$q.loading.show({
        delay: 100 // ms
      });

      this.courseLoading = true;
      await this.$store.dispatch("examiner/fillCurrentCourse");
      this.courseLoading = false;

      consoloe.log(this.students);

      this.$q.loading.hide();
    },

    info(to) {
      this.loading = false;
    }
  },

  async created() {
    this.$q.loading.show({
      delay: 100 // ms
    });

    if (!this.info) await this.$store.dispatch("examiner/fillCourses");

    this.$store.commit("examiner/mutCurCourse", this.$route.params.courseID);
    this.$store.commit("examiner/mutCurPart", this.$route.params.part);

    await this.$store.dispatch("examiner/fillCurrentCourse");

    this.$q.loading.hide();
  }
};
</script>
<style scoped></style>
