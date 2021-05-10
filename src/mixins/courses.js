import {isSubstring} from 'src/utils/patternSearch'
import apiFetch from 'src/utils/apiFetch'

export default {
  data() {
    return {
      courseOptions: [],
      courseList: []
    }
  },
  methods: {
    fetchCourseList() {
      // apiFetch('/course/list', {department: 'CSE'}).then().catch()
    },
    courseFilter(value, update) {
      if (value === '') {
        update(() => {
          this.courseOptions = this.courseList
        })
        return
      }
      update(() => {
        this.courseOptions = this.courseList.filter(x => isSubstring(x.label, value))
      })
    }
  },
  created() {
    this.fetchCourseList()
  }
}
