import { api } from "boot/axios";

const url = "/teacher/advisor";

const state = {
  advisees: [],
  advisee: {},
  grades: [],
  registrations: [],
  specificRegistrations: []
};

const getters = {
  getAdvisees: (state) => state.advisees,
  getAdvisee: (state) => state.advisee,
  getGrades: (state) => state.grades,
  getRegistrations: (state) => state.registrations,
  getSpecificRegistrations: (state) => state.specificRegistrations
};

const actions = {
  /* getting advisees */
  async fetchAdvisees({ commit }) {
    try {
      const response = await api.get(url+'/advisees', {
        headers: {
          Authorization: 'Bearer '+'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJ0MSIsImlhdCI6MTYyMjE4Mjg1MX0.OiY5IYKmnjDv3Mh1H0XDBRULpq4d2PorJRyTEDVYulw'
        }
      });
      commit('mutateAdvisees', response.data);
    } catch(err) {
      this.error = err.message;
    }
  },

  /* getting specific advisee */
  async fetchAdvisee({ commit }, id) {
    try {
      const response = await api.get(url+'/advisees/'+id, {
        headers: {
          Authorization: 'Bearer '+'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJ0MSIsImlhdCI6MTYyMjE4Mjg1MX0.OiY5IYKmnjDv3Mh1H0XDBRULpq4d2PorJRyTEDVYulw'
        }
      });
      commit('mutateAdvisee', response.data);
    } catch(err) {
      this.error = err.message;
    }
  },

  /* getting specific advisee's specific semester's grades */
  async fetchGrades({ commit }, params) {
    try {
      const response = await api.get(url+'/advisees/'+params.id+'/grades', {
        headers: {
          Authorization: 'Bearer '+'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJ0MSIsImlhdCI6MTYyMjE4Mjg1MX0.OiY5IYKmnjDv3Mh1H0XDBRULpq4d2PorJRyTEDVYulw'
        },
        params: {
          level: params.level,
          term: params.term
        }
      });
      commit('mutateGrades', response.data);
    } catch(err) {
      this.error = err.message;
    }
  },

  /* getting registrations */
  async fetchRegistrations({ commit }) {
    try {
      const response = await api.get(url+'/registrations', {
        headers: {
          Authorization: 'Bearer '+'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJ0MSIsImlhdCI6MTYyMjE4Mjg1MX0.OiY5IYKmnjDv3Mh1H0XDBRULpq4d2PorJRyTEDVYulw'
        }
      });
      commit('mutateRegistrations', response.data);
    } catch(err) {
      this.error = err.message;
    }
  },

  /* getting specific advisee's registrations */
  async fetchSpecificRegistrations({ commit }, params) {
    try {
      const response = await api.get(url+'/registrations/'+params.id, {
        headers: {
          Authorization: 'Bearer '+'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJ0MSIsImlhdCI6MTYyMjE4Mjg1MX0.OiY5IYKmnjDv3Mh1H0XDBRULpq4d2PorJRyTEDVYulw'
        },
        params: {
          level: params.level,
          term: params.term
        }
      });
      commit('mutateSpecificRegistrations', response.data);
    } catch(err) {
      this.error = err.message;
    }
  }
};

const mutations = {
  mutateAdvisees: (state, advisees) => (state.advisees = advisees),
  mutateAdvisee: (state, advisee) => (state.advisee = advisee),
  mutateGrades: (state, grades) => (state.grades = grades),
  mutateRegistrations: (state, registrations) => (state.registrations = registrations),
  mutateSpecificRegistrations: (state, specificRegistrations) => (state.specificRegistrations = specificRegistrations)
};

export default {
  state,
  getters,
  actions,
  mutations
};
