import http from "@/axios";

// 获取示例列表
export function getExampleList(params) {
  return http.request({
    url: '/api/playground/example/list',
    method: 'get',
    params
  })
}

// 获取示例详情
export function getExampleDetail(id) {
  return http.request({
    url: '/api/playground/example/detail/' + id,
    method: 'get',
  })
}

// 新增示例
export function addExample(data) {
  return http.request({
    url: '/api/playground/example/add',
    method: 'post',
    data
  })
}

// 编辑示例
export function editExample(data) {
  return http.request({
    url: '/api/playground/example/update',
    method: 'put',
    data
  })
}

// 删除示例
export function delExample(id) {
  return http.request({
    url: '/api/playground/example/del/' + id,
    method: 'delete',
  })
}
