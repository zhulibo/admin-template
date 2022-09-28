export interface Menu {
  id?: number
  parentId: string
  name: string
  path: string
  component: string
  title: string
  hidden: number
  cache: number
  orderNum: number
  status: number
  children?: Menu[]
}
