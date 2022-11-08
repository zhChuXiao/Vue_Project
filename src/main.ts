import { createApp } from 'vue';
import vm from './App';
import router from './router';
import type { App } from 'vue';
// element-plus样式
import 'element-plus/dist/index.css';
import ElementPlus from 'element-plus';
// 中文
import zhCn from './locale/zh';
// 清除样式
import 'normalize.css';
// 引入flexable
// import 'lib-flexible/flexible';
// 国际化
import { i18n } from '@/i18n';
// 使用 ：{{$t('login.username')}}

const app: App<Element> = createApp(vm);

app
  .use(router)
  .use(ElementPlus, {
    locale: zhCn,
  })
  .use(i18n);

app.mount('#app');
export default app;
