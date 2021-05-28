<template>
  <div class="q-pa-sm">
    <h6>
      {{
        info.courseID + " (" + info.courseTitle + " ) - " + "Part " + info.part
      }}
    </h6>
    <q-checkbox v-model="canEdit" label="Edit" :disable="!info.hasEditAccess" />
    <q-markup-table>
      <thead>
        <tr>
          <th>Student ID</th>
          <th>Marks ({{ info.totalMarks }})</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in info.students" :key="student.studentID">
          <td>{{ student.studentID }}</td>
          <td>
            <input
              type="number"
              :value="student.marks"
              :disabled="!canEdit"
              @change="updateMarks($event, student.studentID)"
            />
          </td>
        </tr>
      </tbody>
    </q-markup-table>

    <q-btn color="primary" label="Save" class="q-mt-md" @click="saveMarks" />
    <q-btn
      color="primary"
      label="Submit"
      class="q-mt-md"
      @click="submitMarks"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { api } from "boot/axios";

export default {
  name: "ExaminerTable",

  data() {
    return {
      canEdit: false
    };
  },

  methods: {
    updateMarks(e, studentID) {
      this.$store.commit("examiner/mutSingleMark", {
        studentID,
        marks: Number(e.target.value),
      });
    },

    async uploadMarks(dhoron) {
      const courseID = this.info.courseID;
      const session = this.currentSession;
      const part = this.info.part;

      const students = this.info.students.map(student => ({
        studentID: student.studentID,
        mark: student.marks
      }));

      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJ0MSIsImlhdCI6MTYyMjA0Njc2Mn0.vdxf-sKNb5UnO26cQdDDyT0B2O9lDjD40smW2VnSAoU";

      await api.put(
        `teacher/examiner/${courseID}/${session}/${dhoron}`,
        {
          part,
          students
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
    },

    async saveMarks() {
      await this.uploadMarks("save");
    },

    async submitMarks() {
      await this.uploadMarks("forward");
      this.$forceUpdate();
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
