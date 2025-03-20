export interface StudentCompleteName {
  firstName: string
  lastName: string
}

export interface ValidateStudentHasPaidCourse {
  isPaid: boolean
  courseId: string
  studentId: string
}

export interface Student {
  id: string
  firstName: string
  lastName: string
  slug: string
  imageUrl?: string | null
  phone: string
  createdAt: Date
}
