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
                {/* <RouterView /> */}
                <router-view
                  v-slots={{
                    default: (scope: any) => <>{scope.Component}</>,
                  }}
                ></router-view>
              </el-scrollbar>
            </el-main>
          </el-container>
        </el-container>
      </>
    );
  },
});
