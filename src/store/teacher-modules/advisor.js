import AdvisorCall from '../../backend-calls/AdvisorCall';

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
  async fetchAdvisees({ commit }) {
    try {
      commit('mutateAdvisees', await AdvisorCall.getAdvisees());
    } catch(err) {
      this.error = err.message;
    }
  },

  async fetchAdvisee({ commit }, id) {
    try {
      commit('mutateAdvisee', await AdvisorCall.getAdvisee(id));
    } catch(err) {
      this.error = err.message;
    }
  },

  async fetchGrades({ commit }, id, level, term) {
    try {
      commit('mutateGrades', await AdvisorCall.getGrades(id, level, term));
    } catch(err) {
      this.error = err.message;
    }
  },

  async fetchRegistrations({ commit }) {
    try {
      commit('mutateRegistrations', await AdvisorCall.getRegistrations());
    } catch(err) {
      this.error = err.message;
    }
  },

  async fetchSpecificRegistrations({ commit }, id, level, term) {
    try {
      commit('mutateSpecificRegistrations', await AdvisorCall.getSpecificRegistrations(id, level, term));
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
