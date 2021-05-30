<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-card bordered>
        <q-card-section>
          <div class="text-h5">View Grade Statistics</div><br />
          <div class="text-subtitle2">
            <p>
              <strong>Student ID: </strong>{{ getAdvisee.id }}
            </p>
            <p>
              <strong>Name:</strong> {{ getAdvisee.name }}
            </p>
            <p>
              <strong>Current Level/Term:</strong> {{ getAdvisee.level }}/{{ getAdvisee.term }}
            </p>
            <p>
              <strong>Department:</strong> {{ getAdvisee.department }}
            </p>
          </div>
        </q-card-section>

        <q-separator /><br />

        <q-card-actions align="center">
          <q-btn-dropdown no-caps color="primary" label="Select Level/Term">
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

        <q-card-actions align="center">
          <q-btn-dropdown no-caps color="primary" label="Filter with Grade">
            <q-list>
              <q-item
                clickable
                class="bg-grey-2"
                v-for="grade in grades"
                :key="grade"
                v-bind="grade"
                @click.native="selectedGrade = grade; onGradeClick();"
              >
                <q-item-section>
                  <q-item-label>Grade: <strong>{{ grade }}</strong></q-item-label>
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
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "AdviseeSemesterSelectionPage",

  data() {
    return {
      /* for keeping track of selected semester */
      selectedSemester: {},

      /* for filtering results based on a certain grade */
      grades: ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'D', 'F'],
      selectedGrade: ''
    };
  },

  methods: {
    ...mapActions(['fetchAdvisee', 'generateAvailableSemesters']),

    onSemesterClick() {
      this.$router.push({ name: 'adviseeGrades',
        params: {
          studentID: this.getAdvisee.id
        },
        query: {
          filter: 'semester',
          level: this.selectedSemester.level,
          term: this.selectedSemester.term
        }
      });
    },

    onGradeClick() {
      this.$router.push({ name: 'adviseeGrades',
        params: {
          studentID: this.getAdvisee.id
        },
        query: {
          filter: 'grade',
          gradeLetter: this.selectedGrade
        }
      });
    },

    visitInformationPage() {
      this.$router.push({ name: 'adviseeInfo', params: {}, query: {} });
    }
  },

  computed: mapGetters(['getAdvisee', 'getAvailableSemesters']),

  async created() {
    try {
      await this.fetchAdvisee(this.$route.params.studentID);
      this.generateAvailableSemesters({
        level: this.getAdvisee.level,
        term: this.getAdvisee.term
      });
    } catch(error) {
      console.log(error);
    }
  }
}
</script>

<style scoped>

</style>
