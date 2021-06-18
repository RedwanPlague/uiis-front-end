import {apiFetch} from 'src/utils/apiWrappers'

export default {
  state: {
    teacherListLoaded: false,
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
    setTeacherListLoaded(state) {
      state.teacherListLoaded = true
    }
  },
  actions: {
    fetchTeacherList(context) {
      return new Promise((resolve, reject) => {
        if (context.state.teacherListLoaded) {
          resolve()
        }
        else {
          context.commit('setTeacherListLoaded')
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
