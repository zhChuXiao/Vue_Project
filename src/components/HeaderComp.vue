<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item :to="item.path" v-for="item in list" :key="item.path">{{
      item.title
    }}</el-breadcrumb-item>
  </el-breadcrumb>
  <el-space>
    <el-dropdown>
      <el-tag class="ml-2" type="success" effect="dark"
        >昵称：{{ store.state.user.userInfo.name }}</el-tag
      >
    </el-dropdown>
    <el-avatar :size="40" :src="store.state.user.userInfo.headImg" />
  </el-space>
</template>

<script lang="ts" setup>
import { ArrowRight } from '@element-plus/icons-vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { routes } from '@/router';
import { useStore } from 'vuex';
const route = useRoute();
const store = useStore();
// 面包屑
const map: Map<string, string> = new Map();
const setMap = (routes: any) => {
  routes.forEach((item: any) => {
    map.set(item.name, item.meta.title);
    if (item.children) {
      setMap(item.children);
    }
  });
};
setMap(routes);
const list = computed(() => {
  return route.matched.map((item) => ({ title: item.meta.title, path: item.path }));
});
// 个人信心
console.log(store.state.user.userInfo);
</script>

<style lang="sass" scoped></style>
