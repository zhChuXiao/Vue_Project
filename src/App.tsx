import { defineComponent, getCurrentInstance } from 'vue';
import { RouterView } from 'vue-router';

export default defineComponent({
  name: 'App',
  setup(): () => JSX.Element {
    const _this = (getCurrentInstance() as any).proxy;
    return (): JSX.Element => (
      <>
        <RouterView />
      </>
    );
  },
});
