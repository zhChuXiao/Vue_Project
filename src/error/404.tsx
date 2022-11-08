import { defineComponent, getCurrentInstance } from 'vue';
import gif from '@/assets/images/404.gif';
export default defineComponent({
  setup() {
    const _this = (getCurrentInstance() as any).proxy;
    const toHome: () => void = (): void => {
      _this.$router.push({ path: '/', replace: true });
    };
    return () => (
      <>
        <div
          style={{
            display: 'flex',
            width: '100vw',
            height: '100vh',
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div>
            <h1>404</h1>
            <h1>你好像走丢了...</h1>
            <el-button type={'success'} onClick={toHome}>
              回到首页
            </el-button>
          </div>
          <img src={gif} alt="" />
        </div>
      </>
    );
  },
});
