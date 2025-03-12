import { object, string } from "yup"

export const assignCourseToStudentSchema = object({
  courseId: string().required("Campo requerido")
})
