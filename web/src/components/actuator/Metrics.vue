<template>
  <div class="card card-page">
    <div class="card-header d-flex">
      <div>Metrics</div>
      <div class="ml-auto">
        <i class="fa space" :class="{'pointer': metrics, 'fa-eye': metrics, 'fa-eye-slash': !metrics}"
           aria-hidden="true" @click="showSource = true"></i>
        <raw :show="showSource" :raw="metrics" @close="showSource = false"></raw>
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
    name: 'Metrics',
    extends: Abstract,
    methods: {
      internalRefresh () {
        this.$api.metrics().then(response => {
          this.source = response.data
        }).catch(e => {
          this.$log.error('Error while getting metrics: ', e)
          this.error = e
        }).finally(() => {
          this.loading = false
        })
      }
    }
  }
</script>
