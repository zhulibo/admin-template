export interface NewsListParams {
  cateId?: number,
  title?: string,
  startTime?: string,
  endTime?: string,
  status?: number,
  page: number,
  rows: number
}

export interface News {
  id?: number
  title: string
  cateId?: number,
  content: string
  imgUrl: string
  type: number
  status: number
}

export interface NewsCate {
  id?: number
  parentId: string
  name: string
  orderNum: number
  status: number
  children?: NewsCate[]
}
