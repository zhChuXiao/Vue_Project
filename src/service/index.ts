import axios from 'axios';
import type { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios';
import { ElMessage } from 'element-plus';
import router from '@/router';
// axios实例
const instance: AxiosInstance = axios.create({
  baseURL: 'https://nest-api.buqiyuan.site/api',
  timeout: 20000,
  withCredentials: false,
});
instance.interceptors.request.use(
  (
    config: AxiosRequestConfig<any>,
  ): AxiosRequestConfig<any> | Promise<AxiosRequestConfig<any>> => {
    // 将token存入本地存储
    let token: string | null = localStorage.getItem('token');
    token! &&
      (config as AxiosRequestConfig<any>) &&
      ((config.headers as Partial<any>).authorization = token);
    return config;
  },
);
// 响应拦截器
instance.interceptors.response.use(
  (
    response: AxiosResponse<any, any>,
  ): AxiosResponse<any, any> | Promise<AxiosResponse<any, any>> => {
    (response.data?.data?.token as boolean) &&
      localStorage.setItem('token', response.data.data.token);

    // 全局的弹窗
    ElMessage({
      message: response?.data?.message,
      type: response?.data?.code === 200 ? 'success' : 'error',
    });
    response?.data?.code === 11002 &&
      (localStorage.removeItem('token'), router.replace('/login'));

    return response.data;
  },
);
/**
 * @description 封装request
 * @param {config} config {请求地址，请求方式，携带参数，请求头}
 * @returns
 */
const request: (config: AxiosRequestConfig<any>) => Promise<AxiosResponse<any, any>> = (
  config: AxiosRequestConfig<any>,
): Promise<AxiosResponse<any, any>> => {
  const {
    url = '',
    method = 'GET',
    data = {},
    headers = {},
  }: AxiosRequestConfig<any> = config;
  switch (<string>method.toUpperCase()) {
    case 'GET':
      return instance.get(url, { params: <object>data });
    case 'POST':
      // 如果是表单提交
      if (headers['content-type'] === 'application/x-www-form-url-encoded') {
        const p: URLSearchParams = new URLSearchParams();
        for (const key in <object>data) {
          p.append(key, data[key]);
        }
        return instance.post(url, p, { headers });
      }
      // 如果是文件提交
      if (headers['content-type'] === 'multipart/form-data') {
        const p: FormData = new FormData();
        for (const key in <object>data) {
          p.append(key, data[key]);
        }
        return instance.post(url, p, { headers });
      }
      // 否则就是 application/json的形式
      return instance.post(url, data);
    default:
      return instance(config);
  }
};
export default request;
