import apiFetch from 'src/utils/apiFetch'

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
        const substring = value.toLowerCase()
        this.deptOptions = this.deptList.filter(x => x.label.toLowerCase().indexOf(substring) > -1)
      })
    }
  },
  created() {
    this.fetchDepartments()
  }
}
