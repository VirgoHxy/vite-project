import { defineComponent, ref, reactive, onMounted } from 'vue';
import { ElForm, ElInput, ElButton, ElMessage, ElIcon, ElTooltip, ElFormItem } from 'element-plus';
import { User, Lock, Open } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import { AccountInfo } from '@/interface/index';
import { SET_ACCOUNTINFO } from '@/store/login/actionType';
import loginClass from '@/assets/styl/login.module.styl';
import RenderComponent from '@/components/component';

export default defineComponent({
  setup(props, context) {
    const data = reactive<{
      accountInfo: AccountInfo;
    }>({
      accountInfo: {
        account: '',
        password: ''
      }
    });
    const loginForm = ref<typeof ElForm | null>(null);
    const router = useRouter();
    const store = useStore();

    onMounted(() => {
      console.log(props);
      console.log(context);
    });

    function login() {
      if (!loginForm.value) return;
      loginForm.value.validate((valid: boolean) => {
        if (valid) {
          if (data.accountInfo.account === 'admin' && data.accountInfo.password === '1') {
            router.push({
              name: 'home',
              query: {
                id: new Date().getMilliseconds()
              },
              params: {
                account: data.accountInfo.account
              }
            });
            localStorage.setItem('accountInfo', JSON.stringify(data.accountInfo));
            store.dispatch(`login/${SET_ACCOUNTINFO}`, data.accountInfo);
          } else {
            data.accountInfo = {
              account: '',
              password: ''
            };
            localStorage.removeItem('accountInfo');
            ElMessage.error('用户名或密码错误');
          }
        } else {
          return false;
        }
      });
    }

    function keyUp({ code }: KeyboardEvent) {
      if (code === 'Enter') {
        login();
      }
    }

    return () => (
      <div id="login">
        <RenderComponent
          onDemo={() => {
            console.log('emit 触发了');
          }}
          title={'登录'}
          v-slots={{
            left: '请',
            right: '吧'
          }}
        >
          huahua
        </RenderComponent>
        <ElForm
          model={data.accountInfo}
          ref={loginForm}
          {...{
            onKeyup: keyUp
          }}
        >
          <ElFormItem
            label="账号"
            prop="account"
            rules={[{ required: true, message: '请输入用户名', trigger: 'blur' }]}
          >
            <ElInput
              placeholder="请输入用户名"
              v-model={data.accountInfo.account}
              v-slots={{
                prefix: (
                  <ElIcon
                    size={18}
                    class={loginClass.iconClass + ' el-input__icon'}
                    style={{
                      fontSize: '20px'
                    }}
                  >
                    <User />
                  </ElIcon>
                ),
                append: <span>*</span>
              }}
            ></ElInput>
          </ElFormItem>
          <ElFormItem
            label="密码"
            prop="password"
            rules={[{ required: true, message: '请输入密码', trigger: 'blur' }]}
          >
            <ElInput
              placeholder="请输入密码"
              type="password"
              suffix-icon={Open}
              v-model={data.accountInfo.password}
              v-slots={{
                prefix: (
                  <ElIcon
                    size={18}
                    class={loginClass.iconClass + ' el-input__icon'}
                    style={{
                      fontSize: '20px'
                    }}
                  >
                    <Lock />
                  </ElIcon>
                )
              }}
            ></ElInput>
          </ElFormItem>
          <ElFormItem>
            <ElTooltip placement="top" content="账号：admin 密码：1">
              <ElButton
                type="primary"
                style={{
                  width: '100%'
                }}
                {...{
                  onClick: login
                }}
              >
                登录
              </ElButton>
            </ElTooltip>
          </ElFormItem>
        </ElForm>
      </div>
    );
  }
});
