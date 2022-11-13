import request from '@/service';


export function getRoleList() {
  return request({
    url: 'admin/sys/role/list',
    method: 'get'
  })
}

export function getPageRole(roleId) {
  return request({
    url: 'admin/sys/role/info',
    methods: 'get',
    params: {
      roleId
    }
  })
}

export function addRole(data) {
  return request({
    url: 'admin/sys/role/add',
    methods: 'post',
    data
  })
}


export function deleteRole(data) {
  return request({
    url: 'admin/sys/role/delete',
    methods: 'post',
    data
  })
}