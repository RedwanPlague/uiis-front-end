import {apiFetch} from 'src/utils/apiWrappers'

export default {
  state: {
    courseListLoaded: false,
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
    setCourseListLoaded(state) {
      state.coursesLoaded = true
    }
  },
  actions: {
    fetchCourseList(context) {
      return new Promise((resolve, reject) => {
        if (context.state.coursesLoaded) {
          resolve()
        }
        else {
          context.commit('setCourseListLoaded')
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
