import departments from 'src/store/admin/departments'
import halls from 'src/store/admin/halls'
import teachers from 'src/store/admin/teachers'
import courses from 'src/store/admin/courses'
import roles from 'src/store/admin/roles'

const admin = {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {}
}

for (const key of Object.keys(admin)) {
  admin[key] = {
    ...departments[key],
    ...halls[key],
    ...teachers[key],
    ...courses[key],
    ...roles[key],
  }
}

export default admin
