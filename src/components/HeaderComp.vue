<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item :to="item.path" v-for="item in list" :key="item.path">{{
      item.title
    }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import { ArrowRight } from '@element-plus/icons-vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { routes } from '@/router';
const route = useRoute();
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
console.log(map);
const list = computed(() => {
  return route.matched.map((item) => ({ title: item.meta.title, path: item.path }));
});
</script>

<style lang="sass" scoped></style>
