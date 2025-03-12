import { mixed, object } from "yup"

export const updateImageSchema = object().shape({
  image: mixed<File>()
    .required("Campo requerido")
    .test("fileSize", "La imagen es muy grande.", (value) => {
      return value && value.size <= 2 * 1024 * 1024;
    })
    .test("fileType", "El formato de archivo no es válido.", (value) => {
      return (
        value &&
        ["image/jpeg", "image/png", "image/gif"].includes(value.type)
      )
    })
})
