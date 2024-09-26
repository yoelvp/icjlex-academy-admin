export interface LoginData {
  access: {
    token: string
    expires: string
  }
  refresh: {
    token: string
    expire: string
  }
}
