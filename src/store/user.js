export default {
  state: {
    loggedIn: false,
    user: {}
  },
  getters: {
    userIsLoggedIn(state) {
      return state.loggedIn
    },
    user(state) {
      return state.user
    },
    userHas(state) {
      return (privilegeName) => state.loggedIn && state.user.privilegeList.includes(privilegeName)
    }
  },
  mutations: {
    userLogIn(state, user) {
      state.user = user
      state.loggedIn = true
    },
    userLogOut(state) {
      state.user = {}
      state.loggedIn = false
    }
  },
  actions: {
    userLogIn(context, data) {
      // use data to get user from DB
      const user = {
        name: 'John Doe',
        ...data,
        privilegeList: [
          'Create Account',
          'Create Due'
        ]
      }
      context.commit('userLogIn', user)
    },
    userLogOut(context) {
      context.commit('userLogOut')
    }
  }
}
