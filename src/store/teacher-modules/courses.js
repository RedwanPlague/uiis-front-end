import axios from "axios";
import {api} from 'boot/axios'

const state = {
  courses: []
};

const getters = {
  allCourses: (state) => state.courses
};

const actions = {
  async fetchCourses({commit}) {
    const res = await api.get('/courseList');

    console.log(res.data);
    commit('setCourses', res.data);
  }
};

const mutations = {
  setCourses: (state, courses) => (state.courses = courses),
};

export default {
  state,
  getters,
  actions,
  mutations
};
