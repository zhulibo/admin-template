import http from '@/axios'
import type {Menu} from "@/api/menu/type";

// 获取菜单列表
export function getMenuList() {
  return http.request<Menu[]>({
    url: '/api/menu/list',
    method: 'get',
  })
}

// 获取菜单详情
export function getMenuDetail(id: number) {
  return http.request<Menu>({
    url: '/api/menu/detail/' + id,
    method: 'get',
  })
}

// 新增菜单
export function addMenu(data: Menu) {
  return http.request({
    url: '/api/menu/add',
    method: 'post',
    data
  })
}

// 编辑菜单
export function editMenu(data: Partial<Menu>) {
  return http.request({
    url: '/api/menu/update',
    method: 'put',
    data
  })
}

// 删除菜单
export function delMenu(id: number) {
  return http.request({
    url: '/api/menu/del/' + id,
    method: 'delete',
  })
}
