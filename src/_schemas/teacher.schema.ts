import { array, mixed, object, string } from "yup"

const MAX_FILE_SIZE = 5 * 1024 * 1024
const SUPPORTED_FORMATS = ["image/jpeg", "image/png", "image/webp"];

export const teacherSchema = object({
  firstName: string().required("Campo requerido"),
  lastName: string().required("Campo requerido"),
  specialties: array()
    .of(object({
      label: string().required(),
      value: string().required()
    }))
    .required("Campo requerido")
    .min(1, "Ingrese al menos un item"),
  profession: string().required("Campo requerido"),
  about: string().required("Campo requerido"),
  image: mixed<FileList>()
    .required("Campo requerido")
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
  imageUrl: string(),
  socialMedia: array()
    .of(object({
      label: string().required(),
      value: string().required()
    }))
    .required("Campo requerido")
    .min(1, "Debe agregar al menos un item")
})
