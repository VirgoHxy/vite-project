import { defineComponent } from 'vue'

export default defineComponent({
  props: {},
  emits: [],
  components: {},
  setup(props, ctx) {
    return () => <div id='404'>404</div>
  }
})
