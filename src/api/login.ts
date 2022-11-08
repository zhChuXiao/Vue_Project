import request from '@/service';
import type { AxiosResponse } from 'axios';
/**
 * @description 验证码
 * @param {data} data 验证码宽高
 * @returns
 */
export const getImageCaptcha: (
  data: any,
) => Promise<AxiosResponse<any, any>> = (
  data: any,
): Promise<AxiosResponse<any, any>> => {
  return request({
    url: '/admin/captcha/img',
    method: 'get',
    params: { ...data },
  });
};
/**
 * @description 登录
 * @param {data} data {用户名，密码，验证码id，验证码}
 * @returns
 */
export const login: (data: any) => Promise<AxiosResponse<any, any>> = (
  data: any,
): Promise<AxiosResponse<any, any>> => {
  return request({
    url: '/admin/login',
    method: 'post',
    data,
  });
};
