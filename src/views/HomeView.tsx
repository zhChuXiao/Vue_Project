import { defineComponent } from 'vue';
import homeStyle from '@/assets/sass/home.module.sass';
import MenuComp from '@/components/MenuComp.vue';
export default defineComponent({
  setup(): () => JSX.Element {
    return (): JSX.Element => (
      <>
        <el-container class={homeStyle.elContainer}>
          <el-aside width="200px">
            <MenuComp />
          </el-aside>
          <el-container>
            <el-header class={homeStyle.header}>Header</el-header>
            <el-main>
              main
              <router-view></router-view>
            </el-main>
          </el-container>
        </el-container>
      </>
    );
  },
});
