import { useEffect } from "react"
import { Link as ReactRouterLink, useParams } from "react-router"
import classNames from "classnames"
import Link from "@/@common/components/link"
import { RenderHTML } from "@/@common/components"
import {
  IconArrowRoundBack,
  IconEdit,
  IconLink
} from "@/assets/icons"
import { formatCurrency } from "@/@common/utils/currencies"
import { useCourseStore } from "../store/course.store"
import { useGetCourseById } from "../hooks/use-get-course-by-id"
import { formatDateTime, getFullName } from "@/@common/utils"

const CoursesPage = () => {
  const params = useParams()
  const course = useCourseStore((state) => state.course)
  const { getCourseById } = useGetCourseById()

  useEffect(() => {
    if (!course) {
      getCourseById(params?.id ?? "")
    }
  }, [])

  return (
    <div className="flex flex-col gap-y-4 h-full">
      <header className="header-height flex justify-between">
        <div className="flex justify-start gap-x-2">
          <ReactRouterLink
            to="/admin/courses"
            className={classNames(
              "inline-flex justify-center items-center w-8 h-8 rounded-xs border border-primary-500/15",
              "transition-colors duration-300",
              "hover:bg-primary-50 hover:border-primary-500/50"
            )}
          >
            <IconArrowRoundBack size="24" />
          </ReactRouterLink>
          <h2 className="header-title">Detalles del curso</h2>
        </div>
        <Link href={`/admin/courses/update/${course?.id ?? params.id}`} type="button" variant="primary.outline" size="sm" rounded="sm">
          <IconEdit />
          Editar
        </Link>
      </header>

      <section className="p-4">
        <div className="flex flex-col gap-y-16">
          <div className="grid grid-cols-2 gap-x-8">
            <article>
              <h3 className="text-primary-700 text-xl font-bold">
                {course?.name}
              </h3>
              <hr className="line-sep-h my-2" />
              <div className="mt-4">
                <h4 className="text-primary-700 text-lg font-bold">
                  Objetivo
                </h4>
                <p>
                  {course?.objective}
                </p>
              </div>
            </article>
            <div className="space-y-4">
              <img
                src={course?.imageUrl ?? "/image-placeholder.png"}
                alt="Thumbnail of course"
                className="w-full h-64 object-cover object-center rounded-md border-2 border-primary-500/15"
              />
              <div className="grid grid-cols-2 gap-x-4">
                <div className="flex flex-col gap-y-1">
                  <label className="text-zinc-600 text-sm">
                    Fecha de publicación
                  </label>
                  <strong className="text-primary-700 text-lg">
                    {formatDateTime(course?.publicationDate ?? null)}
                  </strong>
                </div>
                <div className="flex flex-col gap-y-1">
                  <label className="text-zinc-600 text-sm">
                    Precio
                  </label>
                  <strong className="text-primary-700 text-lg">
                    {formatCurrency(course?.price ?? 0)}
                  </strong>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-x-4">
            {course?.resources?.map((resource) => (
              <div key={resource.sectionName}>
                {resource?.classes?.map((classVideo) => (
                  <div key={classVideo.id} className="bg-primary-50/50 px-4 py-2 rounded-sm">
                    <h5 className="font-bold text-lg text-primary-500">
                      {classVideo.name} <span>({classVideo?.duration})</span>
                    </h5>
                    <a
                      href="https://zoom.us/class/jkkjkjjnHDka"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-primary-500 flex gap-x-2 items-center hover:text-primary-500 hover:decoration-wavy"
                    >
                      <IconLink />
                      {classVideo?.url}
                    </a>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-x-8">
            <div className="space-y-2">
              <h4 className="text-primary-700 text-lg font-bold">
                Lo que incluye el curso
              </h4>
              <ul className="grid grid-cols-2 list-disc list-inside">
                {course?.includes.map((include, index) => (
                  <li key={index}>{include}</li>
                ))}
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="text-primary-700 text-lg font-bold">
                Lo que aprenderá
              </h4>
              <ul>
                {course?.youWillLearn.map((learnItem, index) => (
                  <li key={index}>{learnItem}</li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h4 className="text-primary-700 text-lg font-bold mb-4">
              Descripción del curso
            </h4>
            <div>
              <RenderHTML content={course?.description ?? ""} />
            </div>
          </div>

          <div>
            <h4 className="text-primary-700 text-lg font-bold mb-2">
              Docentes
            </h4>
            <div className="flex flex-col gap-y-4">
              {course?.teachers?.map((teacher) => (
                <div key={teacher.id} className="flex gap-x-4 items-center justify-start bg-primary-50/50 px-4 py-8 rounded-sm">
                  {teacher.imageUrl ? (
                    <img
                      src={teacher.imageUrl}
                      alt="Teacher image"
                      className="w-12 h-12 rounded-full border border-zinc-400"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-zinc-200 flex-center text-sm font-bold text-zinc-600">
                      YV
                    </div>
                  )}
                  <div className="flex flex-col">
                    <strong>
                      {getFullName(teacher)}
                    </strong>
                    <span>
                      {teacher?.profession}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CoursesPage
