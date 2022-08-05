export interface NewsListParams {
  title?: string,
  startTime?: string,
  endTime?: string,
  status?: string,
  page?: number,
  rows?: number,
}

export interface News {
  content?: string
  createTime?: string
  id?: any // todo
  imgUrl?: string
  status?: string
  title?: string
  type?: string
  updateTime?: string
}
