import { getAccountInfo } from '@/api/login';
export default {
  // 命名空间
  // namespace: true,
  state: {
    // 用户信息
    userInfo: null,
    theme: false,
  },
  getters: {},
  mutations: {
    // 设置用户信息
    setUserInfo(state: any, payload: any) {
      state.userInfo = payload;
    },
    setTheme(state: any, payload: any) {
      state.theme = payload;
    },
  },
  actions: {
    // 获取用户信息
    AccountInfo(context: any) {
      getAccountInfo().then((res) => {
        context.commit('setUserInfo', res.data);
      });
    },
  },
};
