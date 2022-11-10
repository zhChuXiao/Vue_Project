# 2203-3 组-后台管理

[![MIT License](https://img.shields.io/badge/%E9%A1%B9%E7%9B%AE%E7%BB%84-2203--3%E7%BB%84-green)](#)

## 启动项目

> ### `下载依赖`

```bash
  npm install
  yarn
```

> ### `运行项目`

```bash
  npm run luanhuo
  yarn luanhuo
```

## 项目目录

`src/api` axios 请求接口

`src/assets` 静态资源 

`src/components` 组件

`src/error` 404 页面

`src/i8n` 国际化插件配置

`src/locale` 语言配置

`src/router` 路由

`src/service` axios 配置

`src/store` vuex 仓库

`src/utils` 工具

`src/views` 路由组件

## 项目依赖

```json
"dependencies": {
    "animate.css": "^4.1.1",
    "axios": "^1.1.3",
    "echarts": "^5.4.0",
    "element-plus": "^2.2.20",
    "lib-flexible": "^0.3.2",
    "lodash": "^4.17.21",
    "moment": "^2.29.4",
    "normalize.css": "^8.0.1",
    "sass": "^1.56.0",
    "vue": "^3.2.41",
    "vue-i18n": "^9.2.2",
    "vue-router": "^4.1.5",
    "vuex": "^4.1.0",
    "vuex-persistedstate": "^4.1.0"
  },
  "devDependencies": {
    "@rushstack/eslint-patch": "^1.1.4",
    "@types/node": "^16.11.68",
    "@vitejs/plugin-vue": "^3.1.2",
    "@vitejs/plugin-vue-jsx": "^2.0.1",
    "@vue/eslint-config-prettier": "^7.0.0",
    "@vue/eslint-config-typescript": "^11.0.0",
    "@vue/tsconfig": "^0.1.3",
    "eslint": "^8.22.0",
    "eslint-plugin-vue": "^9.3.0",
    "npm-run-all": "^4.1.5",
    "prettier": "^2.7.1",
    "typescript": "~4.7.4",
    "unplugin-auto-import": "^0.11.4",
    "unplugin-vue-components": "^0.22.9",
    "vite": "^3.1.8",
    "vue-tsc": "^1.0.8"
  }
```

## 附录

可使用 JSX 语法

```tsx
import { defineComponent, getCurrentInstance } from 'vue';
import { RouterView } from 'vue-router';

export default defineComponent({
  name: 'App',
  setup(): () => JSX.Element {
    const _this = (getCurrentInstance() as any).proxy;
    return (): JSX.Element => (
      <>
        <RouterView />
      </>
    );
  },
});
```
