export default {
  namespaced: true,
  state: {
    loaded: false,
    allPrivileges: []
  },
  getters: {
    allPrivileges(state) {
      return state.allPrivileges
    }
  },
  mutations: {
    setAllPrivileges(state, list) {
      state.allPrivileges = list
      state.loaded = true
    },
  },
  actions: {
    fetchAllPrivileges(context) {
      if (!context.state.loaded) {
        const allPrivileges = [
          'Create Account',
          'Edit Account',
          'Create Due',
          'Create Scholarship',
        ]
        context.commit('setAllPrivileges', allPrivileges)
      }
    }
  }
}
