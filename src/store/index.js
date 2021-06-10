import Vue from 'vue';
import Vuex from 'vuex';

import student from './student-modules/student';

import courses from "src/store/teacher-modules/courses";
import courseEval from "src/store/teacher-modules/courseEval";
import advisor from './teacher-modules/advisor';
import examiner from './teacher-modules/examiner';
import scrutinizer from './teacher-modules/scrutinizer';

import user from "src/store/user";

import teachers from 'src/store/admin-modules/teachers'
import departments from 'src/store/admin-modules/departments'

/* loading Vuex */
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    teachers,
    departments,
    user,
    courses,
    courseEval,
    advisor,
    examiner,
    scrutinizer,
    student
  },

  /*
    enable strict mode (adds overhead!)
    for dev mode only
  */
  strict: process.env.DEBUGGING
});

export default store
