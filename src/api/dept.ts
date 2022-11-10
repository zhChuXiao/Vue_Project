import request from '@/service';
import type { AxiosResponse } from 'axios';
/**
 * @description 获取系统部门
 * @returns
 */
export const getDeptList: () => Promise<AxiosResponse<any, any>> = (): Promise<
  AxiosResponse<any, any>
> => {
  return request({
    url: '/admin/sys/dept/list',
    method: 'get',
  });
};
/**
 * @description 获取用户列表
 * @param {data} data
 */
export const getUserPage: (data: any) => Promise<AxiosResponse<any, any>> = (
  data: any,
): Promise<AxiosResponse<any, any>> => {
  return request({
    url: '/admin/sys/user/page',
    method: 'post',
    data,
  });
};
/**
 * @description 获取角色列表
 */
export const getRoleList: () => Promise<AxiosResponse<any, any>> = (): Promise<
  AxiosResponse<any, any>
> => {
  return request({
    url: '/admin/sys/role/list',
    method: 'get',
  });
};
