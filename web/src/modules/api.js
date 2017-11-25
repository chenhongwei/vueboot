import axios from 'axios'

const ApiService = {}

ApiService.install = function (Vue, baseUrl, contextPath) {
  Vue.prototype.$api = {
    health () {
      return axios.get(`${baseUrl}${contextPath}health`)
    },
    metrics () {
      return axios.get(`${baseUrl}${contextPath}metrics`)
    },
    env () {
      return axios.get(`${baseUrl}${contextPath}env`)
    },
    mappings () {
      return axios.get(`${baseUrl}${contextPath}mappings`)
    },
    beans () {
      return axios.get(`${baseUrl}${contextPath}beans`)
    },
    configprops () {
      return axios.get(`${baseUrl}${contextPath}configprops`)
    },
    loggers () {
      return axios.get(`${baseUrl}${contextPath}loggers`)
    },
    dump () {
      return axios.get(`${baseUrl}${contextPath}dump`)
    },
    autoconfig () {
      return axios.get(`${baseUrl}${contextPath}autoconfig`)
    },
    trace () {
      return axios.get(`${baseUrl}${contextPath}trace`)
    }
  }
}

export default ApiService
