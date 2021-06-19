import { api } from "boot/axios";

const state = {
  currentSession: "2021",
  courses: [],
  currentCourse: null
};

const getters = {
  allCourses: state => {
    return state.courses.map(course => ({
      courseID: course.courseID,
      courseTitle: course.courseTitle,
      part: course.part,
    }));
  },

  currentCourse: state => state.currentCourse,

  currentCourseInfo: state =>
    state.courses.find(course => course.courseID === state.currentCourse),

  currentSession: state => state.currentSession
};

const mutations = {
  mutCurCourse: (state, currentCourse) => {
    state.currentCourse = currentCourse;
  },

  mutSingleMark: (state, payload) => {
    const curCourse = state.courses.find(
      course => course.courseID === state.currentCourse
    );
    const student = curCourse.students.find(
      student => student.studentID === payload.studentID
    );

    student.mark = payload.mark;
  },

  mutAllCourses: (state, allCourses) => {
    for(const cr of allCourses) {
      cr.totalMarks = cr.editAccess = cr.students = null;
    }

    state.courses = allCourses;

  },

  mutSingleCourse: (state, payload) => {
    let curCor = state.courses.find(cour => cour.courseID === state.currentCourse);
    for(const prop in payload) {
      curCor[prop] = payload[prop];
    }
  },

  mutCurSession: (state, currentSession) => {
    state.currentSession = currentSession;
  },

  mutHasForwarded: state => {
    const curCor = state.courses.find(
      course => course.courseID === state.currentCourse
    );
    curCor.mutHasForwarded = true;
  }
};

const actions = {
  async fillCourses(context) {
    const session = context.state.currentSession;

    const shob = await api.get(`/teacher/examiner/${session}`);
    context.commit("mutAllCourses", shob.data.toRet);
  },

  async fillCurrentCourse(context) {
    const session = context.state.currentSession;

    const curCor = context.state.courses.find(
      cr => cr.courseID === context.state.currentCourse
    );

    const courseInfo = (
      await api.get(
        `/teacher/examiner/${curCor.courseID}/${session}?part=${curCor.part}`
      )
    ).data;

    context.commit("mutSingleCourse", courseInfo);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
