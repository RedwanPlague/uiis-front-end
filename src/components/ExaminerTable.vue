<template>
  <div class="q-pa-sm column items-center">
    <h6>
      {{
        info.courseID + " (" + info.courseTitle + ") - " + "Part " + info.part
      }}
    </h6>
    <q-checkbox v-model="canEdit" label="Edit" :disable="!info.editAccess" />

    <q-markup-table>
      <thead>
        <tr>
          <th>Student ID</th>
          <th>Marks ({{ info.totalMarks }})</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in info.students" :key="student.studentID">
          <td style="align:center">{{ student.studentID }}</td>
          <td style="align:center">
            <input
              type="number"
              style="text-align:center"
              :value="student.mark"
              :disabled="!canEdit"
              @change="updateMarks($event, student.studentID)"
            />
          </td>
        </tr>
      </tbody>
    </q-markup-table>

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

    <!-- <h4 v-if="probRolls.length">
      Please recheck the marks of {{ probRolls.join() }}!
    </h4> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { api } from "boot/axios";

export default {
  name: "ExaminerTable",

  data() {
    return {
      canEdit: false,
      probRolls: []
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
    })
  }
};
</script>

<style scoped></style>
