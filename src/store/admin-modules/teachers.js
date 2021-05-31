import {apiFetch} from 'src/utils/apiWrappers'

export default {
  state: {
    teachersLoaded: false,
    teacherList: []
  },
  getters: {
    teacherList(state) {
      return state.teacherList
    }
  },
  mutations: {
    setTeachers(state, data) {
      state.teacherList = data
      state.teachersLoaded = true
    }
  },
  actions: {
    loadTeachers(context, dept) {
      dept = null
      return new Promise((resolve, reject) => {
        if (context.state.teachersLoaded) {
          resolve()
        }
        else {
          apiFetch('account/teacher/list',
            {department: dept},
            `Teachers of ${dept ? dept : 'all'}`)
            .then(response => {
              context.commit('setTeachers', response.data.map(x => {
                return {
                  value: x.id,
                  label: `(${x.id}) ${x.name}`
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
