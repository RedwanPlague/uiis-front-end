<template>
  <q-page padding>
    <div v-if="isPageLoaded" class="q-pa-md">
      <q-card style="width: 500px; margin-left: auto; margin-right: auto;" bordered>
        <q-card-section>
          <div class="text-h5">View Grades</div><br />
        </q-card-section>
        <q-card-actions align="center">
          <q-btn-dropdown no-caps color="primary" label="Filter with Level/Term">
            <q-list>
              <q-item
                clickable
                class="bg-grey-2"
                v-for="semester in getAvailableSemesters"
                :key="semester.semesterID"
                v-bind="semester"
                @click.native="selectedSemester = semester; onSemesterClick();"
              >
                <q-item-section>
                  <q-item-label>Level/Term: <strong>{{ semester.level }}/{{ semester.term }}</strong></q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-card-actions><br />
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "SemesterSelectionPage",

  data() {
    return {
      isPageLoaded: false,

      /* for keeping track of selected semester */
      selectedSemester: {},

      /* for filtering results based on a certain grade */
      selectedGradeLetter: ''
    };
  },

  methods: {
    ...mapActions(['fetchStudentIDInfo', 'fetchStudentProfileInfo', 'generateAvailableSemesters', 'clearAvailableGrades']),

    onSemesterClick() {
      this.clearAvailableGrades();
      this.$router.push({ name: 'studentGrades', params: {},
        query: {
          filter: 'semester',
          level: this.selectedSemester.level,
          term: this.selectedSemester.term
        }
      });
    }
  },

  computed: mapGetters(['getID', 'getStudent', 'getAvailableSemesters']),

  async created() {
    try {
      this.$q.loading.show({
        delay: 100,
        message: 'Loading...',
        messageColor: 'white'
      });

      await this.fetchStudentIDInfo();
      await this.fetchStudentProfileInfo(this.getID.id);
      this.generateAvailableSemesters({
        level: this.getStudent.level,
        term: this.getStudent.term
      });

      this.$q.loading.hide();
      this.isPageLoaded = !this.isPageLoaded;
    } catch(error) {
      console.log(error);
    }
  }
}
</script>

<style scoped>

</style>
