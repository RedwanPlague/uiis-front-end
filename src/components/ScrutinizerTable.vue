<template>
  <div class="q-pa-sm">
    <h6 class="q-mb-none">{{ info.courseID + " - " + info.courseTitle }}</h6>
    <div v-if="!courseLoading">
      <div>
        <q-table
          v-for="(teacherInfo, index) in allTeacherInfo"
          :key="index"
          :title="teacherInfo.teacherName"
          :data="teacherInfo.deho"
          :columns="teacherInfo.mathas"
          separator="cell"
          row-key="studentID"
          class="q-mt-lg"
        >
        </q-table>

        <q-table
          title="Term Final"
          :data="tfInfo.deho"
          :columns="tfInfo.mathas"
          separator="cell"
          row-key="studentID"
          class="q-mt-lg"
        >
        </q-table>
      </div>
      <q-btn v-show="!(!canEdit || hasApprovedResult || !allCompleted)"
        class="q-mt-xl submit-btn"
        color="primary"
        label="Forward to department head"
        :disable="!canEdit || hasApprovedResult || !allCompleted"
        @click="forwardResult"
      />
    </div>
    <h3 v-else>Loading</h3>


  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import { api } from "boot/axios";
import { colors } from "quasar";

export default {
  name: "ScrutinizerTable",

  data() {
    return {
      canEdit: true
    };
  },

  methods: {
    ...mapActions("scrutinizer", ["fillSingleCourse"]),


    async forwardResult() {

      this.canEdit= false;
      await api.put(
        `/teacher/scrutinizer/${this.info.courseID}/${this.currentSession}/approve`
      );
      this.$store.commit("scrutinizer/mutHasApprovedResult");
      console.log(this.hasApprovedResult);

      this.$q.notify({
        icon: 'done',
        message: 'Result Forwarded to Department Head',
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
      courseLoading: "courseLoading",
      hasApprovedResult: "hasApprovedResult",
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
          headerClasses: 'bg-primary text-white',
          align: "center",
        };

        mathas.push(stu);

        const att = {
          name: "attendance",
          label: `Attendance Count (${this.attTotal(teacher.teacher)})`,
          field: "attendance",
          sortable: true,
          align: "center",
          headerClasses: 'bg-primary text-white',
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
            align: "center",
            headerClasses: 'bg-primary text-white',
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
        shob.push({ teacherName, mathas, deho });
      }

      return shob;
    },

    tfInfo() {
      const mathas = [];
      const deho = [];

      const stu = {
        name: "studentID",
        label: `Student ID`,
        field: "studentID",
        sortable: true,
        headerClasses: 'bg-primary text-white',
        align: "center",
      };

      mathas.push(stu);

      for (const examiner of this.info.examiners) {
        const dhukbe = {
          name: `tf_${examiner.teacher}_${examiner.part}`,
          label: `${this.info.names[examiner.teacher]} - Part ${
            examiner.part
          } (${this.tfTotal(examiner.teacher, examiner.part)})`,
          field: `tf_${examiner.teacher}_${examiner.part}`,
          sortable: true,
          align: "center",
          headerClasses: 'bg-primary text-white',
        };

        mathas.push(dhukbe);
      }

      for (const regi of this.info.students) {
        const notun = {};

        notun["studentID"] = regi.student.id;

        for (const examiner of this.info.examiners) {
          notun[`tf_${examiner.teacher}_${examiner.part}`] = this.tfStudent(
            examiner.teacher,
            examiner.part,
            regi.student.id
          );
        }

        deho.push(notun);
      }

      return { mathas, deho };
    }
  },

  async created() {
    await this.fillSingleCourse();
    console.log("hemlo");
  }
};
</script>

<style scoped>
  .submit-btn {
    margin-left: 200px;
  }
</style>
