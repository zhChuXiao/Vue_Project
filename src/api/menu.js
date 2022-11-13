import request from '@/service';

export function menuList() {
  return request({
    url: '/admin/sys/menu/list',
    method: 'get',
  })
}

// 新增权限接口
export function menuAdd() {
  return request({
    url: '/admin/sys/menu/add',
    method: 'post',
  })
}