import Vue from 'vue';
import Vuex from 'vuex';

import courses from "src/store/teacher-modules/courses";
import courseEval from "src/store/teacher-modules/courseEval";
import advisor from './teacher-modules/advisor';
import examiner from './teacher-modules/examiner';
import scrutinizer from './teacher-modules/scrutinizer';

import user from "src/store/user";

import admin from 'src/store/admin'

/* loading Vuex */
Vue.use(Vuex);


const store = new Vuex.Store({

  modules: {
    // example
    admin,
    user,
    courses,
    courseEval,
    advisor,
    examiner,
    scrutinizer,
  },

  /*
    enable strict mode (adds overhead!)
    for dev mode only
  */
  strict: process.env.DEBUGGING

})

export default store

