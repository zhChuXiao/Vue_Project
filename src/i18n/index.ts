import { createI18n } from 'vue-i18n';
import en from '@/locale/i18n_en';
import zh from '@/locale/i18n_zh';
// 国际化语言资源
const messages = {
  // 英文
  en,
  // 中文
  zh,
};

function getLocal() {
  // 如果缓存中存在，则直接返回
  const myLocale = localStorage.getItem('my_locale');
  if (myLocale) {
    return myLocale;
  }
  // 否则读取当前网页语言
  const localName = navigator.language.indexOf('zh') !== -1 ? 'zh' : 'en';
  // 设置缓存
  localStorage.setItem('my_locale', localName);
  return localName;
}
// 创建i18n实例
export const i18n = createI18n({
  locale: getLocal(),
  messages,
});
