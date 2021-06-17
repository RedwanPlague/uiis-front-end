import {api} from 'boot/axios';

const state = {
  issues: []
};

const getters = {
  allIssues: (state) => state.issues
};

const actions = {
  async fetchIssues({commit}) {
    const res = await api.get('/teacher/issues');
    commit('setIssues', res.data);
  }
};

const mutations = {
  setIssues: (state, issues) => (state.issues = issues),
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
