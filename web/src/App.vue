<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top">
      <a class="navbar-brand" href="#">Vue</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" :aria-expanded="navbarExp" aria-label="Toggle navigation" @click.stop="toggleNavbar()" v-click-outside="closeNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" :style="{display: navbarExp ? 'unset' : 'none'}">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item" v-bind:class="{active: $router.currentRoute.name === 'Home'}">
            <router-link :to="{ path: '/' }" class="nav-link">
              <i class="fa fa-home" aria-hidden="true"></i>
              <span>Home</span>
            </router-link>
          </li>
          <li class="nav-item dropdown pointer" @click.stop="toggleSettings()" v-click-outside="closeSettings" v-bind:class="{active: $router.currentRoute.path.startsWith('/admin')}">
            <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true"
               :aria-expanded="settings">
              <i class="fa fa-cog" aria-hidden="true"></i>
              <span>Administration</span>
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown" :style="{display: settings ? 'unset' : 'none'}">
              <router-link class="nav-link" v-for="link of admin" v-if="link.path !== ''" :key="link.path" v-on:click.native="closeNavbar" :to="{ path: '/admin/' + link.path }" :disabled="$router.currentRoute.name === link.title">
                <span>{{link.name}}</span>
              </router-link>
            </div>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item dropdown pointer" @click.stop="toggleLanguages()" v-click-outside="closeLanguages">
            <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true"
               :aria-expanded="lang">
              <i class="fa fa-flag" aria-hidden="true"></i>
              <span>Languages</span>
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown" :style="{display: lang ? 'unset' : 'none'}">
              <a class="nav-link" v-for="(display,key) of languages" :key="key" @click="setLang(key)" v-if="current() !== key">
                <span>{{display}}</span>
              </a>
            </div>
          </li>
        </ul>
      </div>
    </nav>

    <div id="main" class="container-fluid d-flex justify-content-center">
      <router-view v-cloak v-if="ready"/>
    </div>
  </div>
</template>

<script>
import nprogress from 'nprogress'
import axios from 'axios'
import Vue from 'vue'
import ApiService from './modules/api'
import LoggerService from './modules/logger'
import I18nService from './modules/i18n'
import Vuex from 'vuex'
import vuexI18n from 'vuex-i18n'
import Modal from './components/Modal'
import Confirm from './components/Confirm'
import Raw from './components/Raw'
import ActuatorRoutes from './router/actuator'
import ClickOutside from 'v-click-outside'
import VueCodeMirror from 'vue-codemirror'

Vue.use(VueCodeMirror)
Vue.use(Vuex)
Vue.use(ClickOutside)

Vue.use(LoggerService)
Vue.use(I18nService)
Vue.use(ApiService, process.env.BASE_URL)

Vue.component('modal', Modal)
Vue.component('confirm', Confirm)
Vue.component('raw', Raw)

const store = new Vuex.Store()
Vue.use(vuexI18n.plugin, store, {
  onTranslationNotFound (locale, key) {
    Vue.$log.warn(`i18n :: Key '${key}' not found for locale '${locale}'`)
  }
})

let requestsCounter = 0

nprogress.configure({ showSpinner: false })

axios.interceptors.request.use(function (config) {
  requestsCounter++
  nprogress.start()
  return config
})

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  if ((--requestsCounter) === 0) {
    nprogress.done()
  }
  return response
}, function (error) {
  if ((--requestsCounter) === 0) {
    nprogress.done()
  }
  return Promise.reject(error)
})

export default {
  name: 'app',
  data () {
    return {
      ready: false,
      settings: false,
      lang: false,
      navbarExp: false,
      languages: {'fr': 'Français', 'en': 'English'},
      admin: ActuatorRoutes[0].children
    }
  },
  mounted () {
    this.$log.debug('Env:', process.env)
    this.ready = true
    this.$languages.changeLanguage('fr').then(() => { this.ready = true })
  },
  methods: {
    toggleLanguages () {
      this.lang = !this.lang
    },
    toggleSettings () {
      this.settings = !this.settings
    },
    toggleNavbar () {
      this.navbarExp = !this.navbarExp
    },
    closeLanguages () {
      if (this.lang) {
        this.lang = false
      }
    },
    closeSettings () {
      if (this.settings) {
        this.settings = false
      }
    },
    closeNavbar () {
      if (this.navbarExp) {
        this.navbarExp = false
      }
    },
    setLang (language) {
      this.$languages.changeLanguage(language)
      this.closeNavbar()
    },
    current () {
      return Vue.i18n.locale()
    }
  }
}
</script>

<style lang="scss">
@import "../scss/_colors";

@import "~bootstrap/scss/bootstrap";

@import "../scss/_styles";

$fa-font-path: "~font-awesome/fonts";
@import "~font-awesome/scss/font-awesome";
</style>

<style>
[v-cloak] {
  display: none;
}
body {
  margin: unset;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#main {
  padding: 15px;
}
</style>
