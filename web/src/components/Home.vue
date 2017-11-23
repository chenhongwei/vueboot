<template>
  <div class="hello">
    <div class="card card-page">
      <div class="card-header">Home</div>
      <div class="card-body">
        <h1>{{ msg }}</h1>
        <p v-cloak>{{ $t('content', {'content': 'nice'}) }}</p>
        <p v-cloak>{{ $t('content2') }}</p>
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
        type: 'success',
        title: 'Important message',
        text: 'Hello user! This is a notification!'
      })
    }
  }
</script>
