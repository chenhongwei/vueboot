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
import i18n from '../modules/i18n'

export default {
  name: 'HelloWorld',
  mixins: [i18n],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
