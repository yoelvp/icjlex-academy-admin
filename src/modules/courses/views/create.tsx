import Link from "@/@common/components/link"
import { IconChevronBack } from "@/assets/icons"
import { CourseForm } from "../components/course-form"
import { PricingType } from "../enums/pricing-type"

const CreateCoursePage = () => {
  return (
    <div className="section-panel max-w-2xl py-4 px-8">
      <div className="flex flex-col items-start gap-y-2">
        <Link href="/admin/courses/" variant="primary.link">
          <IconChevronBack />
          Regresar a cursos
        </Link>
        <header className="mb-4">
          <h2 className="header-title">
            Crear curso
          </h2>
        </header>
      </div>

      <section className="w-full">
        <CourseForm isToCreate defaultValues={{ princingType: PricingType.PAID }} />
      </section>
    </div>
  )
}

export default CreateCoursePage
