import { api } from "boot/axios";

const state = {
  ke: null,
  currentSession: "2021",
  courses: [],
  currentCourse: null,
  courseLoading: false,
};

const getters = {
  ke: state => state.ke,

  currentCourse: state => state.currentCourse,

  currentCourseInfo: state =>
    state.courses.find(course => course.courseID === state.currentCourse),

  currentSession: state => state.currentSession,
  courseLoading: state => state.courseLoading,

  hasForwarded: (state, getters) => {
    const info = getters.currentCourseInfo;
    return info.hasForwarded;
  },

  allCourses: state => state.courses,

  attTotal: (state, getters) => teacherID => {
    const info = getters.currentCourseInfo;

    const teacher = info.teachers.find(
      teacher => teacher.teacher === teacherID
    );
    return teacher.classCount;
  },

  attStudent: (state, getters) => (teacherID, studentID) => {
    const info = getters.currentCourseInfo;

    try {
      const teacher = info.teachers.find(
        teacher => teacher.teacher === teacherID
      );

      const student = info.students.find(regi => regi.student.id === studentID);
      const section = student.attendanceMarks.find(
        sec => sec.teacher === teacherID
      );

      if (!isNaN(section.mark)) return section.mark;
      else throw new Error();

    } catch (error) {
      return "NA";
    }
  },

  evalTotal: (state, getters) => (teacherID, evalID) => {
    const info = getters.currentCourseInfo;

    const teacher = info.teachers.find(
      teacher => teacher.teacher === teacherID
    );

    const section = teacher.evalDescriptions.find(sec => sec.evalID === evalID);
    return section.totalMarks;
  },

  evalStudent: (state, getters) => (teacherID, evalID, studentID) => {
    const info = getters.currentCourseInfo;

    try {
      const teacher = info.teachers.find(
        teacher => teacher.teacher === teacherID
      );
      if (teacher.editAcess) throw new Error();

      const student = info.students.find(regi => regi.student.id === studentID);
      const section = student.evalMarks.find(
        sec => sec.teacher === teacherID && sec.evalID === evalID
      );

      if (!isNaN(section.mark)) return section.mark;
      else throw new Error();
    } catch (error) {
      return "NA";
    }
  },

  tfTotal: (state, getters) => (examinerID, part) => {
    const info = getters.currentCourseInfo;

    const examiner = info.examiners.find(
      examiner => examiner.teacher === examinerID && examiner.part === part
    );

    return examiner.totalMarks;
  },

  tfStudent: (state, getters) => (examinerID, part, studentID) => {
    const info = getters.currentCourseInfo;

    try {
      const examiner = info.examiners.find(
        examiner => examiner.teacher === examinerID && examiner.part === part
      );
      if (examiner.resultEditAcess) throw new Error();

      const student = info.students.find(regi => regi.student.id === studentID);
      const section = student.termFinalMarks.find(
        sec => sec.examiner === examinerID && sec.part === part
      );

      if (!isNaN(section.mark)) return section.mark;
      else throw new Error();

    } catch (error) {
      return "NA";
    }
  },
};

const mutations = {
  mutKe: (state, ke) => {
    state.ke = ke;
  },

  mutAllCourses: (state, allCourses) => {
    state.courses = allCourses;
  },

  mutCurCourse: (state, currentCourse) => {
    state.currentCourse = currentCourse;
  },

  mutSingleCourse(state, payload) {
    let curCor = state.courses.find(course => course.courseID === state.currentCourse);

    for(const prop in payload) {
      curCor[prop] = payload[prop];
    }
  },

  mutCourseLoading: (state, loading) => {
    state.courseLoading = loading;
  },

  mutHasForwarded: (state) => {
    let curCor = state.courses.find(course => course.courseID === state.currentCourse);
    curCor.hasForwarded = true;
  }
};

const actions = {
  async fillCourses(context) {
    try {
      context.commit("mutAllCourses", []);
      const courses = (
        await api.get(`/teacher/${context.state.ke}/${context.state.currentSession}`)
      ).data.toRet;
      context.commit("mutAllCourses", courses);
    } catch (error) {
      console.log(error);
    }
  },

  async fillSingleCourse(context) {
    try {
      context.commit("mutCourseLoading", true);
      const course = (
        await api.get(
          `/teacher/${context.state.ke}/${context.state.currentCourse}/${context.state.currentSession}`
        )
      ).data;

      const eligi = (
        await api.get(
          `/teacher/issues/${context.state.currentCourse}/${context.state.currentSession}/eligibleList`
        )
      ).data;

      course.audience = eligi;

      context.commit("mutSingleCourse", course);
      context.commit("mutCourseLoading", false);

    } catch (error) {
      console.log(error);
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
