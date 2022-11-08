import { defineComponent, getCurrentInstance, onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { login, getImageCaptcha } from '@/api/login';

export default defineComponent({
  name: 'Login',
  setup() {
    const _this = (getCurrentInstance() as any).proxy;
    onMounted(async () => {
      let res = await getImageCaptcha({ width: 100, height: 50 });
      console.log(res);
    });
    return () => (
      <>
        <div id="nav">
          {'login...'}
          <RouterView />
        </div>
      </>
    );
  },
});
