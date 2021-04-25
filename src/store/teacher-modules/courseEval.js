import axios from "axios";
import {api} from 'boot/axios'
import { getField, updateField } from 'vuex-map-fields';

const state = {
  course : {
    session: '',
    courseID: '',
    courseName: '',
  },
  student_data: [],
};

const getters = {
  courseDetails: (state) => state.course,
  student_data: (state) => state.student_data,
  getField,
};

const actions = {

  async fetchCourse({commit}, {courseID, session}) {
    const res = await api.get(`/courseDetails/?courseID=${courseID}&session=${session}`);
    commit('setCourse', res.data[0]);
  },
  async fetchStudentData({commit}, {courseID, session}) {
    const res = await api.get(`/studentData/?courseID=${courseID}&session=${session}`);
    commit('setStudentData', res.data[0].data);
  },
  async saveStudentData({commit}) {

  }
};

const mutations = {
  setCourse: (state, course) => (state.course = course),
  setStudentData: (state, data) => (state.student_data = data),
  updateField
};

export default {
  state,
  getters,
  actions,
  mutations
};
