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
    const res = await api.get('/teacher/courses', {
      headers: {
        Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJ0MSIsImlhdCI6MTYyMjEyMDQyOH0.d7VMrLXp8EObxf6-i43FRcTnUxqI9RqTUDrVK3r_9Sw"
      }
    });
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
