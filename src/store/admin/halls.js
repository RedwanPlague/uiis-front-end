import {apiFetch} from 'src/utils/apiWrappers'

export default {
  state: {
    hallListRequested: false,
    hallList: []
  },
  getters: {
    hallList(state) {
      return state.hallList
    }
  },
  mutations: {
    setHallList(state, data) {
      state.hallList = data
    },
    setHallListRequested(state) {
      state.hallListRequested = true
    }
  },
  actions: {
    fetchHallList(context) {
      return new Promise((resolve, reject) => {
        if (context.state.hallListRequested) {
          resolve()
        }
        else {
          context.commit('setHallListRequested')
          apiFetch('/hall/list', null, 'hallList')
            .then(response => {
              context.commit('setHallList', response.data)
              resolve(response)
            })
            .catch(error => reject(error))
        }
      })
    }
  }
}
