<template>
	<transition name="modal">
		<div class="modal-mask" @click="close" v-show="show">
			<div class="modal-dialog" :class="size" role="document" @click.stop>
				<div class="modal-content">
					<slot></slot>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
export default {
  name: 'modal',
  props: {
    show: {
      default: false
    },
    size: {
      default: ''
    }
  },
  methods: {
    close: function () {
      this.$emit('close')
    }
  },
  mounted: function () {
    document.addEventListener('keydown', (e) => {
      if (this.show && e.keyCode === 27) {
        this.close()
      }
    })
  }
}
</script>
