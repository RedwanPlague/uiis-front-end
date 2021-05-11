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
      apiFetch('/course/list', null)
        .then(response => {
          this.courseList = response.data.map(x => {
            return {
              value: x.title,
              label: `${x.title}(${x.department})`
            }
          })
        }).catch()
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
