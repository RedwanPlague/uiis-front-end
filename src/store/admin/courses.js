import {apiFetch} from 'src/utils/apiWrappers'

export default {
  state: {
    coursesLoaded: false,
    courseList: []
  },
  getters: {
    courseList(state) {
      return state.courseList
    }
  },
  mutations: {
    setCourses(state, data) {
      state.courseList = data
      state.coursesLoaded = true
    }
  },
  actions: {
    loadCourses(context) {
      return new Promise((resolve, reject) => {
        if (context.state.coursesLoaded) {
          resolve()
        }
        else {
          apiFetch('/course/list', null, 'All course list')
            .then(response => {
              context.commit('setCourses', response.data.map(x => {
                return {
                  value: x.id,
                  label: `${x.id} - ${x.name}`
                }
              }))
              resolve(response)
            })
            .catch(error => reject(error))
        }
      })
    }
  }
}
