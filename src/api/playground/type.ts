export interface ExampleParams {
  userName?: string,
  startTime?: string,
  endTime?: string,
  status?: string,
  page: number,
  rows: number
}

export interface Example {
  id?: number,
  userName: string,
  size: string,
  status: number
}