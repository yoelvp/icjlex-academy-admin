import type { IdParams } from '@/@common/types'

import { lazy, Suspense, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import classNames from 'classnames'
import { List, Tabs } from 'flowbite-react'
import Button from '@/@common/components/button'
import { useShow } from '@/@common/hooks/use-show'
import { TableLoading } from '@/@common/components/table-loading'
import { LoadingModal, Menu, RenderHTML } from '@/@common/components'
import { useCoursesInformation } from '../hooks/use-get-courses-information'
import {
  IconAdd,
  IconArrowRoundBack,
  IconCheckmark,
  IconDelete,
  IconEdit,
  IconEye,
  IconList
} from '@/assets/icons'
import { formatCurrency } from '@/@common/utils/currencies'
import Form from '@/@common/components/form'

const ResourcesFromCourse = lazy(() => import('../components/resources-from-course'))

const CoursesPage = () => {
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const { show, open, close } = useShow()
  const { courses, isLoading } = useCoursesInformation(1, 999)
  const params = useParams<IdParams>()
  console.log(params.id)

  const handleEditTitle = () => {
    setIsEditingTitle(true)
  }

  return (
    <div className="gap-y-4 grid grid-rows-[auto_1fr]">
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
        >
          <Tabs.Item
            title="Información principal"
          >
            <div className="flex flex-col gap-y-16">
              <div className="grid grid-cols-2 gap-x-8">
                <article>
                  <div className="flex items-center gap-x-4 py-4">
                    {!isEditingTitle ? (
                      <>
                        <h3 className="text-primary-700 text-xl font-bold">
                          Nombre del curso
                        </h3>
                        <button
                          type="button"
                          onClick={handleEditTitle}
                          className="flex-center w-8 h-8 rounded-xs transition-colors hover:bg-zinc-100"
                        >
                          <IconEdit size="16" />
                        </button>
                      </>
                    ) : (
                      <>
                        <Form.Input
                          type="text"
                          size="md"
                          value="Nombre del curso"
                          placeholder="Ingresa el nuevo título del curso"
                        />
                        <button
                          className="w-10 h-10 flex-center bg-primary-500 hover:bg-primary-600 text-white rounded-sm"
                          onClick={() => setIsEditingTitle(false)}
                        >
                          <IconCheckmark size="24" />
                        </button>
                      </>
                    )}
                  </div>
                  <hr className="line-sep-h" />
                  <div className="mt-4">
                    <h4 className="text-primary-700 text-lg font-bold">
                      Objetivo
                    </h4>
                    <p>
                      Lorem
                    </p>
                  </div>
                </article>
                <div className="space-y-4">
                  <img
                    src={'/image-placeholder.png'}
                    alt="Thumbnail of course"
                    className="w-full h-64 object-cover object-center rounded-xs"
                  />
                  <div className="grid grid-cols-2 gap-x-4">
                    <div className="flex flex-col gap-y-1">
                      <label className="text-zinc-600 text-sm">
                        Fecha de publicación
                      </label>
                      <strong className="text-primary-700 text-lg">
                        {'14 de junio de 2024'}
                      </strong>
                    </div>
                    <div className="flex flex-col gap-y-1">
                      <label className="text-zinc-600 text-sm">
                        Precio
                      </label>
                      <strong className="text-primary-700 text-lg">
                        {formatCurrency(20)}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-8">
                <div className="space-y-2">
                  <h4 className="text-primary-700 text-lg font-bold">
                    Lo que incluye el curso
                  </h4>
                  <ul className="grid grid-cols-2 list-disc list-inside">
                    <li>Hola 01</li>
                    <li>Hola 02</li>
                    <li>Hola 03</li>
                    <li>Hola 04</li>
                    <li>Hola 05</li>
                    <li>Hola 06</li>
                    <li>Hola 07</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="text-primary-700 text-lg font-bold">
                    Lo que aprenderá
                  </h4>
                  <ul>
                    <li>Hola</li>
                    <li>Hola 02</li>
                    <li>Hola 03</li>
                    <li>Hola 04</li>
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="text-primary-700 text-lg font-bold mb-4">
                  Descripción del curso
                </h4>
                <div>
                  <RenderHTML content="<p>Un buen curso</p>" />
                </div>
              </div>

              <div>
                <h4 className="text-primary-700 text-lg font-bold mb-2">
                  Docentes
                </h4>
                <div className="flex gap-x-4 items-center justify-start bg-primary-50/50 px-4 py-8 rounded-sm">
                  <div className="w-12 h-12 rounded-full bg-zinc-200 flex-center text-sm font-bold text-zinc-600">
                    YV
                  </div>
                  <div className="flex flex-col">
                    <strong>
                      {'Yoel Valverde'}
                    </strong>
                    <span>
                      {'Frontend developer'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Tabs.Item>
          <Tabs.Item
            title="Detalles"
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
