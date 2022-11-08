import { defineComponent, getCurrentInstance } from 'vue';
import { RouterView } from 'vue-router';

export default defineComponent({
  name: 'Home',
  setup() {
    const _this = (getCurrentInstance() as any).proxy;
    return () => (
      <>
        <div id="nav">
          {'home...'}
          <RouterView />
        </div>
      </>
    );
  },
});
