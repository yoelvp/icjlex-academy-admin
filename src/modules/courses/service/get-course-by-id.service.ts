import { API_URL } from '@/@common/env'
import axios from 'axios'

export const getCourseByIdService = (id) => {
  return axios.get(`${API_URL}/courses/${id}`)
}
