import {api} from 'boot/axios'

const state = {
  courses: []
};

const getters = {
  allCourses: (state) => state.courses
};

const actions = {
  async fetchCourses({commit}) {
    const res = await api.get('/teacher/courses');
    commit('setCourses', res.data);
  }
};

const mutations = {
  setCourses: (state, courses) => (state.courses = courses),
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
