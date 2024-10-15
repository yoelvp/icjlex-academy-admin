export interface LoginData {
  access: {
    token: string
    expires: string
  }
  refresh: {
    token: string
    expires: string
  }
}
