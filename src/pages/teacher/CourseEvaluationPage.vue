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
          courseID: 'CourseID',
          label: 'CourseID',
          align: 'center',
          field: 'courseID',
          classes: 'bg-grey-1 ellipsis',
          headerClasses: 'bg-primary text-white'
        },
        {
          courseID: 'courseName',
          align: 'center',
          label: 'Course Name',
          field: 'courseName',
          headerClasses: 'bg-primary text-white',
          headerStyle: 'width: 200px',
        },
        { name: '', label: '', field: 'fat',  headerClasses: 'bg-primary text-white' },
      ],

      currentCourses: [
        {
          courseID: 'CSE107',
          courseName: 'Object Oriented Programming Language',
        },
        {
          courseID: 'CSE203',
          courseName: 'Data Structures and Algorithms I',
        },
        {
          courseID: 'CSE218',
          courseName: 'Numerical Methods',
        },
        {
          courseID: 'CSE218',
          courseName: 'Numerical Methods',
        },
        {
          courseID: 'CSE218',
          courseName: 'Numerical Methods',
        },
        {
          courseID: 'CSE218',
          courseName: 'Numerical Methods',
        },
      ],
      previousCourses: [
        {
          courseID: 'CSE101',
          courseName: 'Structured Programming Language',
        },
        {
          courseID: 'CSE201',
          courseName: 'Data Structures and Algorithms I',
        },
        {
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
    /*justify-content: center;*/
  }
  .table {
    width: 800px;
  }
</style>
