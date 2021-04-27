import axios from "axios";

const state = {
  advisees: [],
  courses: [],
  semesters: []
};

const getters = {
  getAdvisees: (state) => state.advisees,
  getCourses: (state) => state.courses,
  getSemesters: (state) => state.semesters
};

const actions = {
  fetchAdvisees({ commit }) {
    /* creating dummy advisees array */
    let response = [];

    for(let i=0; i<30; i++) {
      response[i] = {
        studentID: 1605001+i,
        name: "student no."+(i+1),
        level: "4",
        term: "1",
        department: "CSE",
        contactNumber: "xxx-xxx-xxxx",
        emailAddress: (1605001+i)+"@ugrad.cse.buet.ac.bd"
      };
    }
    commit('mutateAdvisees', response);
  },

  fetchCourses({ commit }) {
    /* creating dummy courses array */
    let response = [];

    for(let i=0; i<10; i++) {
      response[i] = {
        courseID: "CSE30"+i,
        syllabusID: "SYL_CSE_S16_ID"+(10-i),
        courseTitle: "Course No."+(i+1),
        creditHours: 3.00,
        grade: "A+",
        gradePoint: 4.00,
        remarks: "Qualified"
      };
    }
    commit('mutateCourses', response);
  },

  fetchSemesters({ commit }) {
    /* creating dummy semesters array */
    let response = [];

    for(let i=0; i<8; i++) {
      response[i] = {
        semesterID: i+1,
        level: Math.floor(i/2)+1,
        term: i%2+1
      };
    }
    commit('mutateSemesters', response);
  }
};

const mutations = {
  mutateAdvisees: (state, advisees) => (state.advisees = advisees),
  mutateCourses: (state, courses) => (state.courses = courses),
  mutateSemesters: (state, semesters) => (state.semesters = semesters)
};

export default {
  state,
  getters,
  actions,
  mutations
};
