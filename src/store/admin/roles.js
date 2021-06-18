import {apiFetch} from 'src/utils/apiWrappers'

export default {
  state: {
    roleListRequested: false,
    roleListLoading: false,
    roleList: []
  },
  getters: {
    roleList(state) {
      return state.roleList
    },
    roleListLoading(state) {
      return state.roleListLoading
    }
  },
  mutations: {
    setRoleList(state, data) {
      state.roleList = data
      state.roleListLoading = false
    },
    setRoleListRequested(state) {
      state.roleListRequested = true
      state.roleListLoading = true
    }
  },
  actions: {
    fetchRoleList(context) {
      return new Promise((resolve, reject) => {
        if (context.state.roleListRequested) {
          resolve()
        }
        else {
          context.commit('setRoleListRequested')
          apiFetch('/role/list', null, 'roleList')
            .then(response => {
              context.commit('setRoleList', response.data)
              resolve(response)
            })
            .catch(error => reject(error))
        }
      })
    }
  }
}
