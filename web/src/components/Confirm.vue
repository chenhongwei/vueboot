<template>
	<modal :show="show" :size="size" @close="close">
		<div class="modal-header">
			<slot name="header">
				<h5 class="modal-title" id="exampleModalLabel">{{title}}</h5>
				<button type="button" class="close pointer" data-dismiss="modal" @click="close" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</slot>
		</div>
		<div class="modal-body">
			<slot name="body">{{message}}</slot>
		</div>
		<div class="modal-footer">
			<slot name="header">
				<button type="button" class="pointer btn btn-secondary" @click="close" data-dismiss="modal">{{cancelBtn}}</button>
				<button type="button" class="pointer btn btn-primary" @click="confirm">{{confirmBtn}}</button>
			</slot>
		</div>
	</modal>
</template>

<script>
export default {
  props: {
    show: {
      default: false
    },
    title: {
      default: 'Confirmation'
    },
    message: {
      default: 'Are you sure ?'
    },
    size: {
      default: ''
    },
    cancelBtn: {
      default: 'Cancel'
    },
    confirmBtn: {
      default: 'Confirm'
    }
  },
  methods: {
    close: function () {
      this.$emit('close')
    },
    confirm: function () {
      this.$emit('confirm')
      this.close()
    }
  }
}
</script>

