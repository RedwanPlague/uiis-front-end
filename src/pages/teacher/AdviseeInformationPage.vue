<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-card bordered>
        <q-card-section>
          <div class="row q-gutter-lg">
            <div>
              <div class="text-h5">Advisee Information</div><br />
              <div class="text-subtitle2">
                <p>
                  <strong>Student ID:</strong> {{ getAdvisee.id }}
                </p>
                <p>
                  <strong>Name:</strong> {{ getAdvisee.name }}
                </p>
                <p>
                  <strong>Level/Term:</strong> {{ getAdvisee.level }}/{{ getAdvisee.term }}
                </p>
                <p>
                  <strong>Department:</strong> {{ getAdvisee.department }}
                </p>
                <p>
                  <strong>Contact Number:</strong> {{ getAdvisee.contactNumber }}
                </p>
                <p>
                  <strong>Email Address:</strong> {{ getAdvisee.email }}
                </p>
              </div>
            </div>

            <q-space />

            <!-- we should be working on images -->
            <img alt="" class="profile-photo" src="https://discourse.disneyheroesgame.com/uploads/default/original/3X/c/2/c23f54aea2065f106e4dbb8218d0ce2d7853351c.png" />
          </div>
        </q-card-section>

        <q-separator /><br />

        <q-card-section>
          <div class="text-h5">View Grade Statistics</div><br />
        </q-card-section>
        <q-card-actions align="center">
          <div class="row q-gutter-lg">
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

            <q-btn-dropdown no-caps color="primary" label="Filter with GradeLetter">
              <q-list>
                <q-item
                  clickable
                  class="bg-grey-2"
                  v-for="gradeLetter in gradeLetters"
                  :key="gradeLetter"
                  v-bind="gradeLetter"
                  @click.native="selectedGradeLetter = gradeLetter; onGradeClick();"
                >
                  <q-item-section>
                    <q-item-label>Grade: <strong>{{ gradeLetter }}</strong></q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </div>
        </q-card-actions><br />

        <q-card-actions>
          <q-space />
          <q-btn class="bg-primary text-white" label="Back" @click="visitSelectionPage" />
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "AdviseeInformationPage",

  data() {
    return {
      /* for keeping track of selected semester */
      selectedSemester: {},

      /* for filtering results based on a certain grade */
      gradeLetters: ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'D', 'F'],
      selectedGradeLetter: ''
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
          gradeLetter: this.selectedGradeLetter
        }
      });
    },

    visitSelectionPage() {
      this.$router.push({ name: 'adviseeSelection', params: {}, query: {} });
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
  .profile-photo {
    width: 100%;
    max-width: 200px;
    height: 100%;
  }
</style>
