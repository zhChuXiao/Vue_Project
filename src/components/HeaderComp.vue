<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item :to="item.path" v-for="item in list" :key="item.path">{{
      item.title
    }}</el-breadcrumb-item>
  </el-breadcrumb>
  <el-space>
    <!-- 切换语言 -->
    <el-tooltip :content="`切换语言`" placement="bottom" effect="dark">
      <svg class="icon" aria-hidden="true" style="cursor: pointer" @click="type = !type">
        <use xlink:href="#icon-zhongyingwen"></use>
      </svg>
    </el-tooltip>
    <!-- 切换主题 -->
    <el-tooltip
      :content="`切换${theme ? '日间' : '夜间'}主题`"
      placement="bottom"
      effect="dark"
    >
      <el-switch
        v-model="theme"
        class="mt-2"
        inline-prompt
        :active-icon="Sunny"
        :inactive-icon="MoonNight"
        style="
          margin-right: 24px;
          margin-left: 10px;
          --el-switch-on-color: #000;
          --el-switch-off-color: #999;
          --el-switch-border-color: #777;
        "
      />
    </el-tooltip>
    <el-tag class="ml-2" type="success" effect="dark"
      >昵称：{{ store.state?.user?.userInfo?.name }}</el-tag
    >
    <el-avatar
      :size="40"
      :src="store?.state?.user?.userInfo?.headImg || heizi"
      style="margin-right: 5px"
    />
    <el-dropdown>
      <svg class="icon" aria-hidden="true" style="cursor: pointer">
        <use xlink:href="#icon-shezhi"></use>
      </svg>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>关于</el-dropdown-item>
          <el-dropdown-item>个人设置</el-dropdown-item>
          <el-dropdown-item @click="dialogVisible = true"
            ><span style="color: red">退出登录</span></el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-space>
  <!-- 确认退出 -->
  <el-dialog
    v-model="dialogVisible"
    title="提示"
    width="30%"
    draggable
    close-on-press-escape
    center
  >
    <div style="color: red; text-align: center; font-size: 16px">确定要退出吗？</div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="danger" @click="logOut"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { Sunny, MoonNight } from '@element-plus/icons-vue';
import { ArrowRight } from '@element-plus/icons-vue';
import { computed, getCurrentInstance, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { routes } from '@/router';
import { useStore } from 'vuex';
import heizi from '@/assets/images/heizi.jpg';
import '@/utils/symbol.js';

const _this = (getCurrentInstance() as any).proxy;
const type = ref();
onMounted(() => {
  type.value = localStorage.getItem('my_locale') == 'zh' ? false : true;
  theme.value = store.state.user.theme;
}),
  watch(type, () => {
    _this.$i18n.locale = type.value ? 'en' : 'zh'; // 切换语言
    localStorage.setItem('my_locale', _this.$i18n.locale); // 设置本地存储的语言
  });
const route = useRoute();
const store = useStore();
const router = useRouter();
const dialogVisible = ref(false);
const logOut = () => {
  localStorage.removeItem('token');
  router.replace({ path: '/login' });
};
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
// 切换主题
const theme = ref(false);
watch(
  () => theme.value,
  () => {
    store.commit('setTheme', theme.value);
    if (theme.value) {
      document.documentElement.className = 'dark';
    } else {
      document.documentElement.className = 'light';
    }
  },
);
setMap(routes);
const list = computed(() => {
  return route.matched.map((item) => ({ title: item.meta.title, path: item.path }));
});
// 个人信心
</script>

<style lang="sass" scoped>
.icon
  width: 1.3em
  height: 1.3em
  vertical-align: -0.15em
  fill: currentColor
  overflow: hidden
</style>
