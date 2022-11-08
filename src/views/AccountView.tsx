import { defineComponent, getCurrentInstance } from 'vue';
import { RouterView } from 'vue-router';

export default defineComponent({
  name: 'Account',
  setup() {
    const _this = (getCurrentInstance() as any).proxy;
    return () => (
      <>
        <div id="nav">
          {'账户...'}
          <RouterView />
        </div>
      </>
    );
  },
});
