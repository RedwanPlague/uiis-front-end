import {apiFetch} from 'src/utils/apiWrappers'

export default {
  state: {
    courseListRequested: false,
    courseList: []
  },
  getters: {
    courseList(state) {
      return state.courseList
    }
  },
  mutations: {
    setCourseList(state, data) {
      state.courseList = data
    },
    setCourseListRequested(state) {
      state.coursesRequested = true
    }
  },
  actions: {
    fetchCourseList(context) {
      return new Promise((resolve, reject) => {
        if (context.state.coursesRequested) {
          resolve()
        }
        else {
          context.commit('setCourseListRequested')
          apiFetch('/course/list', null, 'courseList')
            .then(response => {
              context.commit('setCourseList', response.data)
              resolve(response)
            })
            .catch(error => reject(error))
        }
      })
    }
  }
}
