<template>
  <div class="block">
    <h5>
      Create New Issue
      <q-btn
        color="grey"
        round
        flat
        dense
        :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
        @click="onClick"
      />
    </h5>
    <div v-show="expanded">
      <q-form @submit="createIssue">
        <q-input
          class="full-row"
          filled
          label="Title"
          v-model="title"
        ></q-input>
        <div class="full-row">
          <span class="label q-mr-md">Selected Students:</span>
          <q-chip
            outline
            color="black"
            text-color="white"
            square
            v-for="student in details.students"
            :key="student"
          >
            {{ student }}
          </q-chip>
          <span v-if="details.students.length === 0">None</span>
        </div>
        <div class="full-row">
          <span class="label q-mr-md">Selected Audience:</span>
          <span v-for="audi in audience" :key="audi.id">
            <q-chip
              outline
              color="black"
              text-color="white"
              square
              :removable="audi.removable"
              @remove="audi.ase = false"
              v-if="audi.ase"
            >
              {{ audi.id }} - {{ audi.name }}
            </q-chip>
          </span>
        </div>
        <div>
          <q-btn-dropdown color="primary" label="Add Audience" no-caps>
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
        <div class="q-mt-xl">
          <span class="baam label">Add description:</span>
          <q-editor v-model="description" min-height="5rem" />
        </div>

        <div class="row justify-center">
          <div>
            <q-btn
              label="Create"
              type="submit"
              color="primary"
              no-caps
              :disable="!details.students.length || !title"
              class="q-mt-xl"
            >
            </q-btn>
            <q-tooltip
              v-if="!details.students.length || !title"
              :content-style="{ 'font-size': '14px' }"
            >
              {{ tooltipMsg }}
            </q-tooltip>
          </div>
        </div>
      </q-form>
    </div>
  </div>
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
      audience: [],
      expanded: false
    };
  },

  methods: {

    onClick() {
      this.expanded = !this.expanded;
    },

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
        teachers: this.audience.filter(audi => audi.ase).map(audi => audi.id)
      };

      const notif = this.$q.notify({
        spinner: true,
        message: "Creating",
        group: false, // required to be updatable
        timeout: 0, // we want to be in control when it gets dismissed,
        position: "bottom-left"
      });

      await api.post(`teacher/issues/create`, issue);

      notif({
        icon: "done",
        message: "Created!",
        position: "bottom-left",
        spinner: false,
        timeout: 1500
      });
    }
  },

  watch: {
    expanded(to) {
      this.$emit("barbe", this.expanded);
    }
  },

  async created() {
    const audience = this.$store.getters["scrutinizer/currentCourseInfo"]
      .audience;

    this.audience = audience.map(audi => ({
      name: audi.name,
      id: audi.id,
      removable: true, // will change when Sezan/me changes the api
      ase: false // also will change
    }));

    this.audience.push({
      name: this.details.evalOwnerName,
      id: this.details.evalOwner,
      removable: false,
      ase: true
    });

    const nije = this.$store.getters["user"];

    const ald = this.audience.find(audi => audi.id === nije.id);
    if (!ald) {
      console.log("hemlo");
      this.audience.push({
        name: nije.name,
        id: nije.id,
        removable: false,
        ase: true
      });
    } else console.log("bemlo");
  },

  computed: {
    tooltipMsg() {
      if (this.details.students.length == 0 && !this.title)
        return "Please add a title and select at least one student";
      if (this.details.students.length == 0)
        return "Please select at least one student";
      if (!this.title) return "Please add a title";
      return "";
    }
  }
};
</script>

<style scoped>
.label {
  font-size: 14px;
  font-weight: bold;
}
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

.tool {
  font-size: 19px;
}
</style>
