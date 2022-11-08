import axios from 'axios';
import type { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios';
import { ElMessage } from 'element-plus';
// axios实例
const request: AxiosInstance = axios.create({
  baseURL: 'https://nest-api.buqiyuan.site/api',
  timeout: 20000,
  withCredentials: false,
});
request.interceptors.request.use(
  (
    config: AxiosRequestConfig<any>,
  ): AxiosRequestConfig<any> | Promise<AxiosRequestConfig<any>> => {
    // 将token存入本地存储
    let token: string | null = localStorage.getItem('token');
    (token as string) &&
      (config as AxiosRequestConfig<any>) &&
      ((config.headers as Partial<any>).token = token);
    return config;
  },
);
// 响应拦截器
request.interceptors.response.use(
  (
    response: AxiosResponse<any, any>,
  ): AxiosResponse<any, any> | Promise<AxiosResponse<any, any>> => {
    console.log('res--->', response),
      (response.data?.data?.token as boolean) &&
        localStorage.setItem('token', response.data.data.token);

    // 全局的弹窗
    ElMessage({
      message: response?.data?.message,
      type: response?.data?.code === 200 ? 'success' : 'error',
    });

    return response.data;
  },
);

export default request;
