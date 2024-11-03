import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { Badge } from 'flowbite-react'
import SelectCreatable from 'react-select/creatable'
import classNames from 'classnames'
import Form from '@/@common/components/form'
import { Modal } from '@/@common/components/modal'
import Button from '@/@common/components/button'
import TextEditor from '@/@common/components/text-editor'
import ImageUploader from './image-uploader'
import { courseSchema } from '../schemas/course.schema'
import { useTeacherStore } from '@/modules/teachers/store/teachers.store'
import { useGetAllTeachers } from '@/modules/teachers/hooks/use-get-all-teachers'
import { useConfirmModalStore } from '@/store/use-confirm-modal.store'
import { Switch } from '@/@common/components'
import { useCreateCourse } from '../hooks/use-create-courses'
import { useNavigate } from 'react-router-dom'
import { CourseFields, CourseFormData } from '../types/CourseFormFields'

interface Props {
  isOpen: boolean
  onClose: () => void
}

const RegisterCourseModal = ({
  isOpen,
  onClose
}: Props) => {
  const [activeTab, setActiveTab] = useState('main')
  const { isLoading: loadingTeacher } = useGetAllTeachers()
  const openConfirmModal = useConfirmModalStore((state) => state.open)
  const closeConfirmModal = useConfirmModalStore((state) => state.close)
  const teachers = useTeacherStore((state) => state.teachers)
  const navigate = useNavigate()
  const { isLoading: isLoadingCreateCourse, createCourse } = useCreateCourse()
  const {
    control,
    register,
    setValue,
    trigger,
    watch,
    getValues,
    formState: { errors }
  } = useForm<CourseFields>({
    resolver: yupResolver(courseSchema),
    mode: 'onChange',
    defaultValues: {
      isFree: false,
      isScheduled: false
    }
  })

  const TABS = ['main', 'description', 'details']

  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
  }

  const handleNext = async () => {
    const currentIndex = TABS.indexOf(activeTab)

    if (currentIndex < TABS.length - 1) {
      setActiveTab(TABS[currentIndex + 1])
    }

    if (currentIndex == TABS.length - 1) {
      if (await trigger()) {
        openConfirmModal({
          title: '¿Quiere agregar el contenido del curso ahora?',
          options: [
            {
              content: 'Sí, agregar secciones',
              isLoading: isLoadingCreateCourse,
              onClick: () => {
                handleFormSubmit().then(() => {
                  onClose()
                  navigate('/admin/courses/5')
                  closeConfirmModal()
                })
              }
            },
            {
              content: 'No, solo crear curso',
              isLoading: isLoadingCreateCourse,
              onClick: () => {
                handleFormSubmit().then(() => {
                  closeConfirmModal()
                  onClose()
                })
              }
            }
          ]
        })
      }
    }
  }

  const handlePrev = () => {
    const currentIndex = TABS.indexOf(activeTab)

    if (currentIndex > 0) {
      setActiveTab(TABS[currentIndex - 1])
    }

    if (currentIndex === 0) {
      onClose()
    }
  }

  const handleFormSubmit = async () => {
    const data = getValues()
    const publicationDate = data.publicationDate instanceof Date ? data.publicationDate.toISOString() : 'null'
    let image: File | null = null

    if (data.image && data.image instanceof File) {
      image = data.image
    }

    const formattedData: CourseFormData = {
      ...data,
      includes: data.includes.map((include) => include.label),
      youWillLearn: data.youWillLearn.map((include) => include.label),
      publicationDate,
      image
    }

    await createCourse(formattedData)
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setActiveTab('main')
        onClose()
      }}
      title="Crear curso"
      className="min-h-[580px]"
    >
      <div className="h-full grid grid-rows-[1fr_auto]">
        <Form autoComplete="off">
          <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
            <ul
              className="flex flex-wrap -mb-px text-sm font-medium text-center"
              role="tablist"
            >
              {TABS.map((tab) => (
                <li key={tab} className="me-2" role="presentation">
                  <button
                    className={classNames(
                      'inline-block p-4 border-b-2 rounded-none',
                      {
                        'text-primary-500 border-b-primary-600':
                          activeTab === tab
                      },
                      {
                        'border-b-primary-50/50 hover:text-gray-600 hover:border-b-primary-50':
                          activeTab !== tab
                      }
                    )}
                    type="button"
                    onClick={() => handleTabClick(tab)}
                    aria-selected={activeTab === tab}
                  >
                    {tab === 'main' && 'Información principal'}
                    {tab === 'description' && 'Descripción'}
                    {tab === 'details' && 'Detalles'}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div id="default-tab-content" className="h-full">
            {activeTab === 'main' && (
              <div className="space-y-4">
                <Form.Control>
                  <Form.Label>Nombre del curso</Form.Label>
                  <Form.Input
                    placeholder="Violencia contra Niñas, Niños y Adolescente en el ámbito..."
                    size="md"
                    error={errors.name?.message}
                    {...register('name')}
                  />
                </Form.Control>
                <Form.Control>
                  <Form.Label>Docente</Form.Label>
                  <select
                    className="text-sm text-primary-500 border border-primary-400 rounded-lg "
                    {...register('docentId')}
                  >
                    <option disabled value="">
                      {loadingTeacher
                        ? 'Cargando docentes...'
                        : 'Selecciona un docente'}
                    </option>

                    {!loadingTeacher &&
                      teachers?.map((teacher) => (
                        <option
                          key={teacher.id}
                          className="text-sm text-primary-500 border border-primary-400 rounded-lg"
                          value={teacher.id}
                        >
                          {teacher.firstName} {teacher.lastName}
                        </option>
                      ))}
                  </select>
                  <Form.Error hasError={errors.docentId?.message} />
                </Form.Control>

                <Form.Control>
                  <Form.Label>Objetivo</Form.Label>
                  <Form.Input
                    type="text"
                    placeholder="Ingresa el objetivo del curso"
                    error={errors.objective?.message}
                    {...register('objective')}
                  />
                </Form.Control>

                <Form.Control>
                  <Form.Label>Lo que aprenderá</Form.Label>
                  <Controller
                    name="youWillLearn"
                    control={control}
                    render={({ field }) => (
                      <SelectCreatable
                        {...field}
                        isMulti
                        value={field.value || []}
                        isClearable
                        formatCreateLabel={(value) => `Crear ${value}`}
                        onChange={field.onChange}
                        placeholder="Lo que el estudiante aprenderá"
                        menuPosition="fixed"
                        noOptionsMessage={() => 'No hay opciones disponibles'}
                      />
                    )}
                  />
                  <Form.Error hasError={errors.youWillLearn?.message} />
                </Form.Control>

                <Form.Control>
                  <Form.Label>Incluye</Form.Label>
                  <Controller
                    name="includes"
                    control={control}
                    render={({ field }) => (
                      <SelectCreatable
                        {...field}
                        isMulti
                        value={field.value || []}
                        isClearable
                        formatCreateLabel={(value) => `Crear ${value}`}
                        onChange={field.onChange}
                        placeholder="Lo que el curso incluye"
                        menuPosition="fixed"
                        noOptionsMessage={() => 'No hay opciones disponibles'}
                      />
                    )}
                  />
                  <Form.Error hasError={errors.includes?.message} />
                </Form.Control>
              </div>
            )}
            {activeTab === 'description' && (
              <div className="flex" role="tabpanel">
                <Form.Control>
                  <Form.Label>Detalles del curso</Form.Label>
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <TextEditor
                        {...field}
                        placeholder="Escribe los detalles del curso"
                      />
                    )}
                  />
                  <Form.Error hasError={errors.description?.message} />
                </Form.Control>
              </div>
            )}
            {activeTab === 'details' && (
              <div role="tabpanel" className="space-y-4">
                <Form.Control>
                  <Form.Label className="mb-1 flex justify-between">
                    Selecciona tu imagen
                    <Badge
                      color="gray"
                      size="sm"
                      className="font-thin text-xs text-primary-700"
                    >
                      opcional
                    </Badge>
                  </Form.Label>
                  <ImageUploader name={'image'} setValue={setValue} />
                  <Form.Error hasError={errors.image?.message} />
                </Form.Control>

                <section className="flex gap-6">
                  <Form.Control>
                    <Form.Label className="mb-1 flex justify-between">
                      <span>Precio {watch('isFree') && '(es gratis)'}</span>
                      <Badge
                        color="gray"
                        size="sm"
                        className="font-thin text-xs"
                      >
                        opcional
                      </Badge>
                    </Form.Label>
                    <div className="h-10 flex items-center w-full gap-x-4">
                      <Controller
                        name="isFree"
                        control={control}
                        render={({ field }) => (
                          <Switch
                            {...field}
                            onChange={(checked) => {
                              if (checked) {
                                setValue('price', '')
                                setValue('isFree', true)
                              } else {
                                setValue('isFree', false)
                              }
                            }}
                          />
                        )}
                      />
                      {!watch('isFree') && (
                        <Form.Input
                          placeholder="120.00"
                          size="md"
                          {...register('price')}
                        />
                      )}
                    </div>
                    <Form.Error hasError={errors.price?.message} />
                  </Form.Control>

                  <Form.Control>
                    <Form.Label className="mb-1 flex justify-between">
                      Programar publicación
                      <Badge
                        color="gray"
                        size="sm"
                        className="font-thin text-xs"
                      >
                        opcional
                      </Badge>
                    </Form.Label>
                    <div className="h-10 flex items-center w-full gap-x-4">
                      <Controller
                        name="isScheduled"
                        control={control}
                        render={({ field }) => (
                          <Switch
                            {...field}
                            onChange={(value) => {
                              if (value) {
                                setValue('isScheduled', true)
                              } else {
                                setValue('isScheduled', false)
                                setValue('publicationDate', null)
                              }
                            }}
                          />
                        )}
                      />
                      {watch('isScheduled') && (
                        <Form.Input
                          type="date"
                          {...register('publicationDate')}
                        />
                      )}
                    </div>
                    <Form.Error hasError={errors.publicationDate?.message} />
                  </Form.Control>
                </section>
              </div>
            )}
          </div>
        </Form>

        <div className="w-full flex justify-end gap-x-4 mt-8">
          <Button
            type="button"
            variant={activeTab === 'main' ? 'error.outline' : 'primary'}
            onClick={handlePrev}
          >
            {activeTab === 'main' ? 'Cancelar' : 'Anterior'}
          </Button>
          <Button type="button" onClick={handleNext}>
            {activeTab === 'details' ? 'Crear' : 'Siguiente'}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default RegisterCourseModal
