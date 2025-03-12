import { Drawer, RenderHTML } from "@/@common/components"
import { useUpdateTeacherStore } from "../store"
import { getFullName } from "@/@common/utils"

interface Props {
  show: boolean
  close: () => void
}

const TeacherDetailsDrawer = ({
  show,
  close
}: Props) => {
  const teacher = useUpdateTeacherStore((state) => state.teacher)
  const setTeacher = useUpdateTeacherStore((state) => state.setTeacher)

  const handleCloseDrawer = () => {
    setTeacher(null)
    close()
  }

  return (
    <Drawer
      show={show}
      onClose={handleCloseDrawer}
      title={`Detalles de ${teacher?.firstName} ${teacher?.lastName}`}
    >
      <div className="mb-4 flex-center">
        Image
      </div>
      <div className="rounded overflow-hidden border border-gray-200">
        <div className="px-4 py-2 flex items-center justify-start bg-gray-50 text-primary-700 font-bold border-b border-b-gray-200">
          Datos principales
        </div>
        <div className="py-2 px-4 space-y-4">
          <div className="grid grid-cols-2 gap-x-4">
            <article className="flex flex-col">
              <label className="text-zinc-400">
                Nombres
              </label>
              <span className="text-primary-700">
                {getFullName(teacher)}
              </span>
            </article>
            <article className="flex flex-col">
              <label className="text-zinc-400">
                Profesión
              </label>
              <span className="text-primary-700">
                {teacher?.profession}
              </span>
            </article>
          </div>

          <article className="flex flex-col">
            <label className="text-zinc-400">
              Redes sociales
            </label>
            <ul>
              {teacher?.socialMedia && !Array.isArray(teacher?.socialMedia) && (
                <li className="list-item list-disc list-inside">
                  <a href={teacher?.socialMedia}>
                    {teacher?.socialMedia}
                  </a>
                </li>
              )}
              {teacher?.socialMedia && Array.isArray(teacher?.socialMedia) && teacher?.socialMedia?.map((social) => (
                <li className="list-item list-disc list-inside">
                  <a href={social} className="hover:underline">
                    {social}
                  </a>
                </li>
              ))}
            </ul>
          </article>

          <article className="flex flex-col">
            <label className="text-zinc-400">
              Espacialidades
            </label>
            <ul>
              {teacher?.specialties && !Array.isArray(teacher?.specialties) && (
                <li className="list-item list-disc list-inside">
                  {teacher?.specialties}
                </li>
              )}
              {teacher?.specialties && Array.isArray(teacher?.specialties) && teacher?.specialties?.map((specialty) => (
                <li className="list-item list-disc list-inside">
                  {specialty}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-primary-700 font-bold">
          Acerca del docente
        </h3>
        <RenderHTML content={teacher?.about ?? ""} />
      </div>
    </Drawer>
  )
}

export default TeacherDetailsDrawer
