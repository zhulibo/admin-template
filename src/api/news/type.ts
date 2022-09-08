export interface NewsListParams {
  title?: string,
  startTime?: string,
  endTime?: string,
  status?: number,
  page?: number,
  rows?: number,
}

export interface News {
  id?: number
  title: string
  content: string
  imgUrl: string
  type: number
  status: number
  // createTime?: string
  // updateTime?: string
}
