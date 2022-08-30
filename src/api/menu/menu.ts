import http from '@/axios'
import type {MenuListParams, Menu} from "@/api/menu/type";

// 获取菜单列表
export function getMenuList(params: MenuListParams) {
  return http.request<Menu[]>({
    url: '/api/article/news/list',
    method: 'get',
    params
  })
}

// 获取菜单详情
export function getMenuDetail(id: string) {
  return http.request<Menu>({
    url: '/api/article/news/detail/' + id,
    method: 'get',
  })
}

// 新增菜单
export function addMenu(data: Menu) {
  return http.request({
    url: '/api/article/news/add',
    method: 'post',
    data
  })
}

// 编辑菜单
export function editMenu(data: Menu) {
  return http.request({
    url: '/api/article/news/update',
    method: 'put',
    data
  })
}

// 删除菜单
export function delMenu(id: string) {
  return http.request({
    url: '/api/article/news/del/' + id,
    method: 'delete',
  })
}
