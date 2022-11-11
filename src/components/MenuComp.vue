<template>
  <el-menu
    :default-active="`/${route.path.split('/')[route.path.split('/').length - 1]}`"
    class="el-menu-vertical-demo"
    :default-openeds="['/permssion', '/system', '/schedule']"
    @select="handleSelect"
  >
    <h2 class="title">
      <el-avatar shape="square" :size="50" :src="heizi" />
      {{ t('managersystem') }}
    </h2>
    <!-- 一级 系统-->
    <!-- 二级权限 -->
    <el-sub-menu index="/permssion">
      <template #title>
        <el-icon><Location /></el-icon>
        <span>{{ t('permssion.permssion') }}</span>
      </template>
      <!-- 三级 -->
      <el-menu-item index="/user">
        <template #title>
          <el-icon><User /></el-icon>
          <span>{{ t('permssion.userlist') }}</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/menu">
        <template #title>
          <el-icon><SetUp /></el-icon>
          <span>{{ t('permssion.menulist') }}</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/role">
        <template #title>
          <el-icon><EditPen /></el-icon>
          <span>{{ t('permssion.rolelist') }}</span>
        </template>
      </el-menu-item>
    </el-sub-menu>
    <!-- 二级系统监控 -->
    <el-sub-menu index="/system">
      <template #title>
        <el-icon><Monitor /></el-icon>
        <span>{{ t('system.system') }}</span>
      </template>
      <!-- 三级 -->
      <el-menu-item index="/online">
        <template #title>
          <el-icon><Avatar /></el-icon>
          <span>{{ t('system.online') }}</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/login-log">
        <template #title>
          <el-icon><Histogram /></el-icon>
          <span>{{ t('system.loginlog') }}</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/serve">
        <template #title>
          <el-icon><Open /></el-icon>
          <span>{{ t('system.server') }}</span>
        </template>
      </el-menu-item>
    </el-sub-menu>
    <!-- 二级任务调度 -->
    <el-sub-menu index="/schedule">
      <template #title>
        <el-icon><Tickets /></el-icon>
        <span>{{ t('schedule.schedule') }}</span>
      </template>
      <!-- 三级 -->
      <el-menu-item index="/task">
        <template #title>
          <el-icon><Mug /></el-icon>
          <span>{{ t('schedule.taskschedule') }}</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/log">
        <template #title>
          <el-icon><Tickets /></el-icon>
          <span>{{ t('schedule.schedulelog') }}</span>
        </template>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup>
import {
  Location,
  SetUp,
  User,
  EditPen,
  Monitor,
  Avatar,
  Histogram,
  Open,
  Tickets,
  Mug,
} from '@element-plus/icons-vue';
import heizi from '@/assets/images/heizi.jpg';
import { useRouter, type Router, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
// import { useStore } from 'vuex';
const router: Router = useRouter();
const route = useRoute();
const { t } = useI18n();

// 选择的菜单
const handleSelect = (index: string, indexPath: Array<string>) => {
  router.push({ path: indexPath.join('') });
};
</script>

<style lang="sass" scoped>
.el-menu-vertical-demo
  height: 100vh
  .title
    display: flex
    align-items: center
    justify-content: space-between
    padding: 10px
    color: deepskyblue
    margin: 0
    font-size: 20px
</style>
