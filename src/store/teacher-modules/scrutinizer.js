import { api } from "boot/axios";

const grades = [
  {start: 80, end: 100, gpa: 4.00, grade: "A+"},
  {start: 75, end: 79, gpa: 3.75, grade: "A"},
  {start: 70, end: 74, gpa: 3.50, grade: "A-"},
  {start: 65, end: 69, gpa: 3.25, grade: "B+"},
  {start: 60, end: 64, gpa: 3.00, grade: "B"},
  {start: 55, end: 59, gpa: 2.75, grade: "B-"},
  {start: 50, end: 54, gpa: 2.50, grade: "C+"},
  {start: 45, end: 49, gpa: 2.25, grade: "C"},
  {start: 40, end: 44, gpa: 2.00, grade: "D"},
  {start: 0, end: 39, gpa: 0.00, grade: "F"},
];

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

  attFullTotal: (state, getters) => {
    const info = getters.currentCourseInfo;
    return Number(info.credit) * Number(info.attendanceWeight);
  },

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

  attFullStudent: (state, getters) => (studentID) => {
    const info = getters.currentCourseInfo;
    let tot = 0;
    let chilo = 0;

    try {

      for (const teacher of info.teachers) {
        tot += teacher.classCount;
      }

      const student = info.students.find(regi => regi.student.id === studentID);
      student.attendanceMarks.forEach(
        sec => {
          chilo += sec.mark;
        }
      );

      const ongsho = chilo / tot;
      const gun = Number(info.attendanceWeight) * Number(info.credit);

      if(ongsho >= .9) return 10/10*gun;
      else if(ongsho >= 0.85) return 9/10*gun;
      else if(ongsho >= 0.80) return 8/10*gun;
      else if(ongsho >= 0.75) return 7/10*gun;
      else if(ongsho >= 0.70) return 6/10*gun;
      else if(ongsho >= 0.65) return 5/10*gun;
      else if(ongsho >= 0.60) return 4/10*gun;
      else return 0/10*gun;

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

  evalFullTotal: (state, getters) => {
    const info = getters.currentCourseInfo;
    return Math.round(Number(info.perEvalWeight) * Number(info.consideredEvalCount) * Number(info.credit));
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

  evalFullStudent: (state, getters) => (studentID) => {
    const info = getters.currentCourseInfo;
    const student = info.students.find(regi => regi.student.id === studentID);
    const shob = [];

    try {
      info.teachers.forEach(teacher => {
        teacher.evalDescriptions.forEach(ed => {
          const section = student.evalMarks.find(
            sec => sec.teacher === teacher.teacher && sec.evalID === ed.evalID
          );
          shob.push(Number(section.mark) / Number(ed.totalMarks));
        });
      });

      shob.sort((a, b) => b - a);

      let mot = 0;
      for (let i = 0; i < Number(info.consideredEvalCount); i++)
        mot += shob[i] * Number(info.perEvalWeight) * Number(info.credit);

      return Math.ceil(mot);

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

  tfFullTotalPerPart: (state, getters) => {
    const info = getters.currentCourseInfo;

    const baki = 100-Number(info.attendanceWeight)-Number(info.perEvalWeight)*Number(info.consideredEvalCount);
    const perPartPercentage = baki/Number(info.termFinalParts);
    return perPartPercentage*Number(info.credit);
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

  tfFullStudent: (state, getters) => (part, studentID) => {
    const info = getters.currentCourseInfo;

    try {
      const examiner = info.examiners.find(
        examiner => examiner.part === part
      );

      const student = info.students.find(regi => regi.student.id === studentID);
      const section = student.termFinalMarks.find(
        sec => sec.part === part
      );

      const res = Number(section.mark)/Number(examiner.totalMarks)*getters["tfFullTotalPerPart"];
      return res;

    } catch (error) {
      return "NA";
    }
  },

  fullTotal: (state, getters) => {
    const info = getters.currentCourseInfo;
    return 100*Number(info.credit);
  },

  fullStudent: (state, getters) => (studentID) => {
    const info = getters.currentCourseInfo;
    const student = info.students.find(regi => regi.student.id === studentID);

    let mot = getters["attFullStudent"](studentID) + getters["evalFullStudent"](studentID);
    student.termFinalMarks.forEach(
      sec => {
        mot += getters["tfFullStudent"](sec.part, studentID);
      }
    );

    return mot;
  },

  percentStudent: (state, getters) => (studentID) => {
    const info = getters.currentCourseInfo;
    const percent = Math.ceil(getters["fullStudent"](studentID)/Number(info.credit));    

    return percent;
  },

  gpaStudent: (state, getters) => (studentID) => {
    const percent = getters["percentStudent"](studentID);
    const hergrade = grades.find(grade => percent >= grade.start && percent <= grade.end);

    return hergrade.gpa;
  },

  gradeStudent: (state, getters) => (studentID) => {
    const percent = getters["percentStudent"](studentID);
    const hergrade = grades.find(grade => percent >= grade.start && percent <= grade.end);

    return hergrade.grade;
  },

  gradeList: (state, getters) => grades,

  countGrade: (state, getters) => (letter) => {
    const info = getters.currentCourseInfo;

    let mot = 0;
    info.students.forEach(regi => {
      mot += (getters["gradeStudent"](regi.student.id)) == letter;
    })

    return mot;
  },

  percentGrade: (state, getters) => (letter) => {
    const info = getters.currentCourseInfo;
    const percent = getters["countGrade"](letter)/info.students.length*100;
    return (Math.round(percent * 100) / 100).toFixed(2);
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


    for (const prop in payload) {
      curCor[prop] = payload[prop];
    }

    console.log("curCor->");
    console.log(curCor);
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

      if (context.state.courses.length === 0) {
        await context.dispatch("fillCourses"); // To change
      }
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
