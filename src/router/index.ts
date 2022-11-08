import { createRouter, createWebHistory } from 'vue-router';
import { ElMessage } from 'element-plus';
import type {
  Router,
  RouteLocationNormalized,
  NavigationGuardNext,
} from 'vue-router';
const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: (): Promise<any> => import('@/views/HomeView'),
      children: [
        {
          path: 'admin',
          component: (): Promise<any> => import('@/views/AdminView.vue'),
        },
        {
          path: '/log',
          name: 'log',
          component: (): Promise<any> => import('@/views/LogView.vue'),
        },
        {
          path: '/menu',
          name: 'menu',
          component: (): Promise<any> => import('@/views/MenuView.vue'),
        },
        {
          path: '/role',
          name: 'role',
          component: (): Promise<any> => import('@/views/RoleView.vue'),
        },
        {
          path: '/account',
          name: 'account',
          component: (): Promise<any> => import('@/views/AccountView'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: (): Promise<any> => import('@/views/LoginView'),
    },
    /**
     * 404页面
     */
    {
      path: '/:pathMatch(.*)*',
      component: (): Promise<any> => import('@/error/404'),
    },
  ],
});
// 前置守卫
const isLogin: () => boolean = (): boolean => !!localStorage.getItem('token');
// router.beforeEach((to: RouteLocationNormalized): any => {
//   if (to.path === '/login') {
//     if (isLogin() as boolean) {
//       ElMessage('登录状态有效，不需要重复登录了');
//       return { name: 'home' };
//     }
//   } else if (to.path != 'login') {
//     if (!isLogin() as boolean) {
//       return { name: 'login' };
//     }
//   }
// });

export default router;
