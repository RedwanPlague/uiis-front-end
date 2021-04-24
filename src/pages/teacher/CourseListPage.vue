<template>
  <q-page  class="container">
    <div class="q-pa-md table">
      <q-table
        title="Current Courses"
        :data="currentCourses"
        :columns="columns"
        row-key="courseID"
        separator="cell"
        :pagination.sync="pagination"
        :filter="currentCourseFilter"
        @row-click="onRowClick"
      >
        <template v-slot:top-right>
          <q-input  dense debounce="300" v-model="currentCourseFilter" placeholder="Search">
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
        :data="previousCourses"
        :columns="columns"
        row-key="courseID"
        separator="cell"
        :pagination.sync="pagination"
        :filter="previousCourseFilter"
        @row-click="onRowClick"
      >

        <template v-slot:top-right >
          <q-input dense debounce="300" v-model="previousCourseFilter" placeholder="Search">
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
export default {
  name: "ClassPage",
  methods : {
    onRowClick(evt, row) {
      this.$router.push({ name: 'course_page', params: { courseID: row.courseID , courseSession: row.session, courseName: row.courseName}});
    }
  },
  data () {
    return {
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
          to: '/teacher/advisor/advisee_result'
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
          field: 'courseName',
          headerClasses: 'bg-primary text-white',
          headerStyle: 'width: 400px',
          sortable: true
        },
      ],

      currentCourses: [
        {
          session: 'January 2021',
          courseID: 'CSE107',
          courseName: 'Object Oriented Programming Language',
          to: '/teacher/advisor/advisee_result'
        },
        {
          session: 'January 2021',
          courseID: 'CSE203',
          courseName: 'Data Structures and Algorithms I',
        },
        {
          session: 'January 2021',
          courseID: 'CSE218',
          courseName: 'Numerical Methods',
        },
        {
          session: 'January 2021',
          courseID: 'CSE219',
          courseName: 'Numerical Methods',
        },
      ],
      previousCourses: [
        {
          session: 'January 2020',
          courseID: 'CSE101',
          courseName: 'Structured Programming Language',
        },
        {
          session: 'January 2019',
          courseID: 'CSE201',
          courseName: 'Data Structures and Algorithms I',
        },
        {
          session: 'January 2020',
          courseID: 'CSE211',
          courseName: 'Numerical Methods',
        },
      ]
    }
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
  }
</style>
