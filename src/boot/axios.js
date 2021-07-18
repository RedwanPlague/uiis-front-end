import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$axios = axios

const api = axios.create({ baseURL: 'http://localhost:3000/' })
const adminAPI = axios.create({
  baseURL: 'http://localhost:3000'
  // baseURL: 'https://uiis-back-end.redwanplague.repl.co'
})
Vue.prototype.$api = api
Vue.prototype.$adminAPI = adminAPI

export { axios, adminAPI, api }
