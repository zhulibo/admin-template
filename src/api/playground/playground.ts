import http from "@/axios";
import type {TestParams, Test} from "@/api/playground/type";

// 获取测试列表
export function getTestList(params: TestParams) {
  return http.request<Test[]>({
    url: '/api/playground/test/list',
    method: 'get',
    params
  })
}

// 获取测试详情
export function getTestDetail(id: number) {
  return http.request<Test>({
    url: '/api/playground/test/detail/' + id,
    method: 'get',
  })
}

// 新增测试
export function addTest(data: Test) {
  return http.request({
    url: '/api/playground/test/add',
    method: 'post',
    data
  })
}

// 编辑测试
export function editTest(data: Partial<Test>) {
  return http.request({
    url: '/api/playground/test/update',
    method: 'put',
    data
  })
}

// 删除测试
export function delTest(id: number) {
  return http.request({
    url: '/api/playground/test/del/' + id,
    method: 'delete',
  })
}