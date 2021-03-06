import {adminAPI} from 'boot/axios'
import {deepCopy} from 'src/utils/utilities'
import {process} from 'src/utils/apiDataPreProcessor'

export default {
  data() {
    return {
      viewing: true,
      editLoading: false,
      oldDataLoading: false,
      oldData: {}
    }
  },
  computed: {
    label() {
      return this.viewing ? 'View' : 'Edit'
    }
  },
  methods: {
    loadOldDataIntoForm() {
      for (const key of Object.keys(this.oldData)) {
        this[key] = deepCopy(this.oldData[key])
      }
    },
    fetchOldData(url, params, name, take = 0) {
      this.oldDataLoading = true
      return new Promise((resolve, reject) => {
        adminAPI.get(url, { params })
          .then(response => {
            if (response.data.length === 0) {
              reject({doesNotExist: true})
            }
            this.oldDataLoading = false
            if (take === 0) {
              this.oldData = response.data[0]
            }
            else {
              this.oldData = response.data
            }
            this.loadOldDataIntoForm()
            console.log(`Old data for ${name} loaded`)
            console.log(response)
            resolve(response)
          })
          .catch(error => {
            this.oldDataLoading = false
            console.log(`Failed to load Old data for ${name}`)
            console.log(error.response)
            this.$q.notify({
              message: `Failed to load data for ${name}`,
              type: 'negative'
            })
            reject(error)
          })
      })
    },
    callEditApi(url, data, name) {
      process(data)
      this.editLoading = true
      return new Promise((resolve, reject) => {
        adminAPI.patch(url, data)
          .then(response => {
            this.editLoading = false
            this.oldData = deepCopy(data)
            const message = `${name} updated successfully`
            this.$q.notify({
              message,
              type: 'positive'
            })
            console.log(message)
            console.log(response)
            resolve(response)
          })
          .catch(error => {
            this.editLoading = false
            const message = `Failed to update ${name}, Please Try Again`
            this.$q.notify({
              message,
              type: 'negative'
            })
            console.log(message)
            console.log(error.response)
            reject(error)
          })
      })
    },
  }
}
