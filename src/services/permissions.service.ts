import { axios } from "@/lib"

export const getPermissionByUserIdService = (userId: string) => {
  return axios.get(`/admin/permissions/${userId}`)
}
