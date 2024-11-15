import axiosHttp, { InternalAxiosRequestConfig } from 'axios'
import camelcaseKeys from 'camelcase-keys'
import { API_URL } from '@/@common/env'
import { AuthStorageKeys } from '@/@auth/enums/storage-keys.enum'

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
    const tokenStore = JSON.parse(localStorage.getItem(AuthStorageKeys.TOKEN) ?? 'null')
    const token = tokenStore?.state?.token ?? ''

    if (!whitelistEnpoints.includes(request.url ?? '/')) {
      request.headers.Authorization = `Bearer ${token}`

      if (!request.headers['Content-Type']) {
        request.headers['Content-Type'] = 'application/json'
      }
    }

    return request
  }

  axios.interceptors.request.use((request) => {
    return updateHeader(request)
  })

  axios.interceptors.response.use((response) => {
    response.data = camelcaseKeys(response.data, { deep: true })

    return response
  })
}
