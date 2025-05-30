import type {
  CreatePaymentReturn,
  FilterParamsRequest,
  PaymentItem,
  RegisterPaymentParam,
  Response
} from "@/types"
import { axios } from "@/lib"

export const getAllPaymentsService = (params?: FilterParamsRequest) => {
  return axios.get<Response<PaymentItem[]>>("/admin/payments", {
    params
  })
}

export const createPaymentService = (data: RegisterPaymentParam) => {
  const formData = new FormData()
  formData.append("userId", data.userId)
  formData.append("courseId", data.courseId)
  formData.append("operationNumber", data.operationNumber)
  formData.append("type", data.paymentType)
  formData.append("date", data.date)

  if (data?.image) {
    formData.append("image", data?.image)
  }

  return axios.post<Response<CreatePaymentReturn>>("/admin/payments", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}

export const deletePaymentService = (paymentId: string) => {
  return axios.delete<Response<string>>(`/admin/payments/${paymentId}`)
}
