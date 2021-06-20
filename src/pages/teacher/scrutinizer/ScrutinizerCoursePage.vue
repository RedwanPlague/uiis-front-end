<template>
  <q-page class="container">
    <div class="q-pa-sm" v-if="!loading">
      <div class="row justify-center q-mb-md">
        <h6 class="q-mb-sm">
          {{ info.courseID + " - " + info.courseTitle }}
        </h6>
      </div>

      <div>
        <div class="row justify-center">
          <q-btn-toggle glossy v-model="slide" :options="labels" no-caps />
        </div>

        <q-carousel
          v-model="slide"
          transition-prev="slide-right"
          transition-next="slide-left"
          animated
          draggable="false"
          control-color="primary"
          height="100%"
        >
          <q-carousel-slide
            v-for="(teacherInfo, index) in allTeacherInfo"
            :key="index"
            :name="teacherInfo.fakeTeacherID"
            class="column no-wrap flex-center"
          >
            <div class="text-center">
              <q-table
                :title="teacherInfo.teacherName"
                :data="teacherInfo.deho"
                :columns="teacherInfo.mathas"
                separator="cell"
                row-key="studentID"
                :selected-rows-label="getSelectedString"
                selection="multiple"
                :selected.sync="selected"
                :pagination="initialPagination"
                table-header-class="bg-primary text-white"
                class="table"
              >
              </q-table>
              <IssueForm :details="teacherInfo.issueDetails" />
            </div>
          </q-carousel-slide>
          <q-carousel-slide
            v-for="(examinerInfo, index) in allTfInfo"
            :key="index"
            :name="examinerInfo.fakeExaminerID"
            class="column no-wrap flex-center"
          >
            <div class="text-center">
              <q-table
                :title="examinerInfo.examinerName"
                :data="examinerInfo.deho"
                :columns="examinerInfo.mathas"
                separator="cell"
                padding
                row-key="studentID"
                :selected-rows-label="getSelectedString"
                selection="multiple"
                :selected.sync="selected"
                :pagination="initialPagination"
                table-header-class="bg-primary text-white"
                class="table"
              >
              </q-table>
              <IssueForm
                :details="examinerInfo.issueDetails"
              />
            </div>
          </q-carousel-slide>
        </q-carousel>

        <div class="row justify-center">
          <q-btn
            v-show="!(!canEdit || hasForwarded || barse)"
            class="submit-btn q-mt-sm"
            color="primary"
            label="Forward to department head"
            @click="forwardResult"
          />
        </div>
      </div>
    </div>
    <div v-else></div>
  </q-page>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import { api } from "boot/axios";
import { colors } from "quasar";

