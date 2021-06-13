import {apiFetch} from 'src/utils/apiWrappers'

export default {
  state: {
    hallsLoaded: false,
    hallList: []
  },
  getters: {
    hallList(state) {
      return state.hallList
    }
  },
  mutations: {
    setHalls(state, data) {
      state.hallList = data
      state.hallsLoaded = true
    }
  },
  actions: {
    loadHalls(context) {
      return new Promise((resolve, reject) => {
        if (context.state.hallsLoaded) {
          resolve()
        }
        else {
          apiFetch('/hall/list', null, 'All hall list')
            .then(response => {
              context.commit('setHalls', response.data.map(x => {
                return {
                  value: x.id,
                  label: `${x.id} - ${x.name}`
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
