import {apiFetch} from 'src/utils/apiWrappers'

export default {
  state: {
    deptListLoaded: false,
    deptList: []
  },
  getters: {
    deptList(state) {
      return state.deptList
    }
  },
  mutations: {
    setDeptList(state, data) {
      state.deptList = data
    },
    setDeptListLoaded(state) {
      state.deptListLoaded = true
    }
  },
  actions: {
    fetchDeptList(context) {
      return new Promise((resolve, reject) => {
        if (context.state.deptListLoaded) {
          resolve()
        }
        else {
          context.commit('setDeptListLoaded')
          apiFetch('/department/list', null, 'deptList')
            .then(response => {
              context.commit('setDeptList', response.data)
              resolve(response)
            })
            .catch(error => reject(error))
        }
      })
    }
  }
}
