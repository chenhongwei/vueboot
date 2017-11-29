<template>
  <div class="card card-page">
    <div class="card-header">Home</div>
    <div class="card-body">
      <div class="row">
        <div class="col-md-4">
          <img src="../../static/img/logo.png">
        </div>
        <div class="col-md">
          <h1>{{ msg }}</h1>
          <p v-cloak>{{ $t('content', {'content': 'nice'}) }}</p>
          <p v-cloak>{{ $t('content2') }}</p>
        </div>
      </div>

      <div class="Chart">
        <pie :data="{labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],datasets: [{label: 'Data One',backgroundColor: '#f87979',data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]}]}" :options="{responsive: true, maintainAspectRatio: false}"></pie>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted () {
    this.$notify({
      group: 'general',
      title: 'Important message',
      text: 'Hello user! This is a notification!'
    })
  }
}
</script>
