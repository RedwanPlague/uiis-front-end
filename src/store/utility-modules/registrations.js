import { api } from "boot/axios";

const state = {
  /* for course registration tabulation */
  registrationColumns: [
    {
      name: 'courseID',
      required: true,
      label: 'Course ID',
      align: 'left',
      field: row => row.courseID,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'syllabusID',
      align: 'left',
      label: 'Syllabus ID',
      field: 'syllabusID',
      sortable: true
    },
    {
      name: 'title',
      align: 'left',
      label: 'Course Title',
      field: 'title',
      sortable: true
    },
    {
      name: 'credit',
      align: 'left',
      label: 'Credit Hours',
      field: 'credit',
      format: val => `${val.toFixed(2)}`,
      sortable: true
    },
    {
      name: 'status',
      align: 'left',
      label: 'Status',
      field: 'status',
      sortable: true
    }
  ],

  currentSession: {}
};

const getters = {
  getRegistrationColumns: (state) => state.registrationColumns,
  getCurrentSession: (state) => state.currentSession
};

const actions = {
  /* getting current session */
  async fetchCurrentSession({ commit }) {
    try {
      const response = await api.get('/currentSession');
      commit('mutateCurrentSession', response.data);
    } catch(err) {
      this.error = err.message;
    }
  }
};

const mutations = {
  mutateCurrentSession: (state, currentSession) => (state.currentSession = currentSession)
};

export default {
  state,
  getters,
  actions,
  mutations
};
