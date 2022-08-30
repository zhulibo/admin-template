export interface MenuListParams {
  title?: string,
  startTime?: string,
  endTime?: string,
  status?: string,
  page?: number,
  rows?: number,
}

export interface Menu {
  id?: string
  parentId?: string
  name?: string
  path?: string
  component?: string
  title?: string
  hidden?: string
  cache?: string
  orderNum?: string
  status?: string
  createTime?: string
  updateTime?: string
}
