import { defineComponent } from 'vue';
import BrowserType from '@/utils/browser-type';
export default defineComponent({
  setup() {
    const type = BrowserType('zh-cn');
    console.log(type);
    return () => (
      <>
        <div></div>
      </>
    );
  },
});
