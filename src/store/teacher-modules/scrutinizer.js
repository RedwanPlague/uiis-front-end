import { api } from "boot/axios";

const state = {
  currentSession: "2021",
  courses: [],
  currentCourse: null,
};

const getters = {

  currentCourseName: state => state.currentCourse,

  currentCourseInfo: state =>
    state.courses.find(course => course.courseID === state.currentCourse),

  currentSession: state => state.currentSession,
};

const mutations = {
  mutCurCourse: (state, currentCourse) => {
    state.currentCourse = currentCourse;
  },
};

const actions = {
  async fillCourses(context) {

  }

};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
