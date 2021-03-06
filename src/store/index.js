import Vue from 'vue';
import Vuex from 'vuex';

import admin from 'src/store/admin';

import user from "src/store/user";

import teacher from './teacher-modules/teacher';
import courses from 'src/store/teacher-modules/courses';
import courseEval from 'src/store/teacher-modules/courseEval';
import advisor from './teacher-modules/advisor';
import examiner from './teacher-modules/examiner';
import head from './teacher-modules/head'
import scrutinizer from './teacher-modules/scrutinizer';
import issues from 'src/store/teacher-modules/issues';

import student from './student-modules/student';

import grades from './utility-modules/grades';
import registrations from './utility-modules/registrations';
import routine from './utility-modules/routine';

/* loading Vuex */
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    admin,

    user,

    teacher,
    courses,
    courseEval,
    advisor,
    examiner,
    head,
    scrutinizer,
    issues,

    student,

    grades,
    registrations,
    routine
  },

  /*
    enable strict mode (adds overhead!)
    for dev mode only
  */
  strict: process.env.DEBUGGING
});

export default store
