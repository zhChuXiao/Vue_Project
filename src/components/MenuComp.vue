<template>
  <el-menu default-active="2" class="el-menu-vertical-demo" @select="handleSelect">
    <h2 class="title">
      <el-avatar shape="square" :size="50" :src="heizi" />
      XX后台管理
    </h2>
    <!-- 一级 系统-->
    <!-- 二级权限 -->
    <el-sub-menu index="/permssion">
      <template #title>
        <el-icon><Location /></el-icon>
        <span>权限管理</span>
      </template>
      <!-- 三级 -->
      <el-menu-item index="/user">
        <template #title>
          <el-icon><User /></el-icon>
          <span>用户列表</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/menu">
        <template #title>
          <el-icon><SetUp /></el-icon>
          <span>菜单列表</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/role">
        <template #title>
          <el-icon><EditPen /></el-icon>
          <span>角色列表</span>
        </template>
      </el-menu-item>
    </el-sub-menu>
    <!-- 二级系统监控 -->
    <el-sub-menu index="/monitor">
      <template #title>
        <el-icon><Monitor /></el-icon>
        <span>系统监控</span>
      </template>
      <!-- 三级 -->
      <el-menu-item index="/online">
        <template #title>
          <el-icon><Avatar /></el-icon>
          <span>在线用户</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/login-log">
        <template #title>
          <el-icon><Histogram /></el-icon>
          <span>登录日志</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/serve">
        <template #title>
          <el-icon><Open /></el-icon>
          <span>服务监控</span>
        </template>
      </el-menu-item>
    </el-sub-menu>
    <!-- 二级任务调度 -->
    <el-sub-menu index="/schedule">
      <template #title>
        <el-icon><Tickets /></el-icon>
        <span>任务调度</span>
      </template>
      <!-- 三级 -->
      <el-menu-item index="/task">
        <template #title>
          <el-icon><Mug /></el-icon>
          <span>定时任务</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/log">
        <template #title>
          <el-icon><Tickets /></el-icon>
          <span>任务日志</span>
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
// const handleOpen = (key: string, keyPath: string[]) => {
//   console.log(key, keyPath);
// };
// const handleClose = (key: string, keyPath: string[]) => {
//   console.log(key, keyPath);
// };
// 选择的菜单
const handleSelect = (index: string, indexPath: any, routeResult: any) => {
  // console.log(index, indexPath, routeResult);
  console.log(indexPath.join(''));
};
</script>

<style lang="sass" scoped>
.el-menu
    height: 100%
    .title
      display: flex
      align-items: center
      justify-content: space-between
      padding: 10px
      color: deepskyblue
      margin: 0
      font-size: 20px
</style>
