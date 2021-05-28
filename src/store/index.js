import Vue from 'vue';
import Vuex from 'vuex';

import courses from "src/store/teacher-modules/courses";
import courseEval from "src/store/teacher-modules/courseEval";
import advisor from './teacher-modules/advisor';
import examiner from './teacher-modules/examiner';
import scrutinizer from './teacher-modules/scrutinizer';

import allPrivileges from "src/store/allPrivileges";
import user from "src/store/user";

/* loading Vuex */
Vue.use(Vuex);

/* creating store */
export default function() {
  return new Vuex.Store({
    modules: {
      // example
      allPrivileges,
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
  });
}
