<template>
  <div id="app">
    <notifications group="general" position="top right" classes="notification-custom" :width="300" :duration="5000" :speed="500" />
    <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top">
      <router-link :to="{ path: '/' }" class="navbar-brand">Vue</router-link>
      <button class="navbar-toggler pointer" type="button" data-toggle="collapse" :aria-expanded="navbarExp"
      aria-label="Toggle navigation" @click.stop="toggleNavbar()" v-click-outside="closeNavbar">
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
        <li class="nav-item dropdown pointer"
        v-bind:class="{active: $router.currentRoute.path.startsWith('/admin')}">
        <router-link :to="{ path: '/admin' }" class="nav-link dropdown-toggle dropdown-toggle-no-caret"
        id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true"
        :aria-expanded="settings">
        <i class="fa fa-cog" aria-hidden="true"></i>
        <span>Administration</span>
        <i class="fa fa-caret-down pr-2 pl-2" aria-hidden="true" @click.stop.prevent="toggleSettings()"
        v-click-outside="closeSettings"></i>
      </router-link>
      <div class="dropdown-menu" aria-labelledby="navbarDropdown" :style="{display: settings ? 'unset' : 'none'}">
        <router-link class="nav-link" v-for="link of admin" v-if="link.path !== ''" :key="link.path"
        v-on:click.native="closeNavbar" :to="{ path: '/admin/' + link.path }"
        :disabled="$router.currentRoute.name === link.title">
        <span>{{link.name}}</span>
      </router-link>
    </div>
  </li>
</ul>
<ul class="navbar-nav ml-auto">
  <li class="nav-item dropdown pointer" @click.stop="toggleLanguages()" v-click-outside="closeLanguages">
    <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown"
    aria-haspopup="true"
    :aria-expanded="lang">
    <i class="fa fa-flag" aria-hidden="true"></i>
    <span>Languages</span>
  </a>
  <div class="dropdown-menu" aria-labelledby="navbarDropdown" :style="{display: lang ? 'unset' : 'none'}">
    <a class="nav-link" v-for="(display,key) of languages" :key="key" @click="setLang(key)"
    v-if="current() !== key">
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
import Pagination from './components/Pagination'
import Pie from './components/Pie'
import ActuatorRoutes from './components/actuator/actuator'
import ClickOutside from 'v-click-outside'
import VueCodeMirror from 'vue-codemirror'
import Notifications from 'vue-notification'
import VueClipboard from 'vue-clipboard2'
import VueTooltip from 'v-tooltip'
import {ServerTable, ClientTable} from 'vue-tables-2'

Vue.use(Notifications)
Vue.use(VueCodeMirror)
Vue.use(Vuex)
Vue.use(ClickOutside)
Vue.use(VueClipboard)
Vue.use(VueTooltip)

const tableOptions = {
  texts: {
    count: '{from} à {to} sur {count} résultats|{count} résultats|Un résultat',
    filter: 'Filtrer:',
    filterPlaceholder: 'Rechercher...',
    limit: 'Résultats :',
    page: 'Page :',
    noResults: 'Aucune',
    filterBy: 'Filter by {column}',
    loading: 'Loading...',
    defaultOption: 'Select {column}'
  },
  skin: 'table-striped table-bordered table-hover',
  perPage: 10,
  perPageValues: [10, 25, 50, 100],
  sortIcon: {
    base: 'fa', up: 'fa-caret-up', down: 'fa-caret-down', is: 'fa-sort'
  }
}

Vue.use(ClientTable, tableOptions, false)
Vue.use(ServerTable, tableOptions, false)

Vue.use(LoggerService)
Vue.use(I18nService)
Vue.use(ApiService, process.env.BASE_URL, process.env.MANAGE_CONTEXT_PATH)

Vue.component('modal', Modal)
Vue.component('confirm', Confirm)
Vue.component('raw', Raw)
Vue.component('pagination', Pagination)

Vue.component('pie', Pie)

const store = new Vuex.Store()
Vue.use(vuexI18n.plugin, store, {
  onTranslationNotFound (locale, key) {
    Vue.$log.warn(`i18n :: Key '${key}' not found for locale '${locale}'`)
  }
})

let requestsCounter = 0

nprogress.configure({showSpinner: false})

axios.interceptors.request.use(function (config) {
  requestsCounter++
  nprogress.start()
  return config
})

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
    this.$languages.changeLanguage('fr').finally(() => {
      this.ready = true
    })
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

$fa-font-path: "~font-awesome/fonts";
@import "~font-awesome/scss/font-awesome";

@import "../scss/_colors";
@import "~bootstrap/scss/bootstrap";
@import "../scss/_styles";
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
