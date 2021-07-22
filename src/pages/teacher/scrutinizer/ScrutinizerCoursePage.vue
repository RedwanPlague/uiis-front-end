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
                <template v-slot:body-cell="props">
                  <q-td
                    :props="props"
                    :class="
                      getTeacherRowClass(
                        teacherInfo.fakeTeacherID,
                        props.row.studentID
                      )
                    "
                  >
                    {{ props.value }}
                  </q-td>
                </template>
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
                <template v-slot:body-cell="props">
                  <q-td
                    :props="props"
                    :class="
                      getExaminerRowClass(
                        examinerInfo.fakeExaminerID,
                        props.row.studentID
                      )
                    "
                  >
                    {{ props.value }}
                  </q-td>
                </template>
              </q-table>
              <IssueForm :details="examinerInfo.issueDetails" />
            </div>
          </q-carousel-slide>

          <q-carousel-slide
            name="full-results"
            class="column no-wrap flex-center"
          >
            <div class="text-center">
              <q-table
                title="Consolidated Results"
                :data="fullResultsInfo.deho"
                :columns="fullResultsInfo.mathas"
                separator="cell"
                padding
                row-key="studentID"
                :pagination="initialPagination"
                table-header-class="bg-primary text-white"
                class="table"
              >
              </q-table>
            </div>
          </q-carousel-slide>

          <q-carousel-slide
            name="statistics"
            class="column no-wrap flex-center"
          >
            <div class="text-center">
              <q-table
                title="Statistics"
                :data="statisticsInfo.deho"
                :columns="statisticsInfo.mathas"
                separator="cell"
                padding
                row-key="grade"
                :pagination="gradePagination"
                table-header-class="bg-primary text-white"
                class="table"
              >
              </q-table>
            </div>
          </q-carousel-slide>
        </q-carousel>

        <div class="row justify-center">
          <q-btn
            v-show="!(!canEdit || hasForwarded || barse)"
            class="submit-btn q-mt-sm"
            color="primary"
            :label="forwardLabel"
            @click="forwardResult"
            no-caps
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
      gradePagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 10
        // rowsNumber: xx if getting data from a server
      },
      barse: false
    };
  },

  props: {
    ke: {
      type: String,
      required: true
    },
    initLabel: {
      type: String,
      required: false
    }
  },

  components: {
    IssueForm: () => import("components/IssueForm")
  },

  methods: {
    setBarse(barse) {
      this.barse = barse;
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
        `/teacher/${this.ke}/${this.info.courseID}/${this.currentSession}/approve`
      );
      this.$store.commit("scrutinizer/mutHasForwarded");

      this.$q.notify({
        icon: "done",
        message: "Result Forwarded to Department Head",
        position: "bottom-left"
      });
    },

    porerjon() {
      if (this.ke === "head") return "ECO";
      else if (this.ke === "scrutinizer") return "Internal";
      else if (this.ke === "internal") return "Department Head";
      else return "Janina";
    },

    getTeacherRowClass(fakeTeacherID, studentID) {
      const teacherID = fakeTeacherID.slice(8);
      const section = this.info.teacherColored.find(
        teacher => teacher.teacher === teacherID
      );

      if (section.unchangedList.includes(studentID)) return "bhul";
      else if (section.updatedList.includes(studentID)) return "thik";
      else return "";
    },

    getExaminerRowClass(fakeExaminerID, studentID) {
      const examinerID = fakeExaminerID.split("-")[2];
      const part = fakeExaminerID.split("-")[1];
      const section = this.info.examinerColored.find(
        examiner => examiner.teacher === examinerID && part === examiner.part
      );

      if (section.unchangedList.includes(studentID)) return "bhul";
      else if (section.updatedList.includes(studentID)) return "thik";
      else return "";
    },

    async toiri() {
      this.loading = true;

      // console.log("initLAbel = ");
      // console.log(this.$route.props);

      // console.log("route -> ");
      // console.log(this.$route);

      // console.log("ke->");
      // console.log(this.ke);

      this.$store.commit("scrutinizer/mutKe", this.ke); // To change
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

      try {
        await this.$store.dispatch("scrutinizer/fillSingleCourse");
      } catch (error) {
        console.log(error);
      }

      this.loading = false;

      this.$q.loading.hide();

      if (this.labels.length > 0) {
        if (this.initLabel) this.slide = this.initLabel;
        else this.slide = this.labels[0]["value"];
      }

      this.initialPagination.rowsPerPage = this.info.students.length;
    }
  },

  computed: {
    ...mapGetters("scrutinizer", {
      info: "currentCourseInfo",
      attTotal: "attTotal",
      attFullTotal: "attFullTotal",
      attStudent: "attStudent",
      attFullStudent: "attFullStudent",
      evalTotal: "evalTotal",
      evalFullTotal: "evalFullTotal",
      evalStudent: "evalStudent",
      evalFullStudent: "evalFullStudent",
      tfTotal: "tfTotal",
      tfFullTotalPerPart: "tfFullTotalPerPart",
      tfStudent: "tfStudent",
      tfFullStudent: "tfFullStudent",
      fullTotal: "fullTotal",
      fullStudent: "fullStudent",
      percentStudent: "percentStudent",
      gpaStudent: "gpaStudent",
      gradeStudent: "gradeStudent",
      gradeList: "gradeList",
      countGrade: "countGrade",
      percentGrade: "percentGrade",
      totalStudents: "totalStudents",
      //courseLoading: "courseLoading",
      hasForwarded: "hasForwarded",
      currentSession: "currentSession"
    }),

    forwardLabel() {
      return `Forward to ${this.porerjon()}`;
    },

    allCompleted() {
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
        const fakeExaminerID =
          "examiner-" + examiner.part + "-" + examiner.teacher;
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

    fullResultsInfo() {
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
        label: `Attendance (${this.attFullTotal})`,
        field: "attendance",
        sortable: true,
        align: "left"
      };

      mathas.push(att);

      const evals = {
        name: "evals",
        label: `Evaluations (${this.evalFullTotal})`,
        field: "evals",
        sortable: true,
        align: "left"
      };

      mathas.push(evals);

      for (const examiner of this.info.examiners) {
        const tfpart = {
          name: `tf - ${examiner.part}`,
          label: `TF - Part ${examiner.part} (${this.tfFullTotalPerPart})`,
          field: `tf - ${examiner.part}`,
          sortable: true,
          align: "left"
        };

        mathas.push(tfpart);
      }

      const total = {
        name: "total",
        label: `Total (${this.fullTotal})`,
        field: "total",
        sortable: true,
        align: "left"
      };

      mathas.push(total);

      mathas.push({
        name: "percentage",
        label: `% (100)`,
        field: "percentage",
        sortable: true,
        align: "left"
      });

      mathas.push({
        name: "gpa",
        label: `GPA`,
        field: "gpa",
        sortable: true,
        align: "left"
      });

      mathas.push({
        name: "grade",
        label: `Grade`,
        field: "grade",
        sortable: true,
        align: "left"
      });

      for (const regi of this.info.students) {
        const notun = {};

        notun["studentID"] = regi.student.id;
        notun["attendance"] = this.attFullStudent(regi.student.id);
        notun["evals"] = this.evalFullStudent(regi.student.id);

        for (const section of regi.termFinalMarks) {
          notun[`tf - ${section.part}`] = this.tfFullStudent(
            section.part,
            regi.student.id
          );
        }

        notun["total"] = this.fullStudent(regi.student.id);
        notun["percentage"] = this.percentStudent(regi.student.id);
        notun["gpa"] = this.gpaStudent(regi.student.id);
        notun["grade"] = this.gradeStudent(regi.student.id);

        deho.push(notun);
      }

      return { mathas, deho };
    },

    statisticsInfo() {
      const mathas = [];
      const deho = [];

      mathas.push({
        name: "gpa",
        label: `GPA`,
        field: "gpa",
        sortable: true,
        align: "left"
      });

      mathas.push({
        name: "grade",
        label: `Grade`,
        field: "grade",
        sortable: true,
        align: "left"
      });

      mathas.push({
        name: "numofstu",
        label: `Number of Students (${this.totalStudents})`,
        field: "numofstu",
        sortable: true,
        align: "left"
      });

      mathas.push({
        name: "percentage",
        label: `Percentage (100)`,
        field: "percentage",
        sortable: true,
        align: "left"
      });

      this.gradeList.forEach(grade => {
        const notun = {
          gpa: grade.gpa,
          grade: grade.grade,
          numofstu: this.countGrade(grade.grade),
          percentage: this.percentGrade(grade.grade)
        };

        deho.push(notun);
      });

      return { mathas, deho };
    },

    labels() {
      const teachers = this.info.teachers.map(teacher => ({
        label: this.info.names[teacher.teacher],
        value: "teacher-" + teacher.teacher
      }));

      const examiners = this.info.examiners.map(examiner => ({
        label: `Term Final - Part ${examiner.part}`,
        value: "examiner-" + examiner.part + "-" + examiner.teacher
      }));

      teachers.push(...examiners);

      teachers.push({
        label: `Full Results`,
        value: `full-results`
      });

      teachers.push({
        label: `Statistics`,
        value: `statistics`
      });

      return teachers;
    }
  },

  watch: {
    async "$route.params"(to, from) {
      await this.toiri();
    },

    slide(to) {
      this.selected = [];
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
.bhul {
  background: rgba(255, 0, 0, 0.2);
}
.thik {
  background: rgba(0, 255, 0, 0.2);
}
</style>
