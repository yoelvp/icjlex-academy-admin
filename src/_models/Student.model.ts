export interface StudentCompleteName {
  firstName: string
  lastName: string
}

export interface ValidateStudentHasPaidCourse {
  isPaid: boolean
  courseId: string
  studentId: string
}
