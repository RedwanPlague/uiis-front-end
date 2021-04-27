import Vue from 'vue';
import Vuex from 'vuex';
import courses from "src/store/teacher-modules/courses";
import courseEval from "src/store/teacher-modules/courseEval";

// import example from './module-example'
import allPrivileges from "src/store/allPrivileges";
import user from "src/store/user";

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      // example
      allPrivileges,
      user,
      courses,
      courseEval,
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  })

  return Store;
};
