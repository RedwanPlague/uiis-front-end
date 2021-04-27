import Vue from 'vue';
import Vuex from 'vuex';

import courses from "src/store/teacher-modules/courses";
import courseEval from "src/store/teacher-modules/courseEval";

// import example from './module-example'
import allPrivileges from "src/store/allPrivileges";
import user from "src/store/user";
import advisor from './modules/advisor';

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
      advisor
    },

    /*
      enable strict mode (adds overhead!)
      for dev mode only
    */
    strict: process.env.DEBUGGING
  });
}
