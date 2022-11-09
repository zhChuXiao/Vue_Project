import request from '@/service';

export function selectLogList(data) {
    return request({
        // https:'//nest-api.buqiyuan.site/admin/sys/log/login/page?limit=10&page=1',
      url: '/admin/sys/log/login/page?limit=10&page=1',
      method: 'get',
      params:{
        ...data
      }
    })
  }