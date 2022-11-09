import { defineComponent } from 'vue';
import homeStyle from '@/assets/sass/home.module.sass';
import MenuComp from '@/components/MenuComp.vue';
import HeaderComp from '@/components/HeaderComp.vue';
import { RouterView } from 'vue-router';
// import TransitionComp from '@/components/TransitionComp.vue';
export default defineComponent({
  setup(): () => JSX.Element {
    return (): JSX.Element => (
      <>
        <el-container class={homeStyle.elContainer}>
          <el-aside width="200px">
            <el-scrollbar>
              <MenuComp style={{ height: '100%' }} />
            </el-scrollbar>
          </el-aside>
          <el-container>
            <el-header class={homeStyle.header}>
              <HeaderComp />
            </el-header>
            <el-main class={homeStyle.main}>
              <el-scrollbar>
                <RouterView />
                {/* 切换动画 */}
                {/* <RouterView v-slot="{ Component }">
                  <transition
                    enter-active-class="animate__animated animate__backInLeft"
                    leave-active-class="animate__animated animate__backOutRight"
                  >
                    <component is={Component}></component>
                  </transition>
                </RouterView> */}
              </el-scrollbar>
            </el-main>
          </el-container>
        </el-container>
      </>
    );
  },
});
