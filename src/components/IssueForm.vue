<template>
  <q-page>
    <div class="q-pa-sm">
      <h5>Issue</h5>
      <q-form @submit="createIssue">
        <q-input
          class="full-row"
          filled
          label="Title"
          v-model="title"
        ></q-input>
        <div class="full-row">
          <span class="label">Selected Students</span>
          <q-chip outline color="black" text-color="white" v-for="student in students" :key="student">
            {{ student }}
          </q-chip>
        </div>
        <div>
          <span class="baam">Description</span>
          <q-editor v-model="description" min-height="5rem" />
        </div>

        <q-btn label="Create" type="submit" color="primary" />
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { api } from "boot/axios";
import { mapGetters, mapMutations, mapActions } from "vuex";
import { colors } from "quasar";

export default {
  name: "IssueForm",

  data() {
    return {
      title: "",
      students: ["1605002", "1605011"],
      description: "",
      audience: ["t1"],
    };
  },

  methods: {
    async createIssue() {
      const issue = {
        courseID: "CSE203",
        evalType: "term-final-eval",
        part: "A",
        evalOwner: "t1",
        title: this.title,
        description: this.description,
        allStudentSelected: false,
        students: this.students,
        teachers: this.audience,
      };

      await api.post(`teacher/issues/create`, issue);

      console.log("submitted");
    }
  },

  computed: {},

  watch: {},

  async created() {}
};
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.full-row {
  width: 800px;
  margin-top: 30px;
  margin-bottom: 30px;
}
.table {
  width: 800px;
  margin-top: 100px;
}

.baam {
  align-self: left;
}
</style>
