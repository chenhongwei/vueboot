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
        <v-client-table :data="loggers" :columns="columns" :options="options">
          <template slot="child_row" slot-scope="props">
            <div><b>name:</b> {{props.row.name}}</div>
          </template>
        </v-client-table>
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
      loggers: [],
      columns: ['name', 'configuredLevel', 'effectiveLevel', 'update'],
      headings: {
        name: 'Logger Name',
        configuredLevel: 'Configured Level',
        effectiveLevel: 'Effective Level'
      },
      options: {
        sortable: ['name', 'configuredLevel', 'effectiveLevel'],
        columnsClasses: {
          name: 'logger-column-name',
          configuredLevel: 'logger-column-level-conf',
          effectiveLevel: 'logger-column-level-eff'
        }
      }
    }
  },
  methods: {
    internalRefresh () {
      this.$api.loggers().then(response => {
        this.source = response.data
        this.loggers = Object.keys(response.data.loggers).map(function (key, index) {
          return Object.assign({id: index, name: key}, response.data.loggers[key])
        })
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
