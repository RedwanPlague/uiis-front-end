<template>
  <q-page  class="container" v-show="pageLoaded">
    <div class="q-pa-md table">
      <q-table
        title="Current Courses"
        :data="allCourses.currentCourseSessions"
        :columns="columns"
        row-key="courseID"
        separator="cell"
        :pagination.sync="pagination"
        :filter="currentCourseFilter"
        @row-click="onRowClick"
        :hide-bottom="allCourses.currentCourseSessions && allCourses.currentCourseSessions.length > 0"
      >
        <template v-slot:top-right>
          <q-input outlined dense debounce="300" v-model="currentCourseFilter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search" ></q-icon>
            </template>
          </q-input>
        </template>
      </q-table>
    </div>

    <div class="q-pa-md table">
      <q-table
        title="Previous Courses"
        :data="allCourses.previousCourseSessions"
        :columns="columns"
        row-key="courseID"
        separator="cell"
        :pagination.sync="pagination"
        :filter="previousCourseFilter"
        @row-click="onRowClick"
        :hide-bottom="allCourses.previousCourseSessions && allCourses.previousCourseSessions.length > 0"
      >

        <template v-slot:top-right >
          <q-input outlined dense debounce="300" v-model="previousCourseFilter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search" ></q-icon>
            </template>
          </q-input>
        </template>


      </q-table>
    </div>
  </q-page>
</template>

<script>

  import {createNamespacedHelpers} from 'vuex';
  const {mapGetters, mapActions} = createNamespacedHelpers('courses');

export default {
  name: "ClassPage",
  data () {
    return {
      pageLoaded: '',

      currentCourseFilter: '',
      previousCourseFilter: '',
      pagination: {
        page: 1,
        rowsPerPage: 0 // 0 means all rows
      },
      columns: [
        {
          name: 'courseSession',
          label: 'Session',
          align: 'center',
          field: 'session',
          classes: 'bg-grey-1 ellipsis',
          headerClasses: 'bg-primary text-white',
          style: 'width: 200px',
          sortable: true,
        },
        {
          name: 'courseID',
          label: 'Course ID',
          align: 'center',
          field: 'courseID',
          classes: 'bg-grey-1 ellipsis',
          headerClasses: 'bg-primary text-white',
          style: 'width: 200px',
          sortable: true
        },
        {
          name: 'courseName',
          align: 'center',
          label: 'Course Name',
          field: 'title',
          headerClasses: 'bg-primary text-white',
          headerStyle: 'width: 400px',
          sortable: true
        },
      ],
    }
  },
  methods : {
    onRowClick(evt, row) {

      this.$router.push( {
        name: 'course_page',
        params: {
          courseID: row.courseID ,
          courseSession: row.session,
          courseName: row.courseName
        }});
    },
    ...mapActions(['fetchCourses']),
  },
  async created() {
    this.pageLoaded = false;
    this.$q.loading.show({
      delay: 100,
      message: 'Loading...',
      messageColor: 'white'
    });
    await this.fetchCourses();
    this.$q.loading.hide();
    this.pageLoaded = true;
  },
  computed: {
    ...mapGetters(['allCourses']),
  }
};
</script>

<style scoped>
  .container {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .table {
    width: 800px;
    margin-top: 30px;
  }
</style>
