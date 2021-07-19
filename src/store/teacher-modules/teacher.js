import { api } from "boot/axios";

const state = {
  teacher: {}
};

const getters = {
  getTeacher: (state) => state.teacher
};

const actions = {
  /* getting teacher profile info (id, name, contactNumber, email, residentialAddress, department) */
  async fetchTeacherProfileInfo({ commit }) {
    try {
      const response = await api.get('/teacher/profile');
      commit('mutateTeacher', response.data);
    } catch(err) {
      this.error = err.message;
    }
  },

  /* getting advisor profile info (id, name, contactNumber, email, department) */
  async fetchAdvisorProfileInfo({ commit }) {
    try {
      const response = await api.get('/student/advisor');
      commit('mutateTeacher', response.data);
    } catch(err) {
      this.error = err.message;
    }
  }
};

const mutations = {
  mutateTeacher: (state, teacher) => (state.teacher = teacher)
};

export default {
  state,
  getters,
  actions,
  mutations
};
