import { api } from "boot/axios";

const url = "/teacher/advisor";

const state = {
  advisees: [],
  advisee: {},
  grades: [],
  registrations: [],
  specificRegistrations: [],

  availableSemesters: [],
  availableGrades: []
};

const getters = {
  getAdvisees: (state) => state.advisees,
  getAdvisee: (state) => state.advisee,
  getGrades: (state) => state.grades,
  getRegistrations: (state) => state.registrations,
  getSpecificRegistrations: (state) => state.specificRegistrations,

  getAvailableSemesters: (state) => state.availableSemesters,
  getAvailableGrades: (state) => state.availableGrades
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

  /* getting specific advisee's specific semester's grades */
  async fetchGrades({ commit }, params) {
    try {
      let response = [];

      if(params.filter === 'semester') {
        response = await api.get(url+'/advisees/'+params.id+'/grades', {
          params: {
            filter: params.filter,
            level: params.level,
            term: params.term
          }
        });
      } else if(params.filter === 'grade') {
        response = await api.get(url+'/advisees/'+params.id+'/grades', {
          params: {
            filter: params.filter,
            gradeLetter: params.gradeLetter
          }
        });
      }
      commit('mutateGrades', response.data);
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
  },

  /* getting available semesters for a specific advisee */
  generateAvailableSemesters({ commit }, params) {
    let availableSemesters = [];
    let availableSemestersCount = (params.level-1)*2+params.term-1;

    for(let i=0; i<availableSemestersCount; i++) {
      availableSemesters[i] = {
        semesterID: i+1,
        level: Math.floor(i/2)+1,
        term: i%2+1
      };
    }
    commit('mutateAvailableSemesters', availableSemesters);
  },

  /* getting available grades for a specific advisee for a specific semester */
  generateAvailableGrades({ commit }) {
    let availableGrades = [];

    for(let i=0, index=0; i<state.grades.length; i++) {
      if(state.grades[i].status === 'passed' || state.grades[i].status === 'failed') {
        availableGrades[index++] = {
          courseID: state.grades[i].courseSession.course.courseID,
          title: state.grades[i].courseSession.course.title,
          credit: state.grades[i].courseSession.course.credit,
          gradeLetter: state.grades[i].result.gradeLetter,
          gradePoint: state.grades[i].result.gradePoint
        };
      }
    }
    commit('mutateAvailableGrades', availableGrades);
  },

  /* clearing available grades for a specific advisee for a specific semester */
  clearAvailableGrades({ commit }) {
    commit('mutateAvailableGrades', []);
  }
};

const mutations = {
  mutateAdvisees: (state, advisees) => (state.advisees = advisees),
  mutateAdvisee: (state, advisee) => (state.advisee = advisee),
  mutateGrades: (state, grades) => (state.grades = grades),
  mutateRegistrations: (state, registrations) => (state.registrations = registrations),
  mutateSpecificRegistrations: (state, specificRegistrations) => (state.specificRegistrations = specificRegistrations),

  mutateAvailableSemesters: (state, availableSemesters) => (state.availableSemesters = availableSemesters),
  mutateAvailableGrades: (state, availableGrades) => (state.availableGrades = availableGrades)
};

export default {
  state,
  getters,
  actions,
  mutations
};
