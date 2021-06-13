import departments from 'src/store/admin/departments'
import halls from 'src/store/admin/halls'
import teachers from 'src/store/admin/teachers'
import courses from 'src/store/admin/courses'

const merged = {
  state: {},
  getters: {},
  mutations: {},
  actions: {}
}

for (const key of Object.keys(merged)) {
  merged[key] = {
    ...departments[key],
    ...halls[key],
    ...teachers[key],
    ...courses[key]
  }
}

console.log(merged)

export default {
  namespaced: true,
  ...merged
}
