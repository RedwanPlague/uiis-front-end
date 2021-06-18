import Vue from 'vue';
import Vuex from 'vuex';

import user from "src/store/user";

import teachers from 'src/store/admin-modules/teachers'
import departments from 'src/store/admin-modules/departments'

import courses from "src/store/teacher-modules/courses";
import courseEval from "src/store/teacher-modules/courseEval";
import advisor from './teacher-modules/advisor';
import examiner from './teacher-modules/examiner';
import head from './teacher-modules/head'
import scrutinizer from './teacher-modules/scrutinizer';

import student from './student-modules/student';

import grades from './utility-modules/grades';
import registrations from './utility-modules/registrations';

/* loading Vuex */
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user,

    teachers,
    departments,

    courses,
    courseEval,
    advisor,
    examiner,
    head,
    scrutinizer,

    student,

    grades,
    registrations
  },

  /*
    enable strict mode (adds overhead!)
    for dev mode only
  */
  strict: process.env.DEBUGGING
});

export default store
