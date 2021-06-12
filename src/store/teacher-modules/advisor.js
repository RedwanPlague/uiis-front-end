import { api } from "boot/axios";

const url = "/teacher/advisor";

const state = {
  advisees: [],
  advisee: {},

  registrations: [],
  specificRegistrations: []
};

const getters = {
  getAdvisees: (state) => state.advisees,
  getAdvisee: (state) => state.advisee,

  getRegistrations: (state) => state.registrations,
  getSpecificRegistrations: (state) => state.specificRegistrations
};

const actions = {
  /* getting advisees */
  async fetchAdvisees({ commit }) {
    try {
      const response = await api.get(url+'/advisees');
      commit('mutateAdvisees', response.data.sort((advisee1, advisee2) => (advisee1.id > advisee2.id)? 1: -1));
    } catch(err) {
      this.error = err.message;
    }
  },

  /* getting specific advisee */
  async fetchAdvisee({ commit }, id) {
    try {
      const response = await api.get(url+'/advisees/'+id);
      commit('mutateAdvisee', response.data);
    } catch(err) {
      this.error = err.message;
    }
  },

  /* getting registrations */
  async fetchRegistrations({ commit }) {
    try {
      const response = await api.get(url+'/registrations');
      commit('mutateRegistrations', response.data.sort((advisee1, advisee2) => (advisee1.id > advisee2.id)? 1: -1));
    } catch(err) {
      this.error = err.message;
    }
  },

  /* getting specific advisee's registrations */
  async fetchSpecificRegistrations({ commit }, params) {
    try {
      const response = await api.get(url+'/registrations/'+params.id, {
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

  mutateRegistrations: (state, registrations) => (state.registrations = registrations),
  mutateSpecificRegistrations: (state, specificRegistrations) => (state.specificRegistrations = specificRegistrations)
};

export default {
  state,
  getters,
  actions,
  mutations
};
