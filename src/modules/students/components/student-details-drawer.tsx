import { IconStudent } from '@/assets/icons'
import { Drawer } from 'flowbite-react'
import { StudentCard } from './student-card'
/* import { useStudentsStore } from '../store/use-students.store' */

interface Props {
  show: boolean
  close: () => void
}

const StudentDetailsDrawer = ({ show, close }: Props) => {
  /* const studentId = useStudentsStore((state) => state.studentId) */

  return (
    <Drawer
      open={show}
      className="!z-50"
      position="right"
      onClose={close}
    >
      <Drawer.Header title="Detalles del estudiante" titleIcon={IconStudent} />
      <Drawer.Items className="space-y-8">
        {/* Main data */}
        <StudentCard title="Datos principales">
          <div className="p-2 flex flex-col gap-y-2">
            <div className="flex flex-col">
              <strong className="leading-[100%] text-primary-700 font-bold">
                Nombres
              </strong>
              <span className="text-primary-400">
                Yoel valverde
              </span>
            </div>
            <div className="flex flex-col">
              <strong className="leading-[100%] text-primary-700 font-bold">
                Email
              </strong>
              <span className="text-primary-400">
                yoelvp@gmail.com
              </span>
            </div>
            <div className="flex flex-col">
              <strong className="leading-[100%] text-primary-700 font-bold">
                Número de teléfono
              </strong>
              <span className="text-primary-400">
                987654321
              </span>
            </div>
          </div>
        </StudentCard>

        {/* Courses */}
        <StudentCard title="Cursos">
          <div className="flex flex-col">
            <span className="text-gray-800">
              maltrato
            </span>
          </div>
        </StudentCard>
      </Drawer.Items>
    </Drawer>
  )
}

export default StudentDetailsDrawer
