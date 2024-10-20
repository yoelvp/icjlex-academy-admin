import type { InferType } from 'yup'
import { studentPreRegistrationSchema } from '../schemas/student-pre-register.schema'

export type StudentPreRegistrationData = InferType<typeof studentPreRegistrationSchema>

export interface Student {
  id: string
  imageUrl: string
  firstName: string
  lastName: string
  email: string
  phone: string
  createdAt?: Date
  updatedAt?: Date
}

export interface StudentPreRegistration {
  id?: string
  email: string
  phone: string
}

export type StudentType = 'active' | 'registered'
