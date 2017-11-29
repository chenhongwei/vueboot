# VueBoot

> A Spring Boot with Vue.js site project

## Plugins

* https://github.com/vuejs/vue-router
* https://github.com/axios/axios
* https://github.com/dkfbasel/vuex-i18n
* https://github.com/rstacruz/nprogress/
* https://github.com/surmon-china/vue-codemirror/
* https://github.com/matfish2/vue-tables-2
* https://github.com/Akryum/v-tooltip
* https://github.com/Inndy/vue-clipboard2
* https://github.com/euvl/vue-notification
* https://github.com/apertureless/vue-chartjs

## Links

* https://github.com/vuejs/awesome-vue
* https://vuejsdevelopers.com/2017/05/15/vue-js-what-is-vuex/

## Code

### Table (server side)

```html
<div id="loggers">
  <v-server-table url="http://localhost:8080/loggers" :columns="columns" :options="options">
    <template slot="update" slot-scope="props">
      <div>
        <span class="badge badge-danger">Error</span>
      </div>
    </template>
  </v-server-table>
</div>
```

```js
data () {
  return {
    columns: ['name', 'configuredLevel', 'effectiveLevel', 'update'],
    options: {
      sortable: ['name', 'configuredLevel', 'effectiveLevel'],
      columnsClasses: {
        name: 'logger-column-name',
        configuredLevel: 'logger-column-level-conf',
        effectiveLevel: 'logger-column-level-eff'
      },
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
      headings: {
        name: 'Logger Name',
        configuredLevel: 'Configured Level',
        effectiveLevel: 'Effective Level'
      },
      requestFunction: function (data) {
        return this.$api.loggers().then((response) => {
          return Object.assign({params: data}, response)
        })
      },
      responseAdapter: function (response) {
        console.log(response)
        let ar = Object.keys(response.data.loggers).map(function (key) {
          return Object.assign({name: key}, response.data.loggers[key])
        })
        return {
          data: ar.slice(response.params.limit * (response.params.page - 1), response.params.limit * response.params.page),
          count: ar.length
        }
      },
      perPage: 8,
      perPageValues: [8, 17, 50, 100, 200, 400],
      sortIcon: {
        base: 'fa', up: 'fa-caret-up', down: 'fa-caret-down', is: 'fa-sort'
      }
    }
  }
  }
```
