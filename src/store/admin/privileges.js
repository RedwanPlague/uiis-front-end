import {apiFetch} from 'src/utils/apiWrappers'

export default {
  state: {
    privilegeListLoaded: false,
    privilegeList: []
  },
  getters: {
    privilegeList(state) {
      return state.privilegeList
    }
  },
  mutations: {
    setPrivilegeList(state, data) {
      state.privilegeList = data
    },
    setPrivilegeListLoaded(state) {
      state.privilegeListLoaded = true
    }
  },
  actions: {
    fetchPrivilegeList(context) {
      return new Promise((resolve, reject) => {
        if (context.state.privilegeListLoaded) {
          resolve()
        }
        else {
          context.commit('setPrivilegeListLoaded')
          apiFetch('/account/privileges', null, 'privilegeList')
            .then(response => {
              context.commit('setPrivilegeList', response.data)
              resolve(response)
            })
            .catch(error => reject(error))
        }
      })
    }
  }
}
