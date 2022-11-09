import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import user from './user';

export default createStore({
  // 模块
  modules: {
    user,
  },
  // 持久化
  plugins: [
    createPersistedState({
      storage: window.localStorage,
      key: 'vueX',
    }),
  ],
});
