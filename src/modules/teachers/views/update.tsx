import { Link as RouterLink, useParams } from "react-router"
import { IconArrowRoundBack } from "@/assets/icons"
import TeacherForm from "../components/teacher-form"
import { Spinner } from "flowbite-react"
import { useQuery } from "@tanstack/react-query"
import { QueryKeys } from "@/@common/utils"
import { getTeacherByIdService } from "@/_services/teachers.service"

const UpdateTeacherPage = () => {
  const params = useParams()
  const { data, isLoading } = useQuery({
    queryKey: [QueryKeys.COURSE_BY_ID, params?.teacherId ?? ""],
    queryFn: async () => await getTeacherByIdService(params?.teacherId ?? "")
  })
  const teacher = data?.data?.data

  const specialtiesForm = (s: string | string[] | null | undefined) => {
    if (!s) return undefined

    if (!Array.isArray(s)) return undefined

    if (Array.isArray(s)) {
      return s.map((specialty) => ({
        label: specialty,
        value: specialty
      }))
    }
  }

  const socialMediaForm = (socialMedia: string | string[] | undefined) => {
    if (!socialMedia) return undefined

    if (!Array.isArray(socialMedia)) return undefined

    if (Array.isArray(socialMedia)) {
      return socialMedia.map((social) => ({
        label: social,
        value: social
      }))
    }
  }

  return (
    <div className="flex flex-col gap-y-4 max-w-2xl">
      <header className="section-panel header-height flex-start gap-x-4">
        <RouterLink to="/admin/teachers" className="border border-primary-500 rounded-sm h-8 w-8 flex-center">
          <IconArrowRoundBack />
        </RouterLink>
        <h2 className="header-title">
          Actualizar docente
        </h2>
      </header>

      <div className="section-panel py-4">
        {isLoading && <Spinner color="gray" />}
        {!isLoading && (
          <TeacherForm
            isForUpdating
            defaultImageUrl={teacher?.imageUrl ?? ""}
            teacherId={teacher?.id}
            defaultValues={{
              firstName: teacher?.firstName,
              lastName: teacher?.lastName,
              specialties: specialtiesForm(teacher?.specialties),
              profession: teacher?.profession,
              about: teacher?.about,
              socialMedia: socialMediaForm(teacher?.socialMedia)
            }}
          />
        )}
      </div>
    </div>
  )
}

export default UpdateTeacherPage
