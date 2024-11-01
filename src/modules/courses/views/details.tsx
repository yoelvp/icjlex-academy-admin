import { lazy, Suspense } from 'react'
import {
  IconAdd,
  IconArrowRoundBack,
  IconDelete,
  IconEdit,
  IconEye,
  IconList
} from '@/assets/icons'
import Button from '@/@common/components/button'
import { useShow } from '@/@common/hooks/use-show'
import { TableLoading } from '@/@common/components/table-loading'
import { LoadingModal, Menu } from '@/@common/components'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { List, Tabs } from 'flowbite-react'
import { useCoursesInformation } from '../hooks/use-get-courses-information'

const ResourcesFromCourse = lazy(
  () => import('../components/resources-from-course')
)

const CoursesPage = () => {
  const { show, open, close } = useShow()
  const { courses, isLoading } = useCoursesInformation(1, 999)

  return (
    <div className="flex-col gap-y-8 grid grid-rows-[auto_1fr]">
      <header className="section-panel header-height flex-between">
        <div className="flex-start gap-x-2">
          <Link
            to="/admin/courses"
            className={classNames(
              'inline-flex justify-center items-center w-8 h-8 rounded-xs border border-primary-500/15',
              'transition-colors duration-300',
              'hover:bg-primary-50 hover:border-primary-500/50'
            )}
          >
            <IconArrowRoundBack size="24" />
          </Link>
          <h2 className="header-title">Detalles del curso</h2>
        </div>
        <Button type="button" onClick={open} size="sm">
          <IconAdd size={24} />
          Agregar
        </Button>
      </header>
      <section className="section-panel p-4">
        <Tabs
          aria-label="Tabs de detalles"
          variant="underline"
          /* onActiveTabChange={handleTabIndex} */
        >
          {/* <Tabs.Item
            title="Información principal"
          >
            Buenas noches
          </Tabs.Item> */}
          <Tabs.Item
            title="Información principal"
          >
            <table className="custom-table mb-6">
              <thead>
                <tr>
                  <th>N°</th>
                  <th>Nombre</th>
                  <th>Videos</th>
                  <th>Recursos</th>
                  <th>Total de video</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <TableLoading numCols={6} isLoading={isLoading} />

                {!isLoading &&
                  courses?.map((course) => (
                    <tr key={course.id} className="border-b border-gray-200">
                      <td>{course.id}</td>
                      <td className="max-w-sm">{course.name}</td>
                      <td className="w-[15%]">{course.numClasses}</td>
                      <td>
                        {course.includes && course.includes.trim() !== '' ? (
                          <List>
                            {course.includes.split(',').map((item, index) => (
                              <List.Item icon={IconList} key={index}>
                                {item.trim()}
                              </List.Item>
                            ))}
                          </List>
                        ) : (
                          <p>No hay elementos incluidos.</p>
                        )}
                      </td>
                      <td>{course.totalClassTime}</td>
                      <td>
                        <div className="border-l border-l-gray-300 flex justify-center">
                          <Menu
                            variant="white"
                            options={[
                              {
                                label: 'Ver detalles',
                                icon: IconEye,
                                onClick: () => {
                                  console.log('Ver detalles')
                                }
                              },
                              {
                                label: 'Editar',
                                icon: IconEdit,
                                onClick: () => console.log('Editar')
                              },
                              {
                                label: 'Eliminar',
                                icon: IconDelete,
                                isDelete: true,
                                dividerTop: true,
                                onClick: () => console.log('delete course')
                              }
                            ]}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </Tabs.Item>
        </Tabs>
      </section>

      {show && (
        <Suspense fallback={<LoadingModal />}>
          <ResourcesFromCourse
            isOpen={show}
            onClose={close}
            courseCreatedId={''}
          />
        </Suspense>
      )}
    </div>
  )
}

export default CoursesPage
