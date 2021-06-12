import { api } from "boot/axios";

const url = "/student";

const state = {
  student: {},

  availableSemesters: [],

  grades: [],
  availableGrades: []
};

const getters = {
  getStudent: (state) => state.student,

  getAvailableSemesters: (state) => state.availableSemesters,

  getGrades: (state) => state.grades,
  getAvailableGrades: (state) => state.availableGrades
};

const actions = {
  /* getting student basic info (id, level, term) */
  async fetchStudentBasicInfo({ commit }) {
    try {
      const response = await api.get(url+'/basic');
      commit('mutateStudent', response.data);
    } catch(err) {
      this.error = err.message;
    }
  },

  /* getting student home info (id, name, level, term, department, hall) */
  async fetchStudentHomeInfo({ commit }) {
    try {
      const response = await api.get(url+'/home');
      commit('mutateStudent', response.data);
    } catch(err) {
      this.error = err.message;
    }
  },

  /* getting student profile info (id, name, level, term, department, hall, contactNumber, email, residentialAddress) */
  async fetchStudentProfileInfo({ commit }) {
    try {
      const response = await api.get(url+'/profile');
      commit('mutateStudent', response.data);
    } catch(err) {
      this.error = err.message;
    }
  },

  /* getting student profile info (id, name, department, totalCreditHoursCompleted, cgpa) */
  async fetchStudentGradesProfileInfo({ commit }) {
    try {
      const response = await api.get(url+'/grades_profile');
      commit('mutateStudent', response.data);
    } catch(err) {
      this.error = err.message;
    }
  },

  /* generating list of available semesters for a specific student */
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

  /* getting specific student's grades */
  async fetchGrades({ commit }, params) {
    try {
      let response = [];

      if(params.filter === 'semester') {
        response = await api.get(url+'/grades/'+params.id, {
          params: {
            filter: params.filter,
            level: params.level,
            term: params.term
          }
        });
      } else if(params.filter === 'grade') {
        response = await api.get(url+'/grades/'+params.id, {
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

  /* generating specific student's list of available grades for tabulation purpose in grades page */
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

  /* clearing available grades for tabulation purpose in grades page */
  clearAvailableGrades({ commit }) {
    commit('mutateAvailableGrades', []);
  }
};

const mutations = {
  mutateStudent: (state, student) => (state.student = student),

  mutateAvailableSemesters: (state, availableSemesters) => (state.availableSemesters = availableSemesters),

  mutateGrades: (state, grades) => (state.grades = grades),
  mutateAvailableGrades: (state, availableGrades) => (state.availableGrades = availableGrades)
};

export default {
  state,
  getters,
  actions,
  mutations
};
