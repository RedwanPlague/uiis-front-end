import { api } from "boot/axios";

const state = {
  students: [],

  uniqueAdvisors: []
};

const getters = {
  getStudents: (state) => state.students,

  getUniqueAdvisors: (state) => state.uniqueAdvisors
};

const actions = {
  /* getting department students */
  async fetchStudents({ commit }) {
    try {
      const response = await api.get('/teacher/head/students');
      commit('mutateStudents', response.data);
    } catch(err) {
      this.error = err.message;
    }
  },

  /* generating list of unique advisors */
  generateUniqueAdvisors({ commit }) {
    let uniqueAdvisors = [];

    state.students.forEach((student) => {
      if(!uniqueAdvisors.includes(student.advisor._id)) {
        uniqueAdvisors.push(student.advisor._id);
      }
    });
    commit('mutateUniqueAdvisors', uniqueAdvisors);
  }
};

const mutations = {
  mutateStudents: (state, students) => (state.students = students),

  mutateUniqueAdvisors: (state, uniqueAdvisors) => (state.uniqueAdvisors = uniqueAdvisors)
};

export default {
  state,
  getters,
  actions,
  mutations
};
