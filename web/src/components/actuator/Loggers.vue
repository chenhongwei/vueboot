<template>
  <div class="card card-page">
    <div class="card-header d-flex">
      <div>Loggers</div>
      <div class="ml-auto">
        <i class="fa space" :class="{'pointer': source, 'fa-eye': source, 'fa-eye-slash': !source}"
           aria-hidden="true" @click="showSource = source && true"></i>
        <raw :show="showSource" :raw="source" @close="showSource = false"></raw>
        <i @click="!loading && refresh()" class="fa fa-refresh" :class="{'pointer': !loading, 'fa-spin': loading}"
           aria-hidden="true"></i>
      </div>
    </div>
    <div class="card-body">
      <div id="loggers">
        <v-server-table url="http://localhost:8080/loggers" :columns="columns" :options="options">
          <template slot="update" scope="props">
            <div>
              <span class="badge badge-danger">Error</span>
            </div>
          </template>
        </v-server-table>
      </div>
    </div>
  </div>
</template>

<script>
  import Abstract from './Abstract'

  export default {
    name: 'Loggers',
    extends: Abstract,
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
            count: "{from} à {to} sur {count} résultats|{count} résultats|Un résultat",
            filter: "Filtrer:",
            filterPlaceholder: "Rechercher...",
            limit: "Résultats :",
            page: "Page :",
            noResults: "Aucune",
            filterBy: "Filter by {column}",
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
    },
    methods: {
      internalRefresh () {
        this.$api.loggers().then(response => {
          this.source = response.data
        }).catch(e => {
          this.$log.error('Error while getting loggers: ', e)
          this.error = e
        }).finally(() => {
          this.loading = false
        })
      }
    }
  }
</script>
