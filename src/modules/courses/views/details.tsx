import type { IdParams } from '@/@common/types'

import { Fragment, lazy, Suspense, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import classNames from 'classnames'
import { Tabs } from 'flowbite-react'
import Button from '@/@common/components/button'
import { useShow } from '@/@common/hooks/use-show'
import { TableLoading } from '@/@common/components/table-loading'
import { LoadingModal, Menu, RenderHTML } from '@/@common/components'
import {
  IconAdd,
  IconArrowRoundBack,
  IconCheckmark,
  IconChevronDown,
  IconEdit
} from '@/assets/icons'
import { formatCurrency } from '@/@common/utils/currencies'
import Form from '@/@common/components/form'
import { useGetCourseContents } from '../hooks'
import { useCourseContentsStore } from '../store'
import { CourseContents } from '@/_models/Course.model'
import { TableEmpty } from '@/@common/components/table-empty'

const ResourcesFromCourse = lazy(() => import('../components/resources-from-course'))

const CoursesPage = () => {
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set());
  const { show, open, close } = useShow()
  const params = useParams<IdParams>()
  const { isLoading } = useGetCourseContents(params.id ?? '')
  const contents = useCourseContentsStore((state) => state.contents)

  const handleEditTitle = () => {
    setIsEditingTitle(true)
  }
  const handleContentExpand = (index: number) => {
    setExpandedSections((prevExpandedSections) => {
      const newExpandedSections = new Set(prevExpandedSections)
      if (newExpandedSections.has(index)) {
        newExpandedSections.delete(index)
      } else {
        newExpandedSections.add(index)
      }

      return newExpandedSections
    })
  }

  const countTotalVideos = (section: CourseContents): number => {
    let count = 0

    section.classes.forEach((courseClass) => {
      if (courseClass.videoUrl) count++
    })

    return count
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
                  <th></th>
                  <th>Nombre</th>
                  <th>Cantidad de videos</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <TableLoading numCols={4} isLoading={isLoading} />
                <TableEmpty show={(contents?.length ?? 0) < 1} numCols={4} isLoading={isLoading} />
                {!isLoading && contents?.map((content, index) => (
                  <Fragment key={content.sectionName}>
                    <tr className="border-b border-gray-200">
                      <td>
                        <button
                          type="button"
                          onClick={() => handleContentExpand(index)}
                          className="w-8 h-8 rounded-sm border border-primary-500/50 flex-center hover:bg-primary-50"
                        >
                          <IconChevronDown />
                        </button>
                      </td>
                      <td>
                        {content.sectionName}
                      </td>
                      <td>
                        {countTotalVideos(content)}
                      </td>
                      <td>
                        <div className="border-l border-l-gray-300 flex justify-center">
                          <Menu
                            variant="white"
                            options={[]}
                          />
                        </div>
                      </td>
                    </tr>
                    {expandedSections.has(index) && (
                      <tr className="sub-table">
                        <td colSpan={4}>
                          <table className="w-full custom-table">
                            <thead>
                              <tr>
                                <th className="text-primary-700">Nombre del curso</th>
                                <th className="text-primary-700">Duración</th>
                                <th className="text-primary-700">URL del video</th>
                              </tr>
                            </thead>
                            <tbody>
                              {content?.classes?.map((contentClass) => (
                                <tr key={contentClass.className}>
                                  <td>{contentClass.className}</td>
                                  <td>
                                    {contentClass.duration}
                                  </td>
                                  <td>
                                    {contentClass.videoUrl}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    )}
                  </Fragment>
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
