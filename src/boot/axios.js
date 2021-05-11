import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$axios = axios

const adminAPI = axios.create({
  baseURL: 'http://localhost:3000'
})
Vue.prototype.$adminAPI = adminAPI

export { axios, adminAPI }
