import {adminAPI} from 'boot/axios'

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
    fetchOldData(url, params, name) {
      this.oldDataLoading = true
      return new Promise((resolve, reject) => {
        adminAPI.get(url, { params })
          .then(response => {
            this.oldDataLoading = false
            this.oldData = response.data[0]
            console.log(`Old data for ${name} loaded`)
            console.log(response)
            resolve(response)
          })
          .catch(error => {
            this.oldDataLoading = false
            console.log(`Failed to load Old data for ${name}`)
            console.log(error.response)
            reject(error)
          })
      })
    },
    callEditApi(url, data, name) {
      this.editLoading = true
      return new Promise((resolve, reject) => {
        adminAPI.patch(url, data)
          .then(response => {
            this.editLoading = false
            const message = `${name} edited successfully`
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
            const message = `Failed to edit ${name}`
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
