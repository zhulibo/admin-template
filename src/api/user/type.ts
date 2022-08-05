export interface LoginParams {
  account: string;
  password: string;
}

export interface UserInfo {
  email: string
  permissions: string[]
  phone: string
  token: string
  userId: string
  userName: string
}
