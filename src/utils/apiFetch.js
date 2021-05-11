import {adminAPI} from 'boot/axios'

// encapsulates simple get requests
const apiFetch = (url, params, name) => {
  return new Promise((resolve, reject) => {
    adminAPI.get(url, { params })
      .then(response => {
        console.log(`${name} loaded`)
        console.log(response)
        resolve(response)
      })
      .catch(error => {
        console.log(`${name} loading failed`)
        console.log(error.response)
        reject(error)
      })
  })
}

export default apiFetch
