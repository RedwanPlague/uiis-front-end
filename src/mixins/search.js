import {adminAPI} from 'boot/axios'
import {process} from 'src/utils/apiDataPreProcessor'

export default {
  data() {
    return {
      searchLoading: false,
      showResults: false,
      tableData: [],
    }
  },
  methods: {
    callSearchApi(url, params, name) {
      process(params)
      this.searchLoading = true
      return new Promise((resolve, reject) => {
        adminAPI.get(url, { params })
          .then(response => {
            this.searchLoading = false
            this.tableData = response.data
            this.showResults = true
              console.log(`${name} search results loaded`)
            console.log(response)
            resolve(response)
          })
          .catch(error => {
            this.searchLoading = false
            console.log(`Search failed for ${name}`)
            console.log(error.response)
            reject(error)
          })
      })
    }
  }
}
