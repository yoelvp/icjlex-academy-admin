import { Link } from 'react-router'
import { IconArrowRoundBack } from '@/assets/icons'
import TeacherForm from '../components/teacher-form'

const CreateTeacherPage = () => {
  return (
    <div className="flex flex-col gap-y-4 max-w-2xl">
      <header className="section-panel header-height flex-start gap-x-4">
        <Link to="/admin/teachers" className="border border-primary-500 rounded-sm h-8 w-8 flex-center">
          <IconArrowRoundBack />
        </Link>
        <h2 className="header-title">
          Crear docente
        </h2>
      </header>

      <div className="section-panel py-4">
        <TeacherForm
          defaultValues={{
            socialMedia: [
              { label: 'https://', value: 'https://' }
            ]
          }}
        />
      </div>
    </div>
  )
}

export default CreateTeacherPage
