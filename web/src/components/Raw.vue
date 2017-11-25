<template>
	<modal :show="show" :size="size" @close="close">
		<div class="modal-header">
			<slot name="header">
				<h5 class="modal-title" id="rawModal">{{title}}</h5>
				<button type="button" class="close pointer" data-dismiss="modal" @click="close" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</slot>
		</div>
		<div class="modal-body">
			<slot name="body">
				<div class="editor-auto">
					<codemirror ref="editor" :code="code" :options="editorOption"></codemirror>
				</div>
			</slot>
		</div>
		<div class="modal-footer">
			<slot name="header">
        <button v-if="showCopy" v-clipboard:copy="code" v-clipboard:success="success" v-clipboard:error="error" class="pointer btn btn-secondary" data-dismiss="modal">{{copyBtn}}</button>
        <button type="button" class="pointer btn btn-secondary" @click="close" data-dismiss="modal">{{closeBtn}}</button>
      </slot>
    </div>
  </modal>
</template>

<script>
import { codemirror } from 'vue-codemirror'
export default {
  components: {
    codemirror
  },
  data () {
    return {
      editorOption: {
        readOnly: true,
        tabSize: 2,
        lineNumbers: true,
        line: true,
        mode: this.mode,
        theme: 'mdn-like'
      }
    }
  },
  props: {
    show: {
      default: false
    },
    title: {
      default: 'Source'
    },
    size: {
      default: 'modal-lg'
    },
    raw: {
      default: 'raw'
    },
    mode: {
      default: 'text/javascript'
    },
    showCopy: {
      default: true
    },
    copyBtn: {
      default: 'Copy'
    },
    closeBtn: {
      default: 'Close'
    }
  },
  watch: {
    show: function (value) {
      if (value) {
        this.refresh()
      }
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    refresh () {
      setTimeout(() => this.$refs.editor.refresh(), 0)
    },
    success () {
      this.$notify({group: 'general', type: 'success', title: 'Copied to clipboard'})
    },
    error () {
      this.$notify({group: 'general', type: 'error', title: 'Unable to copy to clipboard'})
    }
  },
  computed: {
    code () {
      return JSON.stringify(this.raw, null, 2)
    }
  }
}
</script>

