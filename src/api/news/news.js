import http from '@/axios'

// 获取新闻列表
export function getNewsList(params) {
  return http.request({
    url: '/api/article/news/list',
    method: 'get',
    params
  })
}

// 获取新闻详情
export function getNewsDetail(id) {
  return http.request({
    url: '/api/article/news/detail/' + id,
    method: 'get',
  })
}

// 新增新闻
export function addNews(data) {
  return http.request({
    url: '/api/article/news/add',
    method: 'post',
    data
  })
}

// 编辑新闻
export function editNews(data) {
  return http.request({
    url: '/api/article/news/update',
    method: 'put',
    data
  })
}

// 删除新闻
export function delNews(id) {
  return http.request({
    url: '/api/article/news/del/' + id,
    method: 'delete',
  })
}

// 获取新闻分类列表
export function getNewsCateList() {
  return http.request({
    url: '/api/article/newsCate/list',
    method: 'get',
  })
}

// 获取新闻分类详情
export function getNewsCateDetail(id) {
  return http.request({
    url: '/api/article/newsCate/detail/' + id,
    method: 'get',
  })
}

// 新增新闻分类
export function addNewsCate(data) {
  return http.request({
    url: '/api/article/newsCate/add',
    method: 'post',
    data
  })
}

// 编辑新闻分类
export function editNewsCate(data) {
  return http.request({
    url: '/api/article/newsCate/update',
    method: 'put',
    data
  })
}

// 删除新闻分类
export function delNewsCate(id) {
  return http.request({
    url: '/api/article/newsCate/del/' + id,
    method: 'delete',
  })
}
