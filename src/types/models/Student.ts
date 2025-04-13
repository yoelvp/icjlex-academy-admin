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
  email: string
  createdAt: Date
}

// Other
export interface AssignCourse {
  courseId: string
  studentId: string
}

// Forms
export interface StudentForm {
  firstName: string
  lastName: string
  email: string
  phone: string
}
