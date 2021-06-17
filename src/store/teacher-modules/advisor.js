import { api } from "boot/axios";

const url = "/teacher/advisor";

const state = {
  advisees: [],
  registrations: []
};

const getters = {
  getAdvisees: (state) => state.advisees,
  getRegistrations: (state) => state.registrations
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

  /* getting registrations */
  async fetchRegistrations({ commit }) {
    try {
      const response = await api.get(url+'/registrations');
      commit('mutateRegistrations', response.data.sort((advisee1, advisee2) => (advisee1.id > advisee2.id)? 1: -1));
    } catch(err) {
      this.error = err.message;
    }
  }
};

const mutations = {
  mutateAdvisees: (state, advisees) => (state.advisees = advisees),
  mutateRegistrations: (state, registrations) => (state.registrations = registrations),
};

export default {
  state,
  getters,
  actions,
  mutations
};
