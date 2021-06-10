import { api } from "boot/axios";

const url = "/student";

const state = {
  student: {}
};

const getters = {
  getStudent: (state) => state.student
};

const actions = {
  /* getting student basic info */
  async fetchStudentBasicInfo({ commit }) {
    try {
      const response = await api.get(url+'/basic');
      commit('mutateStudent', response.data);
    } catch(err) {
      this.error = err.message;
    }
  },

  /* getting student detailed info */
  async fetchStudentDetailsInfo({ commit }) {
    try {
      const response = await api.get(url+'/details');
      commit('mutateStudent', response.data);
    } catch(err) {
      this.error = err.message;
    }
  }
};

const mutations = {
  mutateStudent: (state, student) => (state.student = student)
};

export default {
  state,
  getters,
  actions,
  mutations
};
