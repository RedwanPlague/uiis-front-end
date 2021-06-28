import { api } from "boot/axios";

const state = {
  head: {},
  students: [],

  uniqueAdvisors: []
};

const getters = {
  getHead: (state) => state.head,
  getStudents: (state) => state.students,

  getUniqueAdvisors: (state) => state.uniqueAdvisors
};

const actions = {
  /* getting head id of specified department */
  async fetchHead({ commit }, department) {
    try {
      const response = await api.get('/teacher/head/department/'+department);
      commit('mutateHead', response.data);
    } catch(err) {
      this.error = err.message;
    }
  },

  /* getting department students */
  async fetchStudents({ commit }) {
    try {
      const response = await api.get('/teacher/head/students');
      commit('mutateStudents', response.data.sort((student1, student2) => (student1.id > student2.id)? 1: -1));
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
  mutateHead: (state, head) => (state.head = head),
  mutateStudents: (state, students) => (state.students = students),

  mutateUniqueAdvisors: (state, uniqueAdvisors) => (state.uniqueAdvisors = uniqueAdvisors)
};

export default {
  state,
  getters,
  actions,
  mutations
};
