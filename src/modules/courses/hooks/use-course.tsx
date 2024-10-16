import { useLoading } from '@/@common/hooks/use-loading'
import { UseCourseStore } from '../store/course.store'
import { useEffect } from 'react'
import { getAllCoursesService } from '../service/course.service'
import getError from '@/@common/utils/get-errors'
import { toast } from 'sonner'

export const useCourses = (page: number | null, size: number | null) => {
  const { isLoading, loading, loaded } = useLoading()
  const setCourses = UseCourseStore((state) => state.setCourses)
  const setPagination = UseCourseStore((state) => state.setPagination)

  useEffect(() => {
    const validPage = page ?? 1
    const validSize = size ?? 10
    getAllCourses(validPage, validSize)
  }, [page, size])

  const getAllCourses = async (page: number, size: number) => {
    loading()
    try {
      const { data } = await getAllCoursesService(page, size)
      setCourses(data.results)
      setPagination({
        count: data.count,
        totalPages: data.totalPages,
        currentPage: data.currentPage,
        size: data.size
      })
    } catch (error) {
      loaded()
      const { message } = getError(error)
      toast.error(message)
    } finally {
      loaded()
    }
  }

  return {
    isLoading
  }
}
