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
