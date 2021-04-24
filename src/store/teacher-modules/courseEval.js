import axios from "axios";
import {api} from 'boot/axios'

const state = {
  course : null,
  registeredStudents: [],
  evaluation: [],
};

const getters = {
  courseDetails: (state) => state.course,
  registeredStudents: (state) => state.registeredStudents,
  courseEvaluation: (state) => state.evaluation
};

const actions = {
  // async fetchCourses({commit}) {
  //   const res = await api.get('/courses');
  //   commit('setCourses', res.data);
  // },
  async fetchCourse({commit}, {courseID, session}) {
    const res = await api.get(`/courseDetails/?courseID=${courseID}&session=${session}`);
    commit('setCourse', res.data[0]);
  }
};

const mutations = {
  setCourse: (state, course) => (state.course = course),
};

export default {
  state,
  getters,
  actions,
  mutations
};
