import request from '@/service';
export function selectLogList(data) {
    return request({
      url: '/admin/sys/log/login/page',
      method: 'get',
      params:{
        ...data
      }
    })
  }

  export function LogList(data) {
    return request({
      url: '/admin/sys/log/task/page',
      method: 'get',
      params:{
        ...data
      }
    })
  }