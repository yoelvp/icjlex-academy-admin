import Form from '@/@common/components/form'
import Link from '@/@common/components/link'
import { Tabs, Tab } from '@/@common/components/tabs'
import { useCourseUI } from '../hooks/use-courses-ui'
import { TablePublishedCourses } from '../components/table-published-courses'
import { TableScheduledCourses } from '../components/table-scheduled-courses'
import {
  IconAdd,
  IconSearch
} from '@/assets/icons'

const CoursesPage = () => {
  const { tab, handleTabIndex } = useCourseUI()

  return (
    <div className="flex flex-col gap-y-4">
      <header className="flex-between">
        <h2 className="header-title">
          Cursos
        </h2>
        <div className="flex items-center gap-x-2">
          <Form.Input
            placeholder="Buscar..."
            size="sm"
            rounded="sm"
            withIcon
            icon={IconSearch}
          />
          <Link href="/admin/courses/create" size="sm" rounded="sm">
            <IconAdd size={24} />
            Crear
          </Link>
        </div>
      </header>

      <section>
        <Tabs defaultValue={tab === null ? 'published' : 'upcoming'}>
          <Tab title="Publicados" value="published" onChange={() => handleTabIndex(0)}>
            <TablePublishedCourses />
          </Tab>
          <Tab title="Programados" value="upcoming" onChange={() => handleTabIndex(1)}>
            <TableScheduledCourses />
          </Tab>
        </Tabs>
      </section>
    </div>
  )
}

export default CoursesPage
