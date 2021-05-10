import apiFetch from 'src/utils/apiFetch'
import {isSubstring} from 'src/utils/patternSearch'

export default {
  data() {
    return {
      deptSelected: '',
      deptList: [],
      deptOptions: []
    }
  },
  methods: {
    fetchDepartments() {
      apiFetch('/department/list', null, 'All dept list')
        .then(response => {
          this.deptList = response.data.map(x => {
            return {
              value: x.id,
              label: x.id
            }
          })
        })
    },
    deptFilter(value, update) {
      if (value === '') {
        update(() => {
          this.deptOptions = this.deptList
        })
        return
      }
      update(() => {
        this.deptOptions = this.deptList.filter(x => isSubstring(x.label, value))
      })
    }
  },
  created() {
    this.fetchDepartments()
  }
}
