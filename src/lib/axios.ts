import axiosHttp, { InternalAxiosRequestConfig } from 'axios'
import { API_URL } from '@/@common/env'
import Cookies from 'js-cookie'
import { CookieKeys } from '@/modules/[auth]/login/utils'

export const axios = axiosHttp.create({
  baseURL: API_URL
})

export const AxiosInterceptor = () => {
  const whitelistEnpoints = [
    '/auth/login',
    '/courses',
    '/teachers',
    '/students/me/'
  ]

  const updateHeader = (request: InternalAxiosRequestConfig) => {
    const token = Cookies.get(CookieKeys.TOKEN)

    if (!whitelistEnpoints.includes(request.url ?? '/')) {
      request.headers.Authorization = `jwt ${token}`

      if (!request.headers['Content-Type']) {
        request.headers['Content-Type'] = 'application/json'
      }
    }

    return request
  }

  axios.interceptors.request.use((request) => {
    return updateHeader(request)
  })
}
