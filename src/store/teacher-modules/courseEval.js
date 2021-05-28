import {api} from 'boot/axios'
import { getField, updateField } from 'vuex-map-fields';

const state = {
  course_data: {},
  student_data: [],
};
function reformat_student_input_data(student_data, tot_courses) {
  let formatted_data = [];

  student_data.forEach(student=>{
    let entry = {
      student_id: student.student_id,
      student_name: student.student_name,
      attendance: "",
    }
    for(let i = 1 ; i <= tot_courses ; i++) entry['eval_' + i] = "";
    if(student.attendanceMarks.length > 0) entry.attendance = student.attendanceMarks[0].mark;

    student.evalMarks.forEach(evalulation=> entry['eval_' + evalulation.evalID] = evalulation.mark);
    formatted_data.push(entry)
  })
  return formatted_data;
}

function format_student_output_data(student_data) {
  let formatted_data = []
  student_data.forEach(student=> {
    let entry = {
      student_id: student.student_id,
      evalMarks: []
    }
    if(student['attendance']) entry['attendance_mark'] = student['attendance'];
    for( let i = 1 ; i <= state.course_data.evalCount ; i++) {
      if(student['eval_'+i]) {
        entry.evalMarks.push({
          evalID: i,
          mark: student['eval_'+i]
        });
      }
    }
    console.log(entry);
    formatted_data.push(entry);
  })
  return formatted_data;
}

const getters = {
  course_data: (state) => state.course_data,
  student_data: (state) => state.student_data,
  getField,
};


const actions = {

  async fetchCourseDetails({commit}, {courseID, session}) {
    const res = await api.get(`/teacher/courses/${courseID}/${session}`, {
      headers: {
        Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJ0MSIsImlhdCI6MTYyMjEyMDQyOH0.d7VMrLXp8EObxf6-i43FRcTnUxqI9RqTUDrVK3r_9Sw"
      }
    });
    res.data.student_details = reformat_student_input_data(res.data.student_details, res.data.teacher_details.evalCount);
    commit('setCourseDetails', res.data);
  },
  async saveStudentData() {
    const res = await api.patch(`/teacher/courses/${state.course_data.courseID}/${state.course_data.session}`,{
        course_data: state.course_data,
        student_data: format_student_output_data(state.student_data)
    },{
      headers: {
        Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJ0MSIsImlhdCI6MTYyMjEyMDQyOH0.d7VMrLXp8EObxf6-i43FRcTnUxqI9RqTUDrVK3r_9Sw"
      }
    });
  }
};

const mutations = {
  setCourseDetails: (state, courseDetails) => {
    state.course_data = courseDetails.teacher_details;
    state.student_data = courseDetails.student_details;
  },
  updateField
};

export default {
  state,
  getters,
  actions,
  mutations
};
