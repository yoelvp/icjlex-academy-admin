import axios from 'axios'
import { ContentCourse } from '../types/Course'
import { API_URL } from '@/@common/env'

export const addContentFromService = async (
  courseId: string,
  resource: ContentCourse
) => {
  return await axios.post(
    `${API_URL}/courses/${courseId}/content`,
    resource.content,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
}
