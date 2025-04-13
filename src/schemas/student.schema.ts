import { object, string } from "yup"

export const studentSchema = object().shape({
  firstName: string().required("Campo requerido"),
  lastName: string().required("Campo requerido"),
  email: string().email("Ingrese un correo electrónico correcto").required("Campo requerido"),
  phone: string()
    .matches(/^\d+$/, "Solo se permiten números")
    .required("Campo requerido")
    .min(6, "Número demasiado corto")
})
