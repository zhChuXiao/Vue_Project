<template>
  <router-view v-slot="{ Component }">
    <transition
      enter-active-class="animate__animated animate__backInLeft"
      leave-active-class="animate__animated animate__backOutRight"
    >
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<style lang="scss" scoped></style>
