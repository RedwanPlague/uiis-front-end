import {api} from 'boot/axios'

const state = {
  courses: []
};

const getters = {
  allCourses: (state) => state.courses
};

const actions = {


  async fetchCourses({commit}) {
    const res = await api.get('/teacher/courses');
    if(!res.data) return;

    if(res.data.currentCourseSessions) {
      res.data.currentCourseSessions.forEach(entry => {
        const _date = new Date(entry.session);
        entry.session = _date.toLocaleString('default', { month: 'long' }) + "-" + _date.getFullYear();
      });
    }
    if(res.data.previousCourseSessions) {
      res.data.previousCourseSessions.forEach(entry => {
        const _date = new Date(entry.session);
        entry.session = _date.toLocaleString('default', { month: 'long' }) + "-" + _date.getFullYear();
      });
    }
    console.log(res);
    commit('setCourses', res.data);
  }
};

const mutations = {
  setCourses: (state, courses) => (state.courses = courses),
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
