import {adminAPI, api} from "boot/axios";
import {LocalStorage} from "quasar";

const setApiToken = (token) => {
  adminAPI.defaults.headers.common['Authorization'] = 'Bearer ' + token
  api.defaults.headers.common['Authorization'] = 'Bearer ' + token
}

const removeApiToken = () => {
  delete adminAPI.defaults.headers.common['Authorization']
  delete api.defaults.headers.common['Authorization']
  // adminAPI.setHeader('Authorization', null)
}

export default {
  state: {
    user: null
  },
  getters: {
    user(state) {
      return state.user
    },
    userHasPrivilege(state) {
      return (privilegeName) => !!state.user &&
        state.user.mergedPrivileges.includes(privilegeName)
    },
  },
  mutations: {
    userLogIn(state, data) {
      state.user = data.user
      state.user.mergedPrivileges = data.mergedPrivileges
      LocalStorage.set('authToken', data.token)
      setApiToken(data.token)
    },
    userLogOut(state) {
      state.user = null
      LocalStorage.remove('authToken')
      removeApiToken()
    }
  },
  actions: {
    userLogIn(context, data) {
      return new Promise((resolve, reject) => {
        adminAPI.post('/account/login', data)
          .then(response => {
            console.log('Login successful')
            console.log(response)
            context.commit('userLogIn', response.data)
            resolve(response.data.user)
          })
          .catch(error => {
            console.log('Login failed')
            console.log(error.response)
            reject(error)
          })
      })
    },
    userTryAutoLogIn(context) {
      return new Promise((resolve, reject) => {
        if (LocalStorage.has('authToken')) {
          const token = LocalStorage.getItem('authToken')
          setApiToken(token)
          adminAPI.post('/account/auto-login')
            .then(response => {
              console.log('Auto Login successful')
              console.log(response)
              response.data.token = token
              context.commit('userLogIn', response.data)
              resolve(response)
            })
            .catch(error => {
              console.log('Auto Login failed')
              console.log(error.response)
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
      adminAPI.post('/account/logout')
        .then(response => {
          console.log('Logout successful')
          console.log(response)
        })
        .catch(error => {
          console.log('Logout failed')
          console.log(error.response)
        })
      context.commit('userLogOut')
    }
  }
}
