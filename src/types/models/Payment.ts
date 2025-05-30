import { Pagination, SelectOption } from "../common"

export interface PaymentItem {
  id: string
  studentName: string
  courseName: string
  type: string
  date: string
}

export interface RegisterPayment {
  course: SelectOption
  user: SelectOption
  operationNumber: string
  paymentType: SelectOption
  date: string
  image?: FileList
  imageUrl?: string
}

export interface RegisterPaymentParam extends Omit<RegisterPayment, "course" | "user" | "paymentType" | "image"> {
  userId: string
  courseId: string
  paymentType: string
  image?: File
}

export interface CreatePaymentReturn {
  paymentId: string
}

export interface GetAllPaymentParam extends Partial<Pagination> {
  q: string
}
