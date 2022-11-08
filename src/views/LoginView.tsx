import { defineComponent, ref, getCurrentInstance } from 'vue';
import { reactive } from 'vue';
import type { Ref } from 'vue';
import type { FormInstance } from 'element-plus';

import loginStyle from '@/assets/css/login.module.css';
export default defineComponent({
  setup(): () => JSX.Element {
    const _this = (getCurrentInstance() as any).proxy;
    console.log(_this);
    const ruleFormRef: any = ref();

    const validatePass = (rule: any, value: any, callback: any) => {
      if (value === '') {
        callback(new Error('密码不能为空'));
      } else {
        if (checkPass.value !== '') {
          if (!ruleFormRef.value) return;
          ruleFormRef.value.validateField('checkPass', () => null);
        }
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
    // 表单数据
    const ruleForm = reactive({
      username: '',
      password: '',
      verifyCode: '',
    });
    const checkPass: Ref<string> = ref('');
    // 验证规则
    const rules = reactive({
      pass: [{ validator: validatePass, trigger: 'blur' }],
      checkPass: [{ validator: validatePass2, trigger: 'blur' }],
    });
    // 提交按钮
    const submitForm = (formEl: FormInstance | undefined) => {
      console.log(formEl);
      if (!formEl) return;
      formEl.validate((valid) => {
        if (valid) {
          console.log('submit!');
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
              {/* 登录按钮 */}
              {/**
               * 判断状态 渲染登录/注册
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
                  <el-input v-model={ruleForm.username} autocomplete="off" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                  <el-input
                    v-model={ruleForm.password}
                    type="password"
                    autocomplete="off"
                  />
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                  <el-input
                    v-model={checkPass.value}
                    type="password"
                    autocomplete="off"
                  />
                </el-form-item>
                {/* 验证码 */}
                <el-col span={16}>
                  <el-form-item label="验证码" prop="verifyCode">
                    <el-input
                      v-model={ruleForm.verifyCode}
                      autocomplete="off"
                    />
                  </el-form-item>
                </el-col>

                <el-form-item>
                  <el-button
                    type="primary"
                    onClick={() => submitForm(ruleFormRef._rawValue as any)}
                  >
                    提交
                  </el-button>
                  <el-button
                    onClick={() => resetForm(ruleFormRef?._rawValue as any)}
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
