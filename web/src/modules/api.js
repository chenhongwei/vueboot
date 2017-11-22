import axios from 'axios'

const ApiService = {}

ApiService.install = function (Vue, baseUrl) {
  Vue.prototype.$api = {
    health () {
      return axios.get(`${baseUrl}health`)
    },
    metrics () {
      return axios.get(`${baseUrl}metrics`)
    },
    env () {
      return axios.get(`${baseUrl}env`)
    },
    mappings () {
      return axios.get(`${baseUrl}mappings`)
    },
    beans () {
      return axios.get(`${baseUrl}beans`)
    },
    configprops () {
      return axios.get(`${baseUrl}configprops`)
    },
    loggers () {
      return axios.get(`${baseUrl}loggers`)
    },
    dump () {
      return axios.get(`${baseUrl}dump`)
    },
    autoconfig () {
      return axios.get(`${baseUrl}autoconfig`)
    },
    trace () {
      return axios.get(`${baseUrl}trace`)
    }
  }
}

export default ApiService
