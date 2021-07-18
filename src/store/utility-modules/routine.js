import { api } from "boot/axios";

const state = {
  /* for class routine tabulation */
  classRoutineColumns: [],

  /* for class routine population */
  currentCourses: [],
  classRoutine: []
};

const getters = {
  getClassRoutineColumns: (state) => state.classRoutineColumns,

  getClassRoutine: (state) => state.classRoutine
};

const actions = {
  /* generating class routine columns */
  async generateClassRoutineColumns({ commit }) {
    try {
      let classRoutineColumns = [
        {
          name: 'day',
          required: true,
          label: 'Day/Period',
          align: 'left',
          field: row => row.day,
          format: val => `${val}`,
          sortable: false
        },
        {
          name: 'periodOne',
          align: 'left',
          label: 'Period 1',
          field: 'periodOne',
          sortable: false
        },
        {
          name: 'periodTwo',
          align: 'left',
          label: 'Period 2',
          field: 'periodTwo',
          sortable: false
        },
        {
          name: 'periodThree',
          align: 'left',
          label: 'Period 3',
          field: 'periodThree',
          sortable: false
        },
        {
          name: 'periodFour',
          align: 'left',
          label: 'Period 4',
          field: 'periodFour',
          sortable: false
        },
        {
          name: 'periodFive',
          align: 'left',
          label: 'Period 5',
          field: 'periodFive',
          sortable: false
        }
      ];

      const response = await api.get('/slot');

      classRoutineColumns[1].label += ' ('+(new Date(response.data[0].startingTime * 1000).toISOString().substr(11, 5))+'-'+(new Date((response.data[0].startingTime+response.data[0].duration*60) * 1000).toISOString().substr(11, 5))+')';
      classRoutineColumns[2].label += ' ('+(new Date(response.data[1].startingTime * 1000).toISOString().substr(11, 5))+'-'+(new Date((response.data[1].startingTime+response.data[1].duration*60) * 1000).toISOString().substr(11, 5))+')';
      classRoutineColumns[3].label += ' ('+(new Date(response.data[2].startingTime * 1000).toISOString().substr(11, 5))+'-'+(new Date((response.data[2].startingTime+response.data[2].duration*60) * 1000).toISOString().substr(11, 5))+')';
      classRoutineColumns[4].label += ' ('+(new Date(response.data[3].startingTime * 1000).toISOString().substr(11, 5))+'-'+(new Date((response.data[3].startingTime+response.data[3].duration*60) * 1000).toISOString().substr(11, 5))+')';
      classRoutineColumns[5].label += ' ('+(new Date(response.data[4].startingTime * 1000).toISOString().substr(11, 5))+'-'+(new Date((response.data[4].startingTime+response.data[4].duration*60) * 1000).toISOString().substr(11, 5))+')';

      commit('mutateClassRoutineColumns', classRoutineColumns);
    } catch(err) {
      this.error = err.message;
    }
  },

  /* getting current courses */
  async fetchCurrentCourses({ commit }, params) {
    try {
      let response = [];

      if(params.caller === 'teacher') {
        response = await api.get('/teacher/routine', {
          params: {
            session: params.session
          }
        });
      } else if(params.caller === 'student') {
        response = await api.get('/student/routine');
      }

      commit('mutateCurrentCourses', response.data);
    } catch(err) {
      this.error = err.message;
    }
  },

  /* generating class routine */
  generateClassRoutine({ commit }, params) {
    let classRoutine = [];
    const weekdays = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday'];

    for(let i=0; i<weekdays.length; i++) {
      classRoutine[i] = {
        day: weekdays[i],
        periodOne: '',
        periodTwo: '',
        periodThree: '',
        periodFour: '',
        periodFive: ''
      }
    }

    if(params.caller === 'teacher') {
      for(let i=0; i<state.currentCourses.length; i++) {
        for(let j=0; j<state.currentCourses[i].schedule.length; j++) {
          const weekday = weekdays.indexOf(state.currentCourses[i].schedule[j].day);

          let schedule = state.currentCourses[i].course.courseID+'\n';
          schedule += state.currentCourses[i].teachers.map(obj => {
            return obj.teacher;
          }).join('/')+'\n';
          schedule += state.currentCourses[i].schedule[j].room;

          if(state.currentCourses[i].schedule[j].slot === 1) {
            classRoutine[weekday].periodOne = schedule;
          } else if(state.currentCourses[i].schedule[j].slot === 2) {
            classRoutine[weekday].periodTwo = schedule;
          } else if(state.currentCourses[i].schedule[j].slot === 3) {
            classRoutine[weekday].periodThree = schedule;
          } else if(state.currentCourses[i].schedule[j].slot === 4) {
            classRoutine[weekday].periodFour = schedule;
          } else if(state.currentCourses[i].schedule[j].slot === 5) {
            classRoutine[weekday].periodFive = schedule;
          }
        }
      }
    } else if(params.caller === 'student') {
      for(let i=0; i<state.currentCourses.length; i++) {
        for(let j=0; j<state.currentCourses[i].courseSession.schedule.length; j++) {
          const weekday = weekdays.indexOf(state.currentCourses[i].courseSession.schedule[j].day);

          let schedule = state.currentCourses[i].courseSession.course.courseID+'\n';
          schedule += state.currentCourses[i].courseSession.teachers.map(obj => {
            return obj.teacher;
          }).join('/')+'\n';
          schedule += state.currentCourses[i].courseSession.schedule[j].room;

          if(state.currentCourses[i].courseSession.schedule[j].slot === 1) {
            classRoutine[weekday].periodOne = schedule;
          } else if(state.currentCourses[i].courseSession.schedule[j].slot === 2) {
            classRoutine[weekday].periodTwo = schedule;
          } else if(state.currentCourses[i].courseSession.schedule[j].slot === 3) {
            classRoutine[weekday].periodThree = schedule;
          } else if(state.currentCourses[i].courseSession.schedule[j].slot === 4) {
            classRoutine[weekday].periodFour = schedule;
          } else if(state.currentCourses[i].courseSession.schedule[j].slot === 5) {
            classRoutine[weekday].periodFive = schedule;
          }
        }
      }
    }

    commit('mutateClassRoutine', classRoutine);
  }
};

const mutations = {
  mutateClassRoutineColumns: (state, classRoutineColumns) => (state.classRoutineColumns = classRoutineColumns),

  mutateCurrentCourses: (state, currentCourses) => (state.currentCourses = currentCourses),
  mutateClassRoutine: (state, classRoutine) => (state.classRoutine = classRoutine)
};

export default {
  state,
  getters,
  actions,
  mutations
};
