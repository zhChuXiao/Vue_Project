import { createRouter, createWebHistory } from 'vue-router';
import { ElMessage } from 'element-plus';
import type { Router, RouteLocationNormalized } from 'vue-router';
const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: (): Promise<any> => import('@/views/HomeView'),
      children: [
        // 权限管理
        {
          path: 'permssion',
          component: (): Promise<any> => import('@/views/PermssionView'),
          redirect: '/permssion/user',
          meta: {
            title: '权限管理',
          },
          children: [
            {
              path: 'user',
              component: (): Promise<any> => import('@/views/UserView.vue'),
              meta: {
                title: '用户列表',
              },
            },
            {
              path: 'menu',
              component: (): Promise<any> => import('@/views/MenuView.vue'),
              meta: {
                title: '菜单列表',
              },
            },
            {
              path: 'role',
              component: (): Promise<any> => import('@/views/RoleView.vue'),
              meta: {
                title: '角色列表',
              },
            },
          ],
        },
        // 系统监控
        {
          path: 'system',
          component: (): Promise<any> => import('@/views/SystemView'),
          redirect: '/system/online',
          meta: {
            title: '系统监控',
          },
          children: [
            {
              path: 'online',
              component: (): Promise<any> => import('@/views/OnlineView.vue'),
              meta: {
                title: '在线用户',
              },
            },
            {
              path: 'login-log',
              component: (): Promise<any> => import('@/views/LoginlogView.vue'),
              meta: {
                title: '登录日志',
              },
            },
            {
              path: 'role',
              component: (): Promise<any> => import('@/views/RoleView.vue'),
              meta: {
                title: '服务监控',
              },
            },
          ],
        },
        // 任务调度
        {
          path: 'schedule',
          component: (): Promise<any> => import('@/views/ScheduleView'),
          redirect: '/schedule/task',
          meta: {
            title: '任务调度',
          },
          children: [
            {
              path: 'task',
              component: (): Promise<any> => import('@/views/TaskView.vue'),
              meta: {
                title: '定时任务',
              },
            },
            {
              path: 'log',
              component: (): Promise<any> => import('@/views/LogView.vue'),
              meta: {
                title: '任务日志',
              },
            },
          ],
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
