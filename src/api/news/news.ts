import http from '@/axios'
import type {News, NewsListParams} from "@/api/news/type";

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
