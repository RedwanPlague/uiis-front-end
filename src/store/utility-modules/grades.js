import { api } from "boot/axios";

const state = {
  /* for filtering with grades */
  gradeLetters: ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'D', 'S', 'F'],

  /* for grading tabulation */
  gradeColumns: [
    {
      name: 'courseID',
      required: true,
      label: 'Course ID',
      align: 'left',
      field: row => row.courseID,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'title',
      align: 'left',
      label: 'Course Title',
      field: 'title',
      sortable: true
    },
    {
      name: 'credit',
      align: 'left',
      label: 'Credit Hours',
      field: 'credit',
      format: val => `${val.toFixed(2)}`,
      sortable: true
    },
    {
      name: 'gradeLetter',
      align: 'left',
      label: 'Grade',
      field: 'gradeLetter',
      sortable: true
    },
    {
      name: 'gradePoint',
      align: 'left',
      label: 'Grade Point',
      field: 'gradePoint',
      format: val => `${val.toFixed(2)}`,
      sortable: true
    }
  ],

  /* for course registration tabulation */
  registrationColumns: [
    {
      name: 'courseID',
      required: true,
      label: 'Course ID',
      align: 'left',
      field: row => row.courseID,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'syllabusID',
      align: 'left',
      label: 'Syllabus ID',
      field: 'syllabusID',
      sortable: true
    },
    {
      name: 'title',
      align: 'left',
      label: 'Course Title',
      field: 'title',
      sortable: true
    },
    {
      name: 'credit',
      align: 'left',
      label: 'Credit Hours',
      field: 'credit',
      format: val => `${val.toFixed(2)}`,
      sortable: true
    },
    {
      name: 'status',
      align: 'left',
      label: 'Status',
      field: 'status',
      sortable: true
    }
  ]
};

const getters = {
  getGradeLetters: (state) => state.gradeLetters,
  getGradeColumns: (state) => state.gradeColumns,
  getRegistrationColumns: (state) => state.registrationColumns
};

const actions = {

};

const mutations = {

};

export default {
  state,
  getters,
  actions,
  mutations
};
