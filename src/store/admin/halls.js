import {apiFetch} from 'src/utils/apiWrappers'

export default {
  state: {
    hallListLoaded: false,
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
    setHallListLoaded(state) {
      state.hallListLoaded = true
    }
  },
  actions: {
    fetchHallList(context) {
      return new Promise((resolve, reject) => {
        if (context.state.hallListLoaded) {
          resolve()
        }
        else {
          context.commit('setHallListLoaded')
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
