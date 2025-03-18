import { Drawer, RenderHTML } from "@/@common/components"
import { getFullName } from "@/@common/utils"
import { Teacher } from "@/_models/Teacher.model"

interface Props {
  teacher: Teacher | null
  show: boolean
  close: () => void
}

const TeacherDetailsDrawer = ({
  teacher,
  show,
  close
}: Props) => {
  return (
    <Drawer
      show={show}
      onClose={close}
      title={`Detalles de ${getFullName(teacher)}`}
    >
      <div className="mb-4 flex">
        <img src={teacher?.imageUrl ?? ""} alt="teacher profile" className="rounded-sm h-64 w-auto border-2 border-primary-500/10" />
      </div>
      <div className="rounded-md overflow-hidden border border-gray-200">
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
              {teacher?.socialMedia && Array.isArray(teacher?.socialMedia) && teacher?.socialMedia?.map((social, index) => (
                <li key={social + index} className="list-item list-disc list-inside">
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
              {teacher?.specialties && Array.isArray(teacher?.specialties) && teacher?.specialties?.map((specialty, index) => (
                <li key={specialty + index} className="list-item list-disc list-inside">
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
