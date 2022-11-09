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
    // 权限管理
    {
      path: '/',
      name: 'home',
      component: (): Promise<any> => import('@/views/HomeView'),
      children: [
        // 用户列表
        {
          path: 'admin',
          component: (): Promise<any> => import('@/views/AdminView.vue'),
        },
        {
          path: '/log',
          name: 'log',
          component: (): Promise<any> => import('@/views/LogView.vue'),
        },
        // 菜单列表
        {
          path: '/menu',
          name: 'menu',
          component: (): Promise<any> => import('@/views/MenuView.vue'),
        },
        // 角色列表
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
        {
          path: '/dashboard',
          component: () => import('@/views/dashboard/WelcomeView'),
        },
        // 系统监控
        {
          path:'/online',
          name:'online',
          component:():Promise<any> => import('@/views/OnlineView.vue')
        }
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
router.beforeEach((to: RouteLocationNormalized): any => {
  if (to.path === '/login') {
    if (isLogin() as boolean) {
      ElMessage('登录状态有效，不需要重复登录了');
      return { name: 'home' };
    }
  } else if (to.path != 'login') {
    if (!isLogin() as boolean) {
      ElMessage.error('请先登录');
      return { name: 'login' };
    }
  }
});

export default router;
