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
      part: course.part
    }));
  },

  currentCourse: state => state.currentCourse,

  currentCourseInfo: state =>
    state.courses.find(course => course.courseID === state.currentCourse),

  currentSession: state => state.currentSession,
};

const mutations = {
  mutCurCourse: (state, currentCourse) => {
    state.currentCourse = currentCourse;
  },

  mutSingleMark: (state, payload) => {
   const curCourse = state.courses.find(course => course.courseID === state.currentCourse);
   const student = curCourse.students.find(student => student.studentID === payload.studentID);
   
   student.mark = payload.mark;
  },

  mutAllCourses: (state, allCourses) => {
    state.courses = allCourses;
  },

  mutCurSession: (state, currentSession) => {
    state.currentSession = currentSession;
  },

  mutHasEditAccess: (state) => {
    const curCor = state.courses.find(course => course.courseID === state.currentCourse);
    curCor.hasEditAccess = false;
  }
};

const actions = {
  async fillCourses(context) {
    const session = context.state.currentSession;

    const shob = await api.get(
      `/teacher/examiner/${session}`,
    );

    const courseSum = shob.data.toRet;
    console.log(courseSum);

    const shobCourses = [];

    for(const cr of courseSum) {
      //console.log(`/teacher/examiner/${cr.courseID}/${session}?part=${cr.part}`);
      const courseInfo = (await api.get(
        `/teacher/examiner/${cr.courseID}/${session}?part=${cr.part}`,
      )).data;

      console.log(courseInfo);

      const newCourse = {
        courseID: cr.courseID,
        courseTitle: cr.courseTitle,
        part: cr.part,
        totalMarks: courseInfo.totalMarks,
        hasEditAccess: courseInfo.editAccess,
        students: courseInfo.students,
      };

      shobCourses.push(newCourse);
    }

    context.commit("mutAllCourses", shobCourses);
  }

};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
