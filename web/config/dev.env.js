'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_URL: process.env.ENV_TYPE == 'demo' ? '""' : '"http://localhost:8080/"',
  MANAGE_CONTEXT_PATH: '"manage/"'
})
