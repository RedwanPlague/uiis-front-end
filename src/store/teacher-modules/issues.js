import {api} from 'boot/axios';

const state = {
  issues: [],
  issueDetails: {},
};

const getters = {
  allIssues: (state) => state.issues,
  issueDetails: (state) => state.issueDetails
};

const actions = {
  async fetchIssues({commit}) {
    const res = await api.get('/teacher/issues');
    commit('setIssues', res.data);
  },
  async fetchIssueDetails({commit}, {issueID}) {
    const res = await api.get(`/teacher/issues/${issueID}`);
    commit('setIssueDetails', res.data);
  },
  async sendComment({commit}, {comment}) {
    const res = await api.post(`/teacher/issues/${state.issueDetails._id}/posts/create`, {
      comment: comment
    });
    commit('setPosts', res.data);
  }
};

const mutations = {
  setIssues: (state, issues) => (state.issues = issues),
  setIssueDetails: (state, issueDetails) => (state.issueDetails = issueDetails),
  setPosts: (state, posts) => (state.issueDetails.posts = posts)
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
