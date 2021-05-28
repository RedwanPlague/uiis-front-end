import { api } from "boot/axios";

const state = {
  currentSession: "2021",
  courses: [
    {
      courseID: "CSE203",
      courseTitle: "Algo DS",
      part: "A",
      totalMarks: 105,
      hasEditAccess: true,
      students: [
        {
          studentID: "1605001",
          marks: 101
        },
        {
          studentID: "1605002",
          marks: 102
        }
      ]
    },
    {
      courseID: "CSE207",
      courseTitle: "Algo DS cutu",
      part: "B",
      totalMarks: 105,
      hasEditAccess: false,
      students: [
        {
          studentID: "1605001",
          marks: 103
        },
        {
          studentID: "1605002",
          marks: 104
        }
      ]
    }
  ],

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

  currentCourseName: state => state.currentCourse,

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
   
   student.marks = payload.marks;
  },

  mutAllCourses: (state, allCourses) => {
    state.courses = allCourses;
  },

  mutCurSession: (state, currentSession) => {
    state.currentSession = currentSession;
  }
};

const actions = {
  async fillCourses(context) {
    const session = context.state.currentSession;
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJ0MSIsImlhdCI6MTYyMjA0Njc2Mn0.vdxf-sKNb5UnO26cQdDDyT0B2O9lDjD40smW2VnSAoU";

    const shob = await api.get(
      `/teacher/examiner/${session}`,
      {
        headers: { Authorization: `Bearer ${token}`, },
      }
    );

    const courseSum = shob.data.toRet;
    console.log(courseSum);

    const shobCourses = [];

    for(const cr of courseSum) {
      //console.log(`/teacher/examiner/${cr.courseID}/${session}?part=${cr.part}`);
      const courseInfo = (await api.get(
        `/teacher/examiner/${cr.courseID}/${session}?part=${cr.part}`,
        {
          headers: { Authorization: `Bearer ${token}`, },
        }
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
