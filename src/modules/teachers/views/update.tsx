import { Link as RouterLink, useParams } from 'react-router-dom'
import { IconArrowRoundBack } from '@/assets/icons'
import TeacherForm from '../components/teacher-form'
import { useGetTeacherById } from '../hooks'
import { Spinner } from 'flowbite-react'
import { useEffect } from 'react'
import { useUpdateTeacherStore } from '../store'

const UpdateTeacherPage = () => {
  const params = useParams()
  const { isLoading, getTeacherById } = useGetTeacherById()
  const teacher = useUpdateTeacherStore((state) => state.teacher)
  const setTeacher = useUpdateTeacherStore((state) => state.setTeacher)

  useEffect(() => {
    if (!teacher && params.teacherId) {
      getTeacherById(params?.teacherId ?? '')
    }

    return () => setTeacher(null)
  }, [])

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
        url: social
      }))
    }
  }

  return (
    <div className="flex flex-col gap-y-4">
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
            defaultValues={{
              firstName: teacher?.firstName,
              lastName: teacher?.firstName,
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
