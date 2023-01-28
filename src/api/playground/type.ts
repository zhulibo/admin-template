export interface ExampleParams {
  title?: string,
  startTime?: string,
  endTime?: string,
  status?: string,
  page: number,
  rows: number
}

export interface Example {
  id?: number,
  title: string,
  size: string,
  status: number
}