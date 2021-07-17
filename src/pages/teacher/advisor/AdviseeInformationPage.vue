<template>
  <q-page padding>
    <div v-if="isPageLoaded" class="q-pa-md">
      <q-card bordered>
        <q-card-section>
          <div class="row q-gutter-lg">
            <div>
              <div class="text-h5">Advisee Information</div><br />
              <div class="text-subtitle2">
                <p>
                  <strong>Student ID:</strong> {{ getStudent.id }}
                </p>
                <p>
                  <strong>Name:</strong> {{ getStudent.name }}
                </p>
                <p>
                  <strong>Level/Term:</strong> {{ getStudent.level }}/{{ getStudent.term }}
                </p>
                <p>
                  <strong>Department:</strong> {{ getStudent.department }}
                </p>
                <p>
                  <strong>Hall:</strong> {{ getStudent.hall }}
                </p>
                <p>
                  <strong>Contact Number:</strong> {{ getStudent.contactNumber }}
                </p>
                <p>
                  <strong>Email Address:</strong> {{ getStudent.email }}
                </p>
                <p>
                  <strong>Residential Address:</strong> {{ getStudent.residentialAddress }}
                </p>
              </div>
            </div>

            <q-space />

            <!-- we should be working on images -->
            <img alt="" class="profile-photo" src="https://cdn.ttgtmedia.com/rms/computerweekly/3_ImitationGame_Cumberbatch.jpg" />
          </div>
        </q-card-section>

        <q-separator /><br />

        <q-card-section>
          <div class="text-h5">View Grades</div><br />
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
                  v-for="gradeLetter in getGradeLetters"
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
          <q-btn class="bg-secondary text-white" label="Back" @click="visitSelectionPage" />
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
      isPageLoaded: false,

      /* for keeping track of selected semester */
      selectedSemester: {},

      /* for filtering results based on a certain grade */
      selectedGradeLetter: ''
    };
  },

  methods: {
    ...mapActions(['fetchStudentProfileInfo', 'generateAvailableSemesters', 'clearAvailableGrades']),

    onSemesterClick() {
      this.clearAvailableGrades();
      this.$router.push({ name: 'adviseeGrades',
        params: {
          studentID: this.getStudent.id
        },
        query: {
          filter: 'semester',
          level: this.selectedSemester.level,
          term: this.selectedSemester.term
        }
      });
    },

    onGradeClick() {
      this.clearAvailableGrades();
      this.$router.push({ name: 'adviseeGrades',
        params: {
          studentID: this.getStudent.id
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

  computed: mapGetters(['getStudent', 'getAvailableSemesters', 'getGradeLetters']),

  async created() {
    try {
      this.$q.loading.show({
        delay: 100,
        message: 'Loading...',
        messageColor: 'white'
      });

      await this.fetchStudentProfileInfo(this.$route.params.studentID);
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
  .profile-photo {
    width: 100%;
    max-width: 200px;
    height: 100%;
  }
</style>
