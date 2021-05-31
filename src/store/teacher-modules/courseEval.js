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

function validate_student_output_data(student_data) {
  let error_message = "";
  let formatted_data = []
  student_data.forEach(student=> {
    let entry = {
      student_id: student.student_id,
      evalMarks: []
    }
    if(student['attendance']) entry['attendance_mark'] = student['attendance'];
    for( let i = 1 ; i <= state.course_data.evalCount ; i++) {
      if(student['eval_'+i] && student['eval_'+i] > 20) {
        error_message = 'Student ID: ' + student.student_id + ' Evaluation-' + i + ' mark has to be less than 20';
      }
      entry.evalMarks.push({
        evalID: i,
        mark: student['eval_'+i]
      });
    }
    formatted_data.push(entry);
  })
  if(error_message) return {
    error: error_message
  };
  return formatted_data;
}

const getters = {
  course_data: (state) => state.course_data,
  student_data: (state) => state.student_data,
  getField,
};


const actions = {

  async fetchCourseDetails({commit}, {courseID, session}) {
    const res = await api.get(`/teacher/courses/${courseID}/${session}`);
    res.data.student_details = reformat_student_input_data(res.data.student_details, res.data.teacher_details.evalCount);
    commit('setCourseDetails', res.data);
  },
  async saveStudentData() {

    const student_formatted_data = validate_student_output_data(state.student_data);
    if(student_formatted_data.error) return {
      error: student_formatted_data.error
    };
    await api.patch(`/teacher/courses/${state.course_data.courseID}/${state.course_data.session}`,{
        course_data: state.course_data,
        student_data: student_formatted_data
    });
    return 1;
  },

  updateEvaluationTable({commit}, input) {

    commit('setEvaluationTable', input);
  }
};

const mutations = {
  setCourseDetails: (state, courseDetails) => {
    state.course_data = courseDetails.teacher_details;
    state.student_data = courseDetails.student_details;
  },
  setClassCount: (state, classCount) => {
    state.course_data.classCount = classCount;
  },
  setEvaluationTable: (state, input) => {

    input.forEach(new_entry => {
      state.student_data.forEach( (student_entry, index) => {

        if(student_entry.student_id === new_entry.student_id) {

          if('attendance' in new_entry) {
            student_entry.attendance = new_entry["attendance"];
          }
          for(let i = 1 ; i <= state.course_data.evalCount ; i++) {
            const eval_id = 'eval_'+i;
            if( eval_id in new_entry) {
              student_entry["eval_"+i] = new_entry["eval_"+i];
            }
          }
          state.student_data[index] = student_entry;
        }
      });
    });
  },
  updateField


};

export default {
  state,
  getters,
  actions,
  mutations
};