export default {
  name: "ScrutinizerTable",

  data() {
    return {
      canEdit: true,
      slide: null,
      loading: true,
      selected: [],
      initialPagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: null
        // rowsNumber: xx if getting data from a server
      },
      barse: false
    };
  },

  components: {
    IssueForm: () => import("components/IssueForm")
  },

  methods: {
    setBarse(barse) {
      this.barse = barse;
      console.log(this.barse);
    },

    getSelectedString() {
      return this.selected.length === 0
        ? ""
        : `${this.selected.length} students${
            this.selected.length > 1 ? "s" : ""
          } selected`;
    },

    ...mapActions("scrutinizer", ["fillSingleCourse"]),

    async forwardResult() {
      this.canEdit = false;
      await api.put(
        `/teacher/scrutinizer/${this.info.courseID}/${this.currentSession}/approve`
      );
      this.$store.commit("scrutinizer/mutHasForwarded");
      console.log(this.hasForwarded);

      this.$q.notify({
        icon: "done",
        message: "Result Forwarded to Department Head",
        position: "bottom-left"
      });
    }
  },

  computed: {
    ...mapGetters("scrutinizer", {
      info: "currentCourseInfo",
      attTotal: "attTotal",
      attStudent: "attStudent",
      evalTotal: "evalTotal",
      evalStudent: "evalStudent",
      tfTotal: "tfTotal",
      tfStudent: "tfStudent",
      //courseLoading: "courseLoading",
      hasForwarded: "hasForwarded",
      currentSession: "currentSession"
    }),

    allCompleted() {
      console.log(this.info);
      for (const regi of this.info.students) {
        for (const teacher of this.info.teachers) {
          if (this.attStudent(teacher.teacher, regi.student.id) === "NA")
            return false;

          for (const evall of teacher.evalDescriptions) {
            if (
              this.evalStudent(
                teacher.teacher,
                evall.evalID,
                regi.student.id
              ) === "NA"
            )
              return false;
          }
        }

        for (const examiner of this.info.examiners) {
          if (
            this.tfStudent(examiner.teacher, examiner.part, regi.student.id) ===
            "NA"
          )
            return false;
        }
      }
      return true;
    },

    allTeacherInfo() {
      const shob = [];

      for (const teacher of this.info.teachers) {
        const mathas = [];
        const deho = [];

        const stu = {
          name: "studentID",
          label: `Student ID`,
          field: "studentID",
          sortable: true,
          align: "left"
        };

        mathas.push(stu);

        const att = {
          name: "attendance",
          label: `Attendance Count (${this.attTotal(teacher.teacher)})`,
          field: "attendance",
          sortable: true,
          align: "left"
        };

        mathas.push(att);

        for (const evall of teacher.evalDescriptions) {
          const dhukbe = {
            name: `eval_${evall.evalID}`,
            label: `Eval-${evall.evalID} (${this.evalTotal(
              teacher.teacher,
              evall.evalID
            )})`,
            field: `eval_${evall.evalID}`,
            sortable: true,
            align: "left"
          };

          mathas.push(dhukbe);
        }

        for (const regi of this.info.students) {
          const notun = {};

          notun["studentID"] = regi.student.id;

          notun["attendance"] = this.attStudent(
            teacher.teacher,
            regi.student.id
          );
          for (const evall of teacher.evalDescriptions) {
            notun[`eval_${evall.evalID}`] = this.evalStudent(
              teacher.teacher,
              evall.evalID,
              regi.student.id
            );
          }

          deho.push(notun);
        }

        const teacherName = this.info.names[teacher.teacher];
        const fakeTeacherID = "teacher-" + teacher.teacher;

        const issueDetails = {
          courseID: this.info.courseID,
          evalType: "course-eval",
          part: teacher.part,
          evalOwner: teacher.teacher,
          evalOwnerName: this.info.names[teacher.teacher],
          allStudentSelected:
            this.selected.length === this.info.students.length,
          students: this.selected.map(stu => stu.studentID),
          teachers: ["t1", "t2"]
        };

        shob.push({ fakeTeacherID, teacherName, mathas, deho, issueDetails });
      }

      return shob;
    },

    allTfInfo() {
      const shob = [];

      for (const examiner of this.info.examiners) {
        const mathas = [];
        const deho = [];

        const stu = {
          name: "studentID",
          label: `Student ID`,
          field: "studentID",
          sortable: true,
          align: "left"
        };

        mathas.push(stu);

        const partMark = {
          name: "mark",
          label: `Mark`,
          field: "mark",
          sortable: true,
          align: "left"
        };

        mathas.push(partMark);

        for (const regi of this.info.students) {
          const notun = {};

          notun["studentID"] = regi.student.id;

          notun["mark"] = this.tfStudent(
            examiner.teacher,
            examiner.part,
            regi.student.id
          );

          deho.push(notun);
        }

        const examinerName = this.info.names[examiner.teacher];
        const fakeExaminerID = "examiner-" + examiner.teacher;
        const issueDetails = {
          courseID: this.info.courseID,
          evalType: "term-final-eval",
          part: examiner.part,
          evalOwner: examiner.teacher,
          evalOwnerName: this.info.names[examiner.teacher],
          allStudentSelected:
            this.selected.length === this.info.students.length,
          students: this.selected.map(stu => stu.studentID),
          teachers: ["t1", "t2"]
        };

        shob.push({ fakeExaminerID, examinerName, mathas, deho, issueDetails });
      }

      return shob;
    },

    labels() {
      const teachers = this.info.teachers.map(teacher => ({
        label: this.info.names[teacher.teacher],
        value: "teacher-" + teacher.teacher
      }));

      const examiners = this.info.examiners.map(examiner => ({
        label: `Term Final - Part ${examiner.part}`,
        value: "examiner-" + examiner.teacher
      }));

      teachers.push(...examiners);

      return teachers;
    }
  },

  watch: {
    async "$route.params"(to, from) {
      this.loading = true;
      if (!this.$route.params.courseID) {
        return;
      }

      this.$store.commit(
        "scrutinizer/mutCurCourse",
        this.$route.params.courseID
      );

      this.$q.loading.show({
        delay: 100 // ms
      });

      await this.$store.dispatch("scrutinizer/fillSingleCourse");
      this.loading = false;

      this.$q.loading.hide();
    },

    slide(to) {
      this.selected = [];
    }
  },

  async created() {
    this.loading = true;
    if (!this.allCourses || this.allCourses.length === 0)
      await this.$store.dispatch("scrutinizer/fillCourses");

    this.$store.commit("scrutinizer/mutCurCourse", this.$route.params.courseID);

    this.$q.loading.show({
      delay: 100 // ms
    });

    await this.$store.dispatch("scrutinizer/fillSingleCourse");
    this.loading = false;

    this.$q.loading.hide();

    if (this.labels.length > 0) this.slide = this.labels[0]["value"];
    this.initialPagination.rowsPerPage = this.info.students.length;
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
