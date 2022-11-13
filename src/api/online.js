import request from '@/service';

export function getOnlineList() {
  return request({
    url: 'admin/sys/online/list',
    method: 'get'
  })
}
export function kickOnlineUser(data) {
  return request({
    url:'admin/sys/online/kick',
    method: 'post',
    data
  })
}