import {apiFetch} from 'src/utils/apiWrappers'

export default {
  state: {
    deptListRequested: false,
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
    setDeptListRequested(state) {
      state.deptListRequested = true
    }
  },
  actions: {
    fetchDeptList(context) {
      return new Promise((resolve, reject) => {
        if (context.state.deptListRequested) {
          resolve()
        }
        else {
          context.commit('setDeptListRequested')
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
