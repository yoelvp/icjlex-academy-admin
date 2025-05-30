import { object, string } from "yup";

export const paymentSchema = object().shape({
  course: object({
    label: string().required(),
    value: string().required()
  }),
  user: object({
    label: string().required(),
    value: string().required()
  }),
  operationNumber: string().required("Campo obligatorio"),
  paymentType: object({
    label: string().required(),
    value: string().required()
  }),
  date: string().required("Campo obligatorio"),
  // image?: File
  imageUrl: string()
})
