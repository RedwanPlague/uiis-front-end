<template>
  <q-page>
    <div class="block">
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
          <q-chip
            outline
            color="black"
            text-color="white"
            v-for="student in details.students"
            :key="student"
          >
            {{ student }}
          </q-chip>
        </div>
        <div class="full-row">
          <span class="label">Selected Audience</span>
          <span v-for="audi in audience" :key="audi.id">
            <q-chip
              outline
              color="black"
              text-color="white"
              :removable="audi.removable"
              @remove="audi.ase = false"
              v-if="audi.ase"
            >
              {{ audi.id }} - {{ audi.name }}
            </q-chip>
          </span>
        </div>
        <div>
          <q-btn-dropdown color="primary" label="Add Audience">
            <q-list>
              <q-item
                clickable
                v-for="audi in audience"
                :key="audi.id"
                v-show="!audi.ase"
                v-close-popup
                @click="audi.ase = true"
              >
                <q-item-section>
                  <q-item-label>{{ audi.id }} - {{ audi.name }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
        <div>
          <span class="baam">Description</span>
          <q-editor v-model="description" min-height="5rem" />
        </div>

        <q-btn label="Create" type="submit" color="primary" class="full-row" />
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

  props: ["details"],

  data() {
    return {
      title: "",
      description: "",
      audience: []
    };
  },

  methods: {
    async createIssue() {
      const issue = {
        courseID: this.details.courseID,
        evalType: this.details.evalType,
        part: this.details.part,
        evalOwner: this.details.evalOwner,
        title: this.title,
        description: this.description,
        allStudentSelected: this.details.allStudentSelected,
        students: this.details.students,
        teachers: this.audience.map(audi => audi.id)
      };

      await api.post(`teacher/issues/create`, issue);

      console.log("submitted");
    }
  },

  watch: {},

  async created() {
    const audience = (this.$store.getters["scrutinizer/currentCourseInfo"]).audience;

    // will be replaced with api call
    // this.audience = [
    //   {
    //     name: "teacher3",
    //     id: "t3",
    //     removable: false,
    //     ase: true
    //   },
    //   {
    //     name: "teacher2",
    //     id: "t2",
    //     removable: true,
    //     ase: false
    //   }
    // ];

    this.audience = audience.map(audi => ({
      name: audi.name,
      id: audi.id,
      removable: true, // will change when Sezan/me changes the api
      ase: false, // also will change
    }));

    this.audience.push({
      name: this.details.evalOwnerName,
      id: this.details.evalOwner,
      removable: false,
      ase: true
    });
  }
};
</script>

<style scoped>
.block {
  display: block;
  text-align: left;
}
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
