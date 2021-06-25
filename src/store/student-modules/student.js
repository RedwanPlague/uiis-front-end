import { api } from "boot/axios";

const url = "/student";

const state = {
  id: {},
  student: {},

  availableSemesters: [],

  grades: [],
  availableGrades: [],

  courseRegistrations: [],
  availableCourseRegistrations: []
};

const getters = {
  getID: (state) => state.id,
  getStudent: (state) => state.student,

  getAvailableSemesters: (state) => state.availableSemesters,

  getGrades: (state) => state.grades,
  getAvailableGrades: (state) => state.availableGrades,

  getCourseRegistrations: (state) => state.courseRegistrations,
  getAvailableCourseRegistrations: (state) => state.availableCourseRegistrations
};

const actions = {
  /* getting student ID info (id) */
  async fetchStudentIDInfo({ commit }) {
    try {
      const response = await api.get(url+'/id');
      commit('mutateID', response.data);
    } catch(err) {
      this.error = err.message;
    }
  },

  /* getting student profile info (id, name, level, term, department, hall, contactNumber, email, residentialAddress) */
  async fetchStudentProfileInfo({ commit }, id) {
    try {
      const response = await api.get(url+'/profile/'+id);
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
  },

  /* getting specific student's course registrations information */
  async fetchCourseRegistrations({ commit }, params) {
    try {
      const response = await api.get(url+'/registrations/'+params.id, {
        params: {
          level: params.level,
          term: params.term
        }
      });
      commit('mutateCourseRegistrations', response.data);
    } catch(err) {
      this.error = err.message;
    }
  },

  /* generating specific student's list of available course registrations for tabulation purpose in course registration page */
  generateAvailableCourseRegistrations({ commit }) {
    let availableCourseRegistrations = [];

    for(let i=0; i<state.courseRegistrations.length; i++) {
      availableCourseRegistrations[i] = {
        courseID: state.courseRegistrations[i].courseSession.course.courseID,
        syllabusID: state.courseRegistrations[i].courseSession.course.syllabusID,
        title: state.courseRegistrations[i].courseSession.course.title,
        credit: state.courseRegistrations[i].courseSession.course.credit,
        status: state.courseRegistrations[i].status,
        _id: state.courseRegistrations[i]._id
      };
    }
    commit('mutateAvailableCourseRegistrations', availableCourseRegistrations);
  }
};

const mutations = {
  mutateID: (state, id) => (state.id = id),
  mutateStudent: (state, student) => (state.student = student),

  mutateAvailableSemesters: (state, availableSemesters) => (state.availableSemesters = availableSemesters),

  mutateGrades: (state, grades) => (state.grades = grades),
  mutateAvailableGrades: (state, availableGrades) => (state.availableGrades = availableGrades),

  mutateCourseRegistrations: (state, courseRegistrations) => (state.courseRegistrations = courseRegistrations),
  mutateAvailableCourseRegistrations: (state, availableCourseRegistrations) => (state.availableCourseRegistrations = availableCourseRegistrations)
};

export default {
  state,
  getters,
  actions,
  mutations
};
