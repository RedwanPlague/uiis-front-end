import {adminAPI} from 'boot/axios'

export default {
  data() {
    return {
      createLoading: false,
    }
  },
  methods: {
    callCreateApi(url, data, name) {
      this.createLoading = true
      return new Promise((resolve, reject) => {
        adminAPI.post(url, data)
          .then(response => {
            this.createLoading = false
            const message = `${name} created successfully`
            this.$q.notify({
              message,
              type: 'positive'
            })
            console.log(message)
            console.log(response)
            resolve(response)
          })
          .catch(error => {
            this.createLoading = false
            const message = `Failed to create ${name}`
            this.$q.notify({
              message,
              type: 'negative'
            })
            console.log(message)
            console.log(error.response)
            reject(error)
          })
      })
    }
  }
}
