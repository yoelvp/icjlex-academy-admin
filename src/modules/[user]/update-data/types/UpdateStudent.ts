import { InferType } from 'yup'
import { updateDataSchema } from '../schemas/update-data.schema'

export type UpdateStudent = InferType<typeof updateDataSchema> & {
  image?: File
}
