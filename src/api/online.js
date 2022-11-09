import request from '@/service';

export function getOnlineList() {
  return request({
    url: 'admin/sys/online/list',
    method: 'get'
  })
}