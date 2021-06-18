import {apiFetch} from 'src/utils/apiWrappers'

export default {
  state: {
    teacherListRequested: false,
    teacherList: []
  },
  getters: {
    teacherList(state) {
      return state.teacherList
    }
  },
  mutations: {
    setTeacherList(state, data) {
      state.teacherList = data
    },
    setTeacherListRequested(state) {
      state.teacherListRequested = true
    }
  },
  actions: {
    fetchTeacherList(context) {
      return new Promise((resolve, reject) => {
        if (context.state.teacherListRequested) {
          resolve()
        }
        else {
          context.commit('setTeacherListRequested')
          apiFetch('account/teacher/list', null, 'teacherList')
            .then(response => {
              context.commit('setTeacherList', response.data)
              resolve(response)
            })
            .catch(error => reject(error))
        }
      })
    }
  }
}
