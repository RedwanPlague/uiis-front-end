import { api } from "boot/axios";

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const state = {
  currentSession: null,
  courses: [],
  currentCourse: null,
  currentPart: null
};

const getters = {
  allCourses: state => {
    return state.courses.map(course => ({
      courseID: course.courseID,
      courseTitle: course.courseTitle,
      part: course.part
    }));
  },

  currentCourse: state => state.currentCourse,
  currentPart: state => state.currentPart,

  currentCourseInfo: state =>
    state.courses.find(course => course.courseID === state.currentCourse),

  currentSession: state => state.currentSession
};

const mutations = {
  mutCurCourse: (state, currentCourse) => {
    state.currentCourse = currentCourse;
  },
  mutCurPart: (state, currentPart) => {
    state.currentPart = currentPart;
  },

  mutSingleMark: (state, payload) => {
    const curCourse = state.courses.find(
      course =>
        course.courseID === state.currentCourse &&
        course.part === state.currentPart
    );
    const student = curCourse.students.find(
      student => student.studentID === payload.studentID
    );

    student.mark = payload.mark;
  },

  mutAllCourses: (state, allCourses) => {
    for (const cr of allCourses) {
      cr.totalMarks = cr.editAccess = cr.students = null;
    }

    state.courses = allCourses;
  },

  mutSingleCourse: (state, payload) => {
    let curCor = state.courses.find(
      cour =>
        cour.courseID === state.currentCourse && cour.part === state.currentPart
    );
    for (const prop in payload) {
      curCor[prop] = payload[prop];
    }
  },

  mutCurSession: (state, currentSession) => {
    state.currentSession = currentSession;
  },

  mutHasForwarded: state => {
    const curCor = state.courses.find(
      course =>
        course.courseID === state.currentCourse &&
        course.part === state.currentPart
    );

    for(const stu of curCor.students) stu.editAccess = false;
    curCor.hasForwarded = true;
  }
};

const actions = {
  async fillCurrentSession(context) {
    const sesObject = await api.get(`/currentSession`);
    const sesTime = new Date(sesObject.data.session);

    context.commit("mutCurSession", `${monthNames[sesTime.getMonth()]}-${sesTime.getFullYear()}`);
  },
  
  async fillCourses(context) {
    const session = context.state.currentSession;

    const shob = await api.get(`/teacher/examiner/${session}`);
    context.commit("mutAllCourses", shob.data.toRet);
  },

  async fillCurrentCourse(context) {
    const session = context.state.currentSession;

    const curCor = context.state.courses.find(
      cr =>
        cr.courseID === context.state.currentCourse &&
        cr.part === context.state.currentPart
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
