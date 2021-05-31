import {apiFetch} from 'src/utils/apiWrappers'

export default {
  state: {
    teachersLoaded: false,
    teachers: []
  },
  getters: {
    teacherList(state) {
      return state.teachers
    }
  },
  mutations: {
    setTeachers(state, data) {
      state.teachers = data
      state.teachersLoaded = true
    }
  },
  actions: {
    fetchTeachers(context, dept) {
      dept = null
      return new Promise((resolve, reject) => {
        if (context.state.teachersLoaded) {
          resolve()
        }
        else {
          apiFetch('account/teacher/list',
            {department: dept},
            `teachers of ${dept ? dept : 'all'}`)
            .then(response => {
              context.commit('setTeachers', response.data.map(x => {
                return {
                  value: x.id,
                  label: `(${x.id}) ${x.name}`
                }
              }))
              resolve(response)
            })
            .catch(error => reject(error))
        }
      })
    }
  }
}
