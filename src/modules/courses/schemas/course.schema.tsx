import { array, boolean, date, mixed, number, object, string } from "yup"

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
  image: mixed()
    .nullable()
    .test("fileSize", "La imagen es muy grande.", (value) => {
      return value !== null && value instanceof File && value.size <= 2 * 1024 * 1024
    })
    .test("fileType", "El formato de archivo no es válido.", (value) => {
      return value !== null && value instanceof File && ["image/jpeg", "image/png", "image/gif"].includes(value.type)
    }),
  isFree: boolean().default(false).optional().nullable(),
  isScheduled: boolean().default(false).optional().nullable(),
  price: number()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .when("isFree", {
      is: true,
      then: () => number().nullable().default(null),
      otherwise: () => number()
        .typeError("El precio debe ser un número")
        .positive("Debe ser un número mayor a 0")
        .required("Campo requerido")
    }),
  publicationDate: date()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .when("isScheduled", {
      is: true,
      then: (schema) => schema.typeError("Ingrese una fecha válida").required("La fecha de publicación es obligatoria cuando se programa la publicación"),
      otherwise: () => mixed().nullable().default(null)
    }),
  course: object({
    name: string().required("Campo requerido"),
    url: string().url("Ingrese una URL válida").nullable(),
    duration: string()
      .matches(/^((\d+d\s*)?(\d+h\s*)?(\d+m\s*)?(\d+s\s*)?)$/i, "Formato inválido. Usa: 1d 4h 30m 20s")
      .required("Campo requerido")
  })
})
