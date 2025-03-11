import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { HttpStatusCode, isAxiosError } from 'axios'
import { useCoursesStore } from '../store/courses.store'
import { useLoading } from '@/@common/hooks/use-loading'
import getError from '@/@common/utils/get-errors'
import { usePagination } from '@/@common/hooks/use-pagination'
import { getAllCoursesService } from '@/_services/courses.service'
import { useDebounce } from '@/@common/hooks'

export const useGetCourses = () => {
  const [searchQueryPublished, setSearchQueryPublished] = useState('')
  const [searchQueryUpcoming, setSearchQueryUpcoming] = useState('')
  const { isLoading: isLoadingPublished, loading: loadingPublished, loaded: loadedPublished } = useLoading()
  const { isLoading: isLoadingUpcoming, loading: loadingUpcoming, loaded: loadedUpcoming } = useLoading()

  const setPublishedCourses = useCoursesStore((state) => state.setPublishedCourses)
  const publishedCoursesPagination = useCoursesStore((state) => state.published.pagination)
  const setPublishedCoursesPagination = useCoursesStore((state) => state.setPublishedPagination)
  const publishedPaginationManager = usePagination(publishedCoursesPagination)
  const publishedDebounceValue = useDebounce({ value: searchQueryPublished })

  const setScheduledCourses = useCoursesStore((state) => state.setScheduledCourses)
  const scheduedCoursesPagination = useCoursesStore((state) => state.scheduled.pagination)
  const setScheduledCoursesPagination = useCoursesStore((state) => state.setScheduluedPagination)
  const scheduledPaginationManager = usePagination(scheduedCoursesPagination)
  const scheduledDebounceValue = useDebounce({ value: searchQueryUpcoming })

  useEffect(() => {
    getAllPublishedCourses()
  }, [publishedDebounceValue, publishedPaginationManager.page, publishedPaginationManager.perPage])

  useEffect(() => {
    getAllUpcomingCourses()
  }, [scheduledDebounceValue, scheduledPaginationManager.page, scheduledPaginationManager.perPage])

  const getAllPublishedCourses = async () => {
    loadingPublished()
    try {
      const { data: { data, pagination }, status } = await getAllCoursesService({
        page: publishedPaginationManager.page,
        perPage: publishedPaginationManager.perPage,
        q: searchQueryPublished,
        status: 'published'
      })

      if (status === HttpStatusCode.Ok) {
        setPublishedCourses(data)
        setPublishedCoursesPagination(pagination!)
      }
    } catch (error) {
      loadedPublished()
      if (isAxiosError(error)) {
        const { message } = getError(error)
        toast.error(message)
      }
    } finally {
      loadedPublished()
    }
  }

  const getAllUpcomingCourses = async () => {
    loadingUpcoming()
    try {
      const { data: { data, pagination }, status } = await getAllCoursesService({
        page: scheduledPaginationManager.page,
        perPage: scheduledPaginationManager.perPage,
        q: searchQueryUpcoming,
        status: 'scheduled'
      })

      if (status === HttpStatusCode.Ok) {
        setScheduledCourses(data)
        setScheduledCoursesPagination(pagination!)
      }
    } catch (error) {
      loadedUpcoming()
      if (isAxiosError(error)) {
        const { message } = getError(error)
        toast.error(message)
      }
    } finally {
      loadedUpcoming()
    }
  }

  const updateSearchQuery = (value: string) => {
    setSearchQueryPublished(value)
  }

  const updateSearchQueryUpcoming = (value: string) => {
    setSearchQueryUpcoming(value)
  }

  return {
    isLoadingPublished: isLoadingPublished,
    isLoadingUpcoming: isLoadingUpcoming,
    publishedPagination: publishedPaginationManager,
    scheduledPagination: scheduledPaginationManager,
    search: updateSearchQuery,
    searchUpcomingCourses: updateSearchQueryUpcoming
  }
}
