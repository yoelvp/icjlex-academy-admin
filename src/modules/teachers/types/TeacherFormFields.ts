import type { InferType } from 'yup'

import { updateImageSchema } from '../schemas/update-image.schema'

export type UpdateTeacherImage = InferType<typeof updateImageSchema>
