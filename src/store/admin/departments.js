import {apiFetch} from 'src/utils/apiWrappers'

export default {
  state: {
    departmentsLoaded: false,
    deptList: []
  },
  getters: {
    deptList(state) {
      return state.deptList
    }
  },
  mutations: {
    setDepartments(state, data) {
      state.deptList = data
      state.departmentsLoaded = true
    }
  },
  actions: {
    loadDepartments(context) {
      return new Promise((resolve, reject) => {
        if (context.state.departmentsLoaded) {
          resolve()
        }
        else {
          apiFetch('/department/list', null, 'All dept list')
            .then(response => {
              context.commit('setDepartments', response.data.map(x => {
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
