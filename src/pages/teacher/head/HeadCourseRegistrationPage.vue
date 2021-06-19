<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-card bordered>
        <q-card-section>
          <div class="text-h5">
            <p>Course Registration Applications</p>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <q-list
            v-for="advisor in getUniqueAdvisors"
            :key="advisor"
            v-bind="advisor"
          >
            <q-item>
              <q-table
                :title="getStudents.filter(student => student.advisor._id === advisor)[0].advisor.name"
                dense bordered
                :data="getStudents.filter(student => student.advisor._id === advisor)"
                :columns="applicationColumns"
                row-key="id"
                selection="multiple"
                :selected.sync="selected"
                separator="cell"
                @row-click="onRowClick"
                class="full-width"
              />
            </q-item>
          </q-list>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn class="bg-positive text-white" label="Approve" @click="approve" />
          <q-btn class="bg-negative text-white" label="Reject" @click="reject" />
        </q-card-actions>
      </q-card>

      <q-dialog v-model="courseRegistrationInfoDialogBox" full-width>
        <q-card bordered>
          <q-card-section>
            <div class="row q-gutter-lg">
              <div>
                <div class="text-h5">Course Registration Information</div><br />
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
                    <strong>Course Registration Status:</strong> {{ getStudent.status }}
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
            <q-table
              title="Courses Available"
              dense bordered
              :data="courseRegistrations"
              :columns="getRegistrationColumns"
              row-key="courseID"
              separator="cell"
            />
          </q-card-section>

          <q-card-actions align="right">
            <q-btn class="bg-secondary text-white" label="Back" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { api } from "boot/axios";

export default {
  name: "HeadCourseRegistrationPage",

  data() {
    return {
      /* for displaying selected student's course registration information */
      courseRegistrations: [],
      courseRegistrationInfoDialogBox: false,

      /* course registration application columns for tabulation purpose */
      applicationColumns: [
        {
          name: 'id',
          required: true,
          label: 'Student ID',
          align: 'left',
          field: row => row.id,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'name',
          align: 'left',
          label: 'Name',
          field: 'name',
          sortable: true
        },
        {
          name: 'level',
          align: 'left',
          label: 'Level',
          field: 'level',
          sortable: true
        },
        {
          name: 'term',
          align: 'left',
          label: 'Term',
          field: 'term',
          sortable: true
        }
      ],

      /* for multiple students selection in course registrations table */
      selected: []
    };
  },

  methods: {
    ...mapActions(['fetchStudents', 'generateUniqueAdvisors', 'fetchStudentProfileInfo', 'fetchCourseRegistrations']),

    generateCourseRegistrations() {
      this.courseRegistrations = [];

      for(let i=0; i<this.getCourseRegistrations.length; i++) {
        this.courseRegistrations[i] = {
          courseID: this.getCourseRegistrations[i].courseSession.course.courseID,
          syllabusID: this.getCourseRegistrations[i].courseSession.course.syllabusID,
          title: this.getCourseRegistrations[i].courseSession.course.title,
          credit: this.getCourseRegistrations[i].courseSession.course.credit,
          status: this.getCourseRegistrations[i].status
        };
      }
    },

    async onRowClick(event, row) {
      try {
        await this.fetchStudentProfileInfo(row.id);
        this.courseRegistrations = [];
        this.courseRegistrationInfoDialogBox = true;

        await this.fetchCourseRegistrations({
          id: row.id,
          level: row.level,
          term: row.term
        });
        this.generateCourseRegistrations();
      } catch(error) {
        console.log(error);
      }
    },

    /* approving course registration application */
    async approve() {
      try {
        if(this.selected.length === 0) {
          this.$q.notify({
            message: 'No student selected.',
            position: "bottom-left",
            color: 'warning',
            icon: 'warning'
          });
        } else {
          const loading = this.$q.notify({
            message: `Approving applications.`,
            position: "bottom-left",
            color: 'info',
            group: false,
            timeout: 0,
            spinner: true
          });

          await api.patch('/teacher/head/registrations/approve', {
            _id: this.selected.map(selectedStudent => selectedStudent.id)
          });
          await api.patch('/student/registrations/course_registered', {
            _id: this.selected.map(selectedStudent => selectedStudent.id)
          });
          await this.fetchStudents();
          this.generateUniqueAdvisors();

          this.selected = [];

          loading({
            message: 'Application approved.',
            color: 'positive',
            icon: 'done',
            timeout: 1500,
            spinner: false
          });
        }
      } catch(error) {
        console.log(error);
      }
    },

    /* rejecting course registration application */
    async reject() {
      try {
        if(this.selected.length === 0) {
          this.$q.notify({
            message: 'No student selected.',
            position: "bottom-left",
            color: 'warning',
            icon: 'warning'
          });
        } else {
          const loading = this.$q.notify({
            message: `Rejecting applications back to advisors.`,
            position: "bottom-left",
            color: 'info',
            group: false,
            timeout: 0,
            spinner: true
          });

          await api.patch('/teacher/head/registrations/reject', {
            _id: this.selected.map(selectedStudent => selectedStudent.id)
          });
          await this.fetchStudents();
          this.generateUniqueAdvisors();

          this.selected = [];

          loading({
            message: 'Application rejected.',
            color: 'positive',
            icon: 'done',
            timeout: 1500,
            spinner: false
          });
        }
      } catch(error) {
        console.log(error);
      }
    }
  },

  computed: mapGetters(['getStudents', 'getUniqueAdvisors', 'getStudent', 'getCourseRegistrations', 'getRegistrationColumns']),

  async created() {
    try {
      await this.fetchStudents();
      this.generateUniqueAdvisors();
    } catch(error) {
      console.log(error);
    }
  }
};
</script>

<style scoped>
  .profile-photo {
    width: 100%;
    max-width: 200px;
    height: 100%;
  }
</style>
