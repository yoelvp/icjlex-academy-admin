import Link from "@/@common/components/link"
import { IconChevronBack } from "@/assets/icons"
import { CourseForm } from "../components/course-form"
import { useParams } from "react-router"
import { useEffect } from "react"
import { useCourseStore } from "../store/course.store"
import { useGetCourseById } from "../hooks/use-get-course-by-id"
import dayjs from "dayjs"

const UpdateCoursePage = () => {
  const params = useParams()
  const course = useCourseStore((state) => state.course)
  const { getCourseById } = useGetCourseById()

  useEffect(() => {
    if (!course && params?.id) {
      getCourseById(params?.id ?? "")
    }
  }, [])

  return (
    <div className="section-panel py-4 px-8">
      <div className="flex flex-col items-start gap-y-2">
        <Link href="/admin/courses/" variant="primary.link">
          <IconChevronBack />
          Regresar a cursos
        </Link>
        <header className="mb-4">
          <h2 className="header-title">
            Actualizar curso
          </h2>
        </header>
      </div>

      <section className="w-full max-w-2xl">
        <CourseForm
          defaultValues={{
            isScheduled: course?.isScheduled,
            publicationDate: dayjs(course?.publicationDate).toDate()
          }}
        />
      </section>
    </div>
  )
}

export default UpdateCoursePage
