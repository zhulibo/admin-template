export interface TestParams {
  title?: string,
  startTime?: string,
  endTime?: string,
  status?: string,
  page: number,
  rows: number
}

export interface Test {
  id?: number,
  title: string,
  size: string,
  status: number
}