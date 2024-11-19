import { Link as RouterLink } from 'react-router-dom'
import { IconArrowRoundBack } from '@/assets/icons'
import TeacherForm from '../components/teacher-form'

const CreateTeacherPage = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="section-panel header-height flex-start gap-x-4">
        <RouterLink to="/admin/teachers" className="border border-primary-500 rounded-sm h-8 w-8 flex-center">
          <IconArrowRoundBack />
        </RouterLink>
        <h2 className="header-title">
          Crear docente
        </h2>
      </header>

      <div className="section-panel py-4">
        <TeacherForm />
      </div>
    </div>
  )
}

export default CreateTeacherPage
