<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-card bordered>
        <q-card-section>
          <div class="text-h5">View Grade Statistics</div><br />
          <div class="text-subtitle2"><strong>Student ID: </strong>{{ this.$route.params.id }}</div>
        </q-card-section>

        <q-separator /><br />

        <q-card-actions align="center">
          <q-btn-dropdown no-caps color="primary" label="Select a Level/Term">
            <q-list>
              <q-item
                clickable
                class="bg-grey-2"
                v-for="semester in availableSemesters"
                :key="semester.semesterID"
                v-bind="semester"
                @click.native="selectedSemester = semester; onItemClick();"
              >
                <q-item-section>
                  <q-item-label>Level/Term: <strong>{{ semester.level }}/{{ semester.term }}</strong></q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-card-actions><br />

        <q-card-actions align="right">
          <q-btn flat class="bg-primary text-white" label="Back" @click="visitInformationPage" />
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "AdviseeSemesterSelectionPage",

  data() {
    return {
      /* available semesters */
      availableSemesters: [],

      /* for keeping track of selected semester */
      selectedSemester: {}
    };
  },

  methods: {
    onItemClick() {
      this.$router.push({ name: 'adviseeGrades', params: {
        id: this.$route.params.id,
        level: this.$route.params.level,
        term: this.$route.params.term
      }});
    },

    visitInformationPage() {
      this.$router.push({ name: 'adviseeInfo', params: {}});
    }
  },

  created() {
    let availableSemesterCount = (this.$route.query.level-1)*2+this.$route.query.term-1;

    for(let i=0; i<availableSemesterCount; i++) {
      this.availableSemesters[i] = {
        semesterID: i+1,
        level: Math.floor(i/2)+1,
        term: i%2+1
      };
    }
  }
}
</script>

<style scoped>

</style>
