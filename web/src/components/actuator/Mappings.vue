<template>
  <div class="card card-page">
    <div class="card-header d-flex">
      <div>Mappings</div>
      <div class="ml-auto">
        <i class="fa space" :class="{'pointer': source, 'fa-eye': source, 'fa-eye-slash': !source}"
           aria-hidden="true" @click="showSource = source && true"></i>
        <raw :show="showSource" :raw="source" @close="showSource = false"></raw>
        <i @click="!loading && refresh()" class="fa fa-refresh" :class="{'pointer': !loading, 'fa-spin': loading}"
           aria-hidden="true"></i>
      </div>
    </div>
    <div class="card-body">
    </div>
  </div>
</template>

<script>
  import Abstract from './Abstract'

  export default {
    name: 'Mappings',
    extends: Abstract,
    methods: {
      internalRefresh () {
        this.$api.mappings().then(response => {
          this.source = response.data
        }).catch(e => {
          this.$log.error('Error while getting mappings: ', e)
          this.error = e
        }).finally(() => {
          this.loading = false
        })
      }
    }
  }
</script>
