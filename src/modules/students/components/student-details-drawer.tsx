import { getUserInitials } from "@/@common/utils/get-initials"
import { StudentCard } from "./student-card"
import { useGetStudentById } from "../hooks/use-get-student-by-id"
import { getFullName } from "@/@common/utils"
import { Drawer, Spinner } from "@/@common/components"

interface Props {
  show: boolean
  close: () => void
  studentId: string
}

const StudentDetailsDrawer = ({ show, close, studentId }: Props) => {
  const { isLoading, student } = useGetStudentById(studentId)

  return (
    <Drawer
      show={show}
      title="Detalles del estudiante"
      onClose={close}
    >
      {isLoading && (
        <div className="flex-center">
          <Spinner />
        </div>
      )}
      {!isLoading && student && (
        <div className="space-y-4">
          <StudentCard title="Datos principales">
            <div className="p-2 flex flex-col gap-y-2">
              <div className="flex gap-x-4 items-center justify-start">
                {student?.imageUrl ? (
                  <img
                    src={student?.imageUrl}
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
                    {getFullName(student)}
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

          {/* <StudentCard title="Cursos">
            <div className="flex flex-col">
              {!student.courses?.length && <span>Este estudiante no tiene cursos comprado aún</span>}
              {student.courses?.map((course, index) => (
                <div
                  key={course?.id}
                  className={classNames(
                    "flex flex-col gap-x-2 items-center justify-start py-4",
                    { "border-b border-b-primary-100": (student?.courses?.length ?? 0) - 1 !== index }
                  )}
                >
                  <img
                    src={course?.imageUrl ?? "https://elearning.westernu.edu/wp-content/uploads/2015/02/HPE-Course-Placeholder-Image-1-1.jpg"}
                    alt="thumbnail of course"
                    className="w-full h-32 rounded-sm border border-primary-50 object-cover object-center"
                  />
                  <span className="text-primary-800 font-bold">
                    {course?.name}
                  </span>
                </div>
              ))}
            </div>
          </StudentCard> */}
        </div>
      )}
    </Drawer>
  )
}

export default StudentDetailsDrawer
