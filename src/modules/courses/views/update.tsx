import { IconChevronBack } from "@/assets/icons"
import { CourseForm } from "../components/course-form"
import { Link, useParams } from "react-router"
import { useQuery } from "@tanstack/react-query"
import { getCourseByIdService } from "@/_services/courses.service"
import { QueryKeys } from "@/@common/utils"
import { PricingType } from "../enums/pricing-type"
import { CourseFormFields } from "@/_models/Course.model"

const UpdateCoursePage = () => {
  const { id: courseId } = useParams()
  const { data, isLoading } = useQuery({
    queryKey: [QueryKeys.COURSE_TO_EDIT, courseId ?? ""],
    queryFn: () => getCourseByIdService(courseId ?? "")
  })

  const course = data?.data

  return (
    <div className="section-panel py-4 px-8">
      <div className="flex flex-col items-start gap-y-2">
        <Link to="/admin/courses/" className="flex items-center justify-start gap-x-2 underline underline-offset-2 hover:text-primary-500">
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
        {!isLoading && (
          <CourseForm
            defaultValues={{
              ...course,
              includes: course?.includes?.map((include) => ({ label: include, value: include })) ?? [],
              youWillLearn: course?.youWillLearn?.map((learn) => ({ label: learn, value: learn })) ?? [],
              princingType: course?.pricingType as PricingType,
              teacherId: course?.teachers[0].id,
              imageUrl: course?.imageUrl,
              course: {
                name: course?.resources[0].classes[0].name ?? "",
                duration: course?.resources[0].classes[0].duration ?? "",
                url: course?.resources[0].classes[0].url ?? ""
              }
            } as CourseFormFields}
          />
        )}
      </section>
    </div>
  )
}

export default UpdateCoursePage
