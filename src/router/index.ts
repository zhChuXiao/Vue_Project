import { createRouter, createWebHistory } from 'vue-router';
import { ElMessage } from 'element-plus';
import type { RouteRecordRaw } from 'vue-router';
import type { Router, RouteLocationNormalized } from 'vue-router';
// 路由表
export const routes: readonly RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    redirect: '/permssion/user',
    component: (): Promise<any> => import('@/views/HomeView'),
    meta: {
      title: '首页',
    },
    children: [
      // 权限管理
      {
        path: 'permssion',
        name: 'permssion',
        component: (): Promise<any> => import('@/views/PermssionView'),
        // redirect: '/permssion/user',
        meta: {
          title: '权限管理',
        },
        children: [
          {
            path: 'user',
            name: 'user',
            component: (): Promise<any> => import('@/views/UserView.vue'),
            meta: {
              title: '用户列表',
            },
          },
          {
            path: 'menu',
            name: 'menu',
            component: (): Promise<any> => import('@/views/MenuView.vue'),
            meta: {
              title: '菜单列表',
            },
          },
          {
            path: 'role',
            name: 'role',
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
        name: 'system',
        component: (): Promise<any> => import('@/views/SystemView'),
        // redirect: '/system/online',
        meta: {
          title: '系统监控',
        },
        children: [
          {
            path: 'online',
            name: 'online',
            component: (): Promise<any> => import('@/views/OnlineView.vue'),
            meta: {
              title: '在线用户',
            },
          },
          {
            path: 'login-log',
            name: 'login-log',
            component: (): Promise<any> => import('@/views/LoginlogView.vue'),
            meta: {
              title: '登录日志',
            },
          },
          {
            path: 'serve',
            name: 'serve',
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
        name: 'schedule',
        component: (): Promise<any> => import('@/views/ScheduleView'),
        // redirect: '/schedule/task',
        meta: {
          title: '任务调度',
        },
        children: [
          {
            path: 'task',
            name: 'task',
            component: (): Promise<any> => import('@/views/TaskView.vue'),
            meta: {
              title: '定时任务',
            },
          },
          {
            path: 'log',
            name: 'log',
            component: (): Promise<any> => import('@/views/ScheduleLogView.vue'),
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
    meta: {
      title: '登录',
    },
  },
  /**
   * 404页面
   */
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: (): Promise<any> => import('@/error/404'),
    meta: {
      title: '404',
    },
  },
];
const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
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
