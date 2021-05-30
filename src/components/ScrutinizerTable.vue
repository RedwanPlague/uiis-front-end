<template>
  <div class="q-pa-sm">
    <h6>{{ info.courseID + " - " + info.courseTitle }}</h6>
    <!-- <h6>{{info.teachers}}</h6> -->
    <!-- <q-markup-table v-if="!courseLoading" separator="vertical" flat bordered>
      <thead>
        <tr>
          <th v-for="matha in allheaders" :key="matha">
            {{ matha }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(deho, index) in studentDehos" :key="index">
          <td v-for="(entry, eindex) in deho" :key="eindex">
            {{ entry }}
          </td>
        </tr>
      </tbody>
    </q-markup-table> -->
    <div v-if="!courseLoading">
      <q-table
        v-for="(teacherInfo, index) in allTeacherInfo"
        :key="index"
        :title="teacherInfo.teacherName"
        :data="teacherInfo.deho"
        :columns="teacherInfo.mathas"
        separator="cell"
        row-key="studentID"
      >
      </q-table>

      <q-table
        title="Term Final"
        :data="tfInfo.deho"
        :columns="tfInfo.mathas"
        separator="cell"
        row-key="studentID"
      >
      </q-table>
    </div>
    <h3 v-else>Loading</h3>

    <!-- <p>{{ allTeacherInfo }}</p> -->

    <q-btn color="primary" label="Forward to department head" />
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import { api } from "boot/axios";
import { colors } from "quasar";

export default {
  name: "ScrutinizerTable",

  data() {
    return {};
  },

  methods: {
    ...mapActions("scrutinizer", ["fillSingleCourse"])
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
    }),

    allheaders() {
      const mathas = ["Student ID"];

      for (const teacher of this.info.teachers) {
        mathas.push(
          `${teacher.teacher}-Attendance (${this.attTotal(teacher.teacher)})`
        );
      }

      for (const teacher of this.info.teachers) {
        for (const evall of teacher.evalDescriptions) {
          mathas.push(
            `${teacher.teacher}-eval-${evall.evalID} (${this.evalTotal(
              teacher.teacher,
              evall.evalID
            )})`
          );
        }
      }

      for (const examiner of this.info.examiners) {
        mathas.push(
          `${examiner.teacher}-Term Final-${examiner.part}  (${this.tfTotal(
            examiner.teacher,
            examiner.part
          )})`
        );
      }

      return mathas;
    },

    studentDehos() {
      const shobDehos = [];

      for (const student of this.info.students) {
        const studentID = student.student.id;

        const deho = [studentID];

        for (const teacher of this.info.teachers) {
          deho.push(this.attStudent(teacher.teacher, studentID));
        }

        for (const teacher of this.info.teachers) {
          for (const evall of teacher.evalDescriptions) {
            deho.push(
              this.evalStudent(teacher.teacher, evall.evalID, studentID)
            );
          }
        }

        for (const examiner of this.info.examiners) {
          deho.push(this.tfStudent(examiner.teacher, examiner.part, studentID));
        }

        shobDehos.push(deho);
      }

      shobDehos.sort((a, b) => (a[0] < b[0] ? -1 : 1));

      return shobDehos;
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
          sortable: true
        };

        mathas.push(stu);

        const att = {
          name: "attendance",
          label: `Attendance Count (${this.attTotal(teacher.teacher)})`,
          field: "attendance",
          sortable: true,
          align: "center"
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
            align: "center"
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
        sortable: true
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
          align: "center"
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

      return ({mathas, deho});
    }
  },

  async created() {
    await this.fillSingleCourse();
    console.log("hemlo");
  }
};
</script>

<style scoped></style>
