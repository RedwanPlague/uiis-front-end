import axios from "axios";
import { api } from "boot/axios";

const state = {
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
    state.courses.find(course => course.courseID === state.currentCourse)
};

const actions = {};

const mutations = {
  mutCurCourse: (state, currentCourse) => {
    state.currentCourse = currentCourse;
  },

  mutSingleMark: (state, payload) => {
   const curCourse = state.courses.find(course => course.courseID === state.currentCourse);
   const student = curCourse.students.find(student => student.studentID === payload.studentID);
   
   student.marks = payload.marks;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
