<template>
  <div class="card card-page">
    <div class="card-header d-flex">
      <div>User</div>
      <div class="ml-auto">
        <i @click="refresh()" class="fa" :class="{'pointer': !loading, 'fa-refresh': !loading, 'fa-circle-o-notch': loading, 'fa-spin': loading}" aria-hidden="true"></i>
      </div>
    </div>
    <div class="card-body">
    </div>
  </div>
</template>

<script>
export default {
  name: 'User',
  data () {
    return {
      loading: false,
      user: {},
      error: null
    }
  },
  created () {
    this.refresh()
  },
  methods: {
    refresh () {
    }
  }
}
</script>
