import {apiFetch} from 'src/utils/apiWrappers'
import {adminAPI} from 'boot/axios'

export default {
  state: {
    roleListLoaded: false,
    roleList: []
  },
  getters: {
    roleList(state) {
      return state.roleList
    }
  },
  mutations: {
    setRoleList(state, data) {
      state.roleList = data
    },
    setRoleListLoaded(state) {
      state.roleListLoaded = true
    }
  },
  actions: {
    fetchRoleList(context) {
      return new Promise((resolve, reject) => {
        if (context.state.roleListLoaded) {
          resolve()
        }
        else {
          context.commit('setRoleListLoaded')
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
