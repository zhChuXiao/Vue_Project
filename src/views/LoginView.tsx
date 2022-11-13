import { defineComponent, ref, getCurrentInstance, onMounted, h } from 'vue';
import { reactive } from 'vue';
import { login, getImageCaptcha } from '@/api/login';
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus';
import { useStore } from 'vuex';
// 类型
import type { Ref } from 'vue';
import type { FormInstance, Action } from 'element-plus';
import type { AxiosResponse } from 'axios';
// css 模块化
import loginStyle from '@/assets/css/login.module.css';
export default defineComponent({
  setup(): () => JSX.Element {
    onMounted(async () => {
      getimgUrl();
    });
    const store = useStore();
    const _this = (getCurrentInstance() as any).proxy;
    // 表单数据
    interface Rule {
      username: string;
      password: string;
      verifyCode: string;
      captchaId: string;
      checkPass: string;
    }
    const ruleForm: Rule = reactive<Rule>({
      username: '',
      password: '',
      verifyCode: '',
      captchaId: '',
      checkPass: '',
    });
    // 表单
    const ruleFormRef: Ref<FormInstance | null> = ref<FormInstance | null>(null);
    // 验证码
    const imgUrl: Ref<string> = ref('');
    // 获取验证码
    const getimgUrl: () => Promise<void> = async (): Promise<void> => {
      let res: AxiosResponse<any, any> = await getImageCaptcha({
        width: 100,
        height: 50,
      });
      ruleForm.captchaId = res.data.id;
      imgUrl.value = res.data.img;
      ElMessage.closeAll();
    };
    // 验证规则
    const validatePass = (rule: any, value: any, callback: any) => {
      if (value === '') {
        callback(new Error('密码不能为空'));
      } else {
        callback();
      }
    };
    const validateVerifyCode = (rule: any, value: any, callback: any) => {
      if (value === '') {
        callback(new Error('验证码不能为空'));
      } else if (value.length > 4) {
        callback(new Error('验证码只有四位'));
      } else {
        callback();
      }
    };
    const validateUser = (rule: any, value: any, callback: any) => {
      if (value === '') {
        callback(new Error('用户名不能为空'));
      } else {
        callback();
      }
    };
    const validatePass2 = (rule: any, value: any, callback: any) => {
      if (value === '') {
        callback(new Error('请输入确认密码'));
      } else if (value !== ruleForm.password) {
        callback(new Error('卵货，两次密码不一致'));
      } else {
        callback();
      }
    };
    // 验证规则
    const rules = reactive({
      username: [{ validator: validateUser, trigger: 'blur' }],
      password: [{ validator: validatePass, trigger: 'blur' }],
      checkPass: [{ validator: validatePass2, trigger: 'blur' }],
      verifyCode: [{ validator: validateVerifyCode, trigger: 'change' }],
    });
    // 提交按钮
    const submitForm: (formEl: FormInstance | undefined) => void = (
      formEl: FormInstance | undefined,
    ): void => {
      ElMessage.closeAll();
      if (!formEl) return;
      formEl.validate(async (valid): Promise<any> => {
        if (valid) {
          let res: any = await login({
            username: ruleForm.username,
            password: ruleForm.password,
            verifyCode: ruleForm.verifyCode,
            captchaId: ruleForm.captchaId,
          });

          res.code === 10002 &&
            ElMessageBox.alert(res.message, '注意', {
              confirmButtonText: 'OK',
              callback: (action: Action) => {
                ruleForm.verifyCode = '';
                getimgUrl();
              },
            });
          res.code === 200 && store.dispatch('AccountInfo'),
            _this.$router.push('/'),
            ElMessage.closeAll(),
            ElNotification({
              title: '提示',
              message: h('b', { style: 'color: teal' }, '登录成功'),
              type: 'success',
            });
        } else {
          console.log('error submit!');
          return false;
        }
      });
    };
    // 重置按钮
    const resetForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.resetFields();
    };
    // 切换类型
    const type: Ref<boolean> = ref(true);
    // 样式
    interface Style {
      readonly [propNames: string]: string;
    }
    const contentStyle: Style = {
      height: '100vh',
      color: '#fff',
      lineHeight: '460px',
      textAlign: 'center',
    };
    /**
     * jsx
     */
    return (): JSX.Element => (
      <div
        style={{
          ...contentStyle,
          backgroundSize: 'cover',
        }}
        class={loginStyle.bg}
      >
        <div class={loginStyle.loginBox}>
          {/* 登录框 */}
          <div class={loginStyle.loginContainer}>
            <div class={`${loginStyle.layout} loginLayout`}>
              {/**
               * 判断状态 渲染登录/注册按钮
               */}
              {type.value ? (
                <el-button
                  style={{
                    background: 'rgba(255,255,255,.5)',
                    height: '50px',
                    backdropFilter: 'blur(5px)',
                    border: 'none',
                    boxShadow: '0 0 10px 3px rgba(255,255,255,.5)',
                  }}
                  color={'#626aef'}
                  dark={true}
                  size={'large'}
                  round
                  onClick={() => {
                    (
                      document.querySelector('.loginLayout') as HTMLDivElement
                    ).style.left = '400px';
                    // ;(document.querySelector('.login') as HTMLDivElement).style.left = '-400px'
                    (
                      document.querySelector('.loginLayout') as HTMLDivElement
                    ).style.backgroundPosition = 'top 0px left -440px';
                    // 修改注册状态
                    type.value = false;
                  }}
                >
                  点击注册新账号
                </el-button>
              ) : (
                <el-button
                  style={{
                    background: 'rgba(255,255,255,.5)',
                    height: '50px',
                    backdropFilter: 'blur(5px)',
                    border: 'none',
                    boxShadow: '0 0 10px 3px rgba(255,255,255,.5)',
                  }}
                  color={'#626aef'}
                  dark={true}
                  size={'large'}
                  round
                  onClick={() => {
                    (
                      document.querySelector('.loginLayout') as HTMLDivElement
                    ).style.left = '0px';
                    // ;(document.querySelector('.login') as HTMLDivElement).style.left = '0px'
                    (
                      document.querySelector('.loginLayout') as HTMLDivElement
                    ).style.backgroundPosition = 'top 0px left -40px';
                    // 修改登录状态
                    type.value = true;
                  }}
                >
                  点击登录账号
                </el-button>
              )}
            </div>
            {/* 登录狂 */}
            <div class={`${loginStyle.login} login`}>
              {/* form */}
              <el-form
                ref={ruleFormRef}
                model={ruleForm}
                rules={rules}
                label-width="120px"
                class="demo-ruleForm"
              >
                <el-form-item label="用户名" prop="username">
                  <el-input
                    v-model={ruleForm.username}
                    autocomplete="off"
                    placeholder="rootadmin"
                  />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                  <el-input
                    v-model={ruleForm.password}
                    type="password"
                    autocomplete="off"
                    placeholder="123456"
                  />
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                  <el-input
                    v-model={ruleForm.checkPass}
                    type="password"
                    autocomplete="off"
                  />
                </el-form-item>
                {/* 验证码 */}
                <el-row>
                  <el-col span={15}>
                    <el-form-item label="验证码" prop="verifyCode">
                      <el-input v-model={ruleForm.verifyCode} autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col span={4}>
                    {/* 验证码图片 */}
                    <el-image
                      style="width: 100px; height: 50px; display: block; position: relative; top:-10px; left:10px; background-color:#fff; border-radius:10px; cursor:pointer"
                      src={imgUrl.value}
                      onClick={getimgUrl}
                      title="看不清？更换验证码"
                    />
                  </el-col>
                </el-row>

                <el-form-item>
                  <el-button
                    type="primary"
                    onClick={() => submitForm((ruleFormRef as any)._rawValue as any)}
                  >
                    提交
                  </el-button>
                  <el-button
                    onClick={() => resetForm((ruleFormRef as any)._rawValue as any)}
                  >
                    重置
                  </el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    );
  },
});
