import { StudentCompleteName } from "./Student"

export interface Comment {
  student: StudentCompleteName
  commentDate: Date
  comment: string
}
