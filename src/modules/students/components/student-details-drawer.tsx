import classNames from "classnames"
import { IconStudent } from "@/assets/icons"
import { Drawer, Spinner } from "flowbite-react"
import { StudentCard } from "./student-card"
import { useStudentsStore } from "../store/use-students.store"
import { useGetByIdStudent } from "../hooks"
import { getUserInitials } from "@/@common/utils/get-initials"
import { useEffect } from "react"

interface Props {
  show: boolean
  close: () => void
}

const StudentDetailsDrawer = ({ show, close }: Props) => {
  const studentId = useStudentsStore((state) => state.studentId)
  const { isLoading, getById } = useGetByIdStudent(studentId ?? "")
  const student = useStudentsStore((state) => state.activeStudent)
  const setActiveStudent = useStudentsStore((state) => state.setActiveStudent)

  useEffect(() => {
    getById()
  }, [])

  return (
    <Drawer
      open={show}
      className="!z-50 !w-96"
      position="right"
      onClose={() => {
        setActiveStudent(null)
        close()
      }}
    >
      <Drawer.Header title="Detalles del estudiante" titleIcon={IconStudent} />
      {isLoading && (
        <div className="flex-center">
          <Spinner color="info" />
        </div>
      )}
      {!isLoading && student && (
        <Drawer.Items className="space-y-8">
          {/* Main data */}
          <StudentCard title="Datos principales">
            <div className="p-2 flex flex-col gap-y-2">
              <div className="flex gap-x-4 items-center justify-start">
                {student.imageUrl ? (
                  <img
                    src={student.imageUrl}
                    alt="Image"
                    className="w-8 h-8 rounded-full border border-primary-200 text-xs"
                  />
                ) : (
                  <div className="w-8 h-8 flex-center text-xs font-bold rounded-full border border-primary-200">
                    {getUserInitials(student)}
                  </div>
                )}
                <div className="flex flex-col">
                  <strong className="leading-[100%] text-primary-700 font-bold">
                    Nombres
                  </strong>
                  <span className="text-primary-400">
                    {student?.firstName} {student?.lastName}
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <strong className="leading-[100%] text-primary-700 font-bold">
                  Email
                </strong>
                <span className="text-primary-400">
                  {student?.email}
                </span>
              </div>
              <div className="flex flex-col">
                <strong className="leading-[100%] text-primary-700 font-bold">
                  Número de teléfono
                </strong>
                <span className="text-primary-400">
                  {student?.phone}
                </span>
              </div>
            </div>
          </StudentCard>

          {/* Courses */}
          <StudentCard title="Cursos">
            <div className="flex flex-col">
              {!student.courses?.length && <span>Este estudiante no tiene cursos comprado aún</span>}
              {student.courses?.map((course, index) => (
                <div
                  key={course.id}
                  className={classNames(
                    "flex flex-col gap-x-2 items-center justify-start py-4",
                    { "border-b border-b-primary-100": (student.courses?.length ?? 0) - 1 !== index }
                  )}
                >
                  <img
                    src={course.imageUrl ?? "https://elearning.westernu.edu/wp-content/uploads/2015/02/HPE-Course-Placeholder-Image-1-1.jpg"}
                    alt="thumbnail of course"
                    className="w-full h-32 rounded-sm border border-primary-50 object-cover object-center"
                  />
                  <span className="text-primary-800 font-bold">
                    {course.name}
                  </span>
                </div>
              ))}
            </div>
          </StudentCard>
        </Drawer.Items>
      )}
    </Drawer>
  )
}

export default StudentDetailsDrawer
