import { ref, renderSlot, defineComponent } from 'vue'

export default defineComponent({
  props: {
    title: String
  },
  emits: ['demo'],
  components: {},
  // 逻辑
  setup(props, ctx) {
    const desc = ref<string>('vite');
    return {
      desc
    }
  },
  // 渲染
  render() {
    // render函数在响应式数据发生更改时会自动触发（与react类似）
    const { $emit, $slots, title, desc } = this;
    return (
      <div class="render-component" onClick={() => {$emit('demo')}}>
        <h3 style={{
          margin: '0 0 4px 0',
          padding: 0
        }}>
          {renderSlot($slots, "left")}
          {title}
          {renderSlot($slots, "right")}
        </h3>
        <div style={{
          textAlign: 'right',
          marginBottom: '14px',
          fontSize: '14px'
        }}>
          描述: {desc} by {renderSlot($slots, "default")}
        </div>
      </div>
    );
  }
})
