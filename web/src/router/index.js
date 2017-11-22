import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import User from '@/components/User'
import NotFound from '@/components/NotFound'
import actuator from './actuator'

Vue.use(Router)

export default new Router({
  routes: [ ...actuator,
    { path: '/', name: 'Home', component: Home },
    { path: '/user', name: 'User', component: User },
    { path: '/404', component: NotFound },
    { path: '*', redirect: '/404' }
  ]
})
