import { array, boolean, date, mixed, number, object, string } from "yup"
import { PricingType } from "@/modules/courses/enums/pricing-type";

const MAX_FILE_SIZE = 5 * 1024 * 1024
const SUPPORTED_FORMATS = ["image/jpeg", "image/png", "image/webp"];

const optionSchema = object().shape({
  label: string().required(),
  value: string().required()
})

export const courseSchema = object().shape({
  name: string().required("El nombre del curso es obligatorio"),
  teacherId: string().required("Seleccionar un docente es obligatorio"),
  objective: string().required("El objetivo es obligatorio"),
  youWillLearn: array()
    .of(optionSchema)
    .required("Campo requerido")
    .min(1, "Debe haber al menos un elemento"),
  includes: array()
    .of(optionSchema)
    .required("Campo requerido")
    .min(1, "Debe haber al menos un elemento"),
  description: string().required("Campo requerido"),
  image: mixed<FileList>()
    .nullable()
    .test(
      "fileSize",
      "La imagen no debe exceder los 5 MB",
      (value) => {
        if (!value || !(value instanceof FileList) || value.length === 0) {
          return false
        }

        return value[0].size <= MAX_FILE_SIZE
      }
    )
    .test(
      "fileType",
      "Debe ingresar una imágen válida",
      (value) => {
        if (!value || !(value instanceof FileList) || value.length === 0) {
          return false
        }

        return SUPPORTED_FORMATS.includes(value[0].type)
      }
    ),
  princingType: string().oneOf(Object.values(PricingType), "Debe elegir una opción válida"),
  isScheduled: boolean().default(false),
  price: number().nullable()
    .transform((value, originalValue) => (originalValue === "" ? 0 : value)),
  publicationDate: date().typeError("Ingrese una fecha válida").default(new Date()),
  course: object({
    name: string().required("Campo requerido"),
    url: string().url("Ingrese una URL válida").nullable(),
    duration: string()
      .matches(/^((\d+d\s*)?(\d+h\s*)?(\d+m\s*)?(\d+s\s*)?)$/i, "Formato inválido. Usa: 1d 4h 30m 20s")
      .required("Campo requerido")
  })
})
