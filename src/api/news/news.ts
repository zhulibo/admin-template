import http from '@/axios'
import type {News, NewsListParams, NewsCate} from "@/api/news/type";

// 获取新闻列表
export function getNewsList(params: NewsListParams) {
  return http.request<News[]>({
    url: '/api/article/news/list',
    method: 'get',
    params
  })
}

// 获取新闻详情
export function getNewsDetail(id: number) {
  return http.request<News>({
    url: '/api/article/news/detail/' + id,
    method: 'get',
  })
}

// 新增新闻
export function addNews(data: News) {
  return http.request({
    url: '/api/article/news/add',
    method: 'post',
    data
  })
}

// 编辑新闻
export function editNews(data: Partial<News>) {
  return http.request({
    url: '/api/article/news/update',
    method: 'put',
    data
  })
}

// 删除新闻
export function delNews(id: number) {
  return http.request({
    url: '/api/article/news/del/' + id,
    method: 'delete',
  })
}

// 获取新闻分类列表
export function getNewsCateList() {
  return http.request<NewsCate[]>({
    url: '/api/article/newsCate/list',
    method: 'get',
  })
}

// 获取新闻分类详情
export function getNewsCateDetail(id: number) {
  return http.request<NewsCate>({
    url: '/api/article/newsCate/detail/' + id,
    method: 'get',
  })
}

// 新增新闻分类
export function addNewsCate(data: NewsCate) {
  return http.request({
    url: '/api/article/newsCate/add',
    method: 'post',
    data
  })
}

// 编辑新闻分类
export function editNewsCate(data: Partial<NewsCate>) {
  return http.request({
    url: '/api/article/newsCate/update',
    method: 'put',
    data
  })
}

// 删除新闻分类
export function delNewsCate(id: number) {
  return http.request({
    url: '/api/article/newsCate/del/' + id,
    method: 'delete',
  })
}
