<script>
export default {
  data () {
    return {
      source: null,
      showSource: false,
      loading: false,
      error: null
    }
  },
  created () {
    this.refresh()
  },
  methods: {
    refresh () {
      this.source = null
      this.loading = true
      this.internalRefresh()
    }
  }
}
</script>
