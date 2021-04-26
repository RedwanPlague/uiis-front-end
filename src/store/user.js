import {api} from "boot/axios";
import {LocalStorage} from "quasar";

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
    userHasPrivilege(state) {
      return (privilegeName) => state.loggedIn &&
        state.user.hasOwnProperty('privilegeList') &&
        state.user.privilegeList.includes(privilegeName)
    },
  },
  mutations: {
    userLogIn(state, data) {
      state.user = data.user
      state.loggedIn = true
      LocalStorage.set('authToken', data.token)
      api.defaults.headers.common['Authorization'] = data.token
    },
    userLogOut(state) {
      state.user = {}
      state.loggedIn = false
      LocalStorage.remove('authToken')
      delete api.defaults.headers.common['Authorization']
      // api.setHeader('Authorization', null)
    }
  },
  actions: {
    userLogIn(context, data) {
      return new Promise((resolve, reject) => {
        api.post('/login', data)
          .then(response => {
            context.commit('userLogIn', response.data)
            resolve(response.data.user)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    userTryAutoLogIn(context) {
      return new Promise((resolve, reject) => {
        if (LocalStorage.has('authToken')) {
          api.defaults.headers.common['Authorization'] = LocalStorage.getItem('authToken')
          api.post('/auto-login')
            .then(response => {
              context.commit('userLogIn', response.data)
              resolve(response)
            })
            .catch(() => {
              context.commit('userLogOut')
              reject()
            })
        }
        else {
          reject()
        }
      })
    },
    userLogOut(context) {
      api.post('/logout')
        .then(() => {
          console.log('Logout completed')
        })
        .catch(() => {
          console.log('Logout failed')
        })
      context.commit('userLogOut')
    }
  }
}
