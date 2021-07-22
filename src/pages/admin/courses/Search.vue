<template>
  <q-page padding>
    <div class="text-h5 q-my-md">
      Search New Course
    </div>
    <q-form class="row q-col-gutter-md" @submit="searchCourse" @reset="resetForm">
      <q-input
        class="col-6"
        v-model="syllabusID"
        label="Syllabus ID"
        outlined
        :rules="[() => !!columns || 'Dummy Text']"
      />
      <q-input
        class="col-6"
        v-model="courseID"
        label="Course ID"
        outlined
        :rules="[() => !!columns || 'Dummy Text']"
      />
      <department-picker
        classes="col-6"
        label="Department (offered to)"
        v-model="offeredToDepartment"
      />
      <department-picker
        classes="col-6"
        label="Department (offered from)"
        v-model="offeredByDepartment"
      />
      <q-input
        class="col-12"
        v-model="title"
        label="Title"
        outlined
        :rules="[() => !!columns || 'Dummy Text']"
      />
      <q-input
        class="col-3"
        v-model="level"
        label="Level"
        outlined
        :rules="[() => !!columns || 'Dummy Text']"
      />
      <q-input
        class="col-3"
        v-model="term"
        label="Term"
        outlined
        :rules="[() => !!columns || 'Dummy Text']"
      />
      <q-input
        class="col-3"
        v-model="creditMin"
        label="Credit Min"
        type="number"
        min="0"
        step="0.25"
        outlined
        :rules="[() => !!columns || 'Dummy Text']"
      />
      <q-input
        class="col-3"
        v-model="creditMax"
        label="Credit Max"
        type="number"
        min="0"
        step="0.25"
        outlined
        :rules="[() => !!columns || 'Dummy Text']"
      />
      <div class="col-12">
        <q-btn label="Search" type="submit" color="primary" unelevated/>
        <q-btn label="Reset" type="reset" color="primary" flat/>
      </div>
    </q-form>
    <div v-if="showResults" class="q-mt-lg">
      <q-table
        title="Results"
        :data="tableData"
        :columns="columns"
        flat
        @row-click="onRowClick"
        wrap-cells
      />
    </div>
    <div style="min-height: 200px"></div>
    <q-inner-loading :showing="searchLoading"/>
  </q-page>
</template>

<script>
import DepartmentPicker from 'components/FormElements/DepartmentPicker'
import search from 'src/mixins/search'
import columnMerger from 'src/utils/columnMerger'
import {extract} from 'src/utils/apiDataPreProcessor'

const columns = [
  {name: 'courseID', label: 'Course ID', field: 'courseID', align: 'left', style: 'width: 10%'},
  {name: 'syllabusID', label: 'Syllabus ID', field: 'syllabusID', align: 'center'},
  {name: 'title', label: 'Title', field: 'title', align: 'center'},
  {name: 'lt', label: 'Level/Term', field: 'lt', align: 'center', sortable: true,
    format: (val, row) => row.level + '-' + row.term},
  {name: 'credit', label: 'Credit', field: 'credit', sortable: true, format: val => val.toFixed(2)},
]
const commonAttr = {
  style: 'font-size: 1.05em;', headerStyle: 'font-size: 1.05em;'
}
columnMerger(columns, commonAttr)

export default {
  name: 'CourseSearch',
  title: 'Search for Courses',
  components: {
    DepartmentPicker
  },
  mixins: [
    search
  ],
  data() {
    return {
      title: null,
      courseID: null,
      syllabusID: null,
      offeredByDepartment: null,
      offeredToDepartment: null,
      level: null,
      term: null,
      creditMin: null,
      creditMax: null,
      columns
    }
  },
  methods: {
    searchCourse() {
      this.callSearchApi('/course/list', {
        title: this.title,
        courseID: this.courseID,
        syllabusID: this.syllabusID,
        offeredToDepartment: extract(this.offeredToDepartment),
        offeredByDepartment: extract(this.offeredByDepartment),
        level: this.level,
        term: this.term,
        creditMin: this.creditMin,
        creditMax: this.creditMax,
      }, 'Course')
    },
    resetForm() {
      this.title = null
      this.courseID = null
      this.syllabusID = null
      this.offeredByDepartment = null
      this.offeredToDepartment = null
      this.level = null
      this.term = null
      this.creditMin = null
      this.creditMax = null
    },
    onRowClick(event, row) {
      const routeData = this.$router.resolve({
        name: 'AdminCourseEditPage',
        params: {
          courseID: row.courseID,
          syllabusID: row.syllabusID
        }
      })
      window.open(routeData.href, '_blank')
    },
  },
  // watch: {
  //   $route(to/*, from*/) {
  //     if (to.name === 'AdminCourseSearchPage') {
  //       this.searchCourse()
  //     }
  //   }
  // }
}
</script>
