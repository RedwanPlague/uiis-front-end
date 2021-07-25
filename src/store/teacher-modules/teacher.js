import { api } from "boot/axios";

const state = {
  teacher: {},
  teacherProfilePicture: {}
};

const getters = {
  getTeacher: (state) => state.teacher,
  getTeacherProfilePicture: (state) => state.teacherProfilePicture
};

const actions = {
  /* getting teacher profile info (id, name, contactNumber, email, residentialAddress, department) */
  async fetchTeacherProfileInfo({ commit }) {
    try {
      const response = await api.get('/teacher/profile');
      commit('mutateTeacher', response.data);
    } catch(err) {
      this.error = err.message;
    }
  },

  /* getting advisor profile info (id, name, contactNumber, email, department) */
  async fetchAdvisorProfileInfo({ commit }) {
    try {
      const response = await api.get('/student/advisor');
      commit('mutateTeacher', response.data);
    } catch(err) {
      this.error = err.message;
    }
  },

  /* getting teacher profile picture */
  async fetchTeacherProfilePicture({ commit }) {
    try {
      const response = await api.get('/teacher/profile/picture');
      commit('mutateTeacherProfilePicture', response.data);
    } catch(err) {
      this.error = err.message;
    }
  },

  /* getting advisor profile picture */
  async fetchAdvisorProfilePicture({ commit }) {
    try {
      const response = await api.get('/student/advisor/picture');
      commit('mutateTeacherProfilePicture', response.data);
    } catch(err) {
      this.error = err.message;
    }
  }
};

const mutations = {
  mutateTeacher: (state, teacher) => (state.teacher = teacher),
  mutateTeacherProfilePicture: (state, teacherProfilePicture) => (state.teacherProfilePicture = teacherProfilePicture)
};

export default {
  state,
  getters,
  actions,
  mutations
};
