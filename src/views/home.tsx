import { defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { ElButton } from 'element-plus';

import { SET_ACCOUNTINFO, GET_ACCOUNTINFO } from '@/store/login/actionType';

export default defineComponent({
  setup(props, ctx) {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    console.log(route.query);
    console.log(route.params);
    console.log(store.getters[`login/${GET_ACCOUNTINFO}`]);
    function loginOut() {
      localStorage.removeItem('accountInfo');
      store.dispatch(`login/${SET_ACCOUNTINFO}`, {})
      router.push({
        name: 'login'
      });
    }
    return {
      loginOut
    };
  },
  render() {
    const { loginOut } = this;
    return (
      <div id="home">
        <ElButton
          type="primary"
          {...{
            onClick: loginOut
          }}
        >
          退出
        </ElButton>
      </div>
    );
  }
});
