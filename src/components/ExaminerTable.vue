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
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ExaminerTable",

  data() {
    return {
      canEdit: false,
    };
  },

  methods: {
    updateMarks(e, studentID) {
      this.$store.commit("examiner/mutSingleMark", {
        studentID,
        marks: e.target.value,
      })
    }
  },

  computed: {
    ...mapGetters("examiner", {
      info: "currentCourseInfo"
    })
  }
};
</script>

<style scoped></style>
