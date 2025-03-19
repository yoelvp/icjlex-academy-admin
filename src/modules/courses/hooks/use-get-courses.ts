import { useEffect } from "react"
import { toast } from "sonner"
import { HttpStatusCode, isAxiosError } from "axios"
import { useCoursesStore } from "../store/courses.store"
import { useLoading } from "@/@common/hooks/use-loading"
import getError from "@/@common/utils/get-errors"
import { usePagination } from "@/@common/hooks/use-pagination"
import { getAllCoursesService } from "@/_services/courses.service"
import { useDebounce } from "@/@common/hooks"
import { useSearchCourseStore } from "../store/search-course.store"

export const useGetCourses = () => {
  // const [searchQueryPublished, setSearchQueryPublished] = useState("")
  // const [searchQueryUpcoming, setSearchQueryUpcoming] = useState("")
  const { isLoading: isLoadingPublished, loading: loadingPublished, loaded: loadedPublished } = useLoading()
  const { isLoading: isLoadingUpcoming, loading: loadingUpcoming, loaded: loadedUpcoming } = useLoading()

  const publishedCourseQuery = useSearchCourseStore((state) => state.query)
  const scheduledCourseQuery = useSearchCourseStore((state) => state.scheduledQuery)

  const setPublishedCourses = useCoursesStore((state) => state.setPublishedCourses)
  const publishedCoursesPagination = useCoursesStore((state) => state.published.pagination)
  const setPublishedCoursesPagination = useCoursesStore((state) => state.setPublishedPagination)
  const publishedPaginationManager = usePagination(publishedCoursesPagination)
  const publishedDebounceValue = useDebounce({ value: publishedCourseQuery })

  const setScheduledCourses = useCoursesStore((state) => state.setScheduledCourses)
  const scheduedCoursesPagination = useCoursesStore((state) => state.scheduled.pagination)
  const setScheduledCoursesPagination = useCoursesStore((state) => state.setScheduluedPagination)
  const scheduledPaginationManager = usePagination(scheduedCoursesPagination)
  const scheduledDebounceValue = useDebounce({ value: scheduledCourseQuery })

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
        q: publishedCourseQuery,
        status: "published"
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
        q: scheduledCourseQuery,
        status: "scheduled"
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

  return {
    isLoadingPublished: isLoadingPublished,
    isLoadingUpcoming: isLoadingUpcoming,
    publishedPagination: publishedPaginationManager,
    scheduledPagination: scheduledPaginationManager
  }
}
