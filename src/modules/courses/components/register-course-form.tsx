import { useState } from 'react'
import { Badge, Checkbox } from 'flowbite-react'
import classNames from 'classnames'
import Form from '@/@common/components/form'
import { Modal } from '@/@common/components/modal'
import { Controller, useForm } from 'react-hook-form'
import { Selector } from './selector'
import Button from '@/@common/components/button'
import { JoditEditorComponent } from './jodit-editor'
import ImageUploader from './image-uploader'
import { yupResolver } from '@hookform/resolvers/yup'
import { courseSchema } from '../schemas/course.schema'
import { useDocentStore } from '@/modules/teachers/store/teachers.store'
import { useGetAllTeachers } from '@/modules/teachers/hooks/use-get-all-teachers'
import { UseCourseStore } from '../store/course.store'
import { useConfirmModalStore } from '@/store/use-confirm-modal.store'

interface Props {
  isOpen: boolean
  onClose: () => void
  openCreateResourceModal: () => void
  updateCourseId: (id: string) => void
}

const RegisterCourseFormModal = ({ isOpen, onClose, updateCourseId, openCreateResourceModal }: Props) => {
  const teachers = useDocentStore((state) => state.teachers)
  const { isLoading: loadingTeacher } = useGetAllTeachers()
  const { setCourseId } = UseCourseStore()
  const openConfirmModal = useConfirmModalStore((state) => state.open)

  const [activeTab, setActiveTab] = useState('main')
  const [isScheduled, setIsScheduled] = useState(false)
  const TABS = ['main', 'description', 'details']
  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(courseSchema),
    defaultValues: {
      name: '',
      docentId: '',
      features: [],
      objetive: '',
      image: File || null,
      price: '',
      startDate: Date || ''
    }
  })

  const handleCheckboxChange = (option: 'yes' | 'no') => {
    setIsScheduled(option === 'yes')
    setValue('startDate', option === 'yes' ? new Date().toISOString() : '') // ISO string o cadena vacía
  }

  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
  }

  const handleNext = () => {
    const currentIndex = TABS.indexOf(activeTab)

    if (currentIndex < TABS.length - 1) {
      setActiveTab(TABS[currentIndex + 1])
    }

    if (currentIndex == TABS.length - 1) {
      handleSubmit(handleFormSubmit)
      console.log('Crear')
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

  const handleFormSubmit = async (data) => {
    /* console.log('Datos del formulario:', data) */
    /* await onSubmit(data) */
    /* setCourseId(data.courseId) */
    /* console.log('id el curso', data.courseId) */
    /* reset() */
    /* onClose() */
    /* setActiveTab('main') */
    openConfirmModal({
      title: '¿Quiere agregar el contenido del curso ahora?',
      options: [
        {
          content: 'Sí, crear secciones',
          onClick: () => console.log('Crear curso y secciones')
        },
        {
          content: 'No, solo crear curso',
          onClick: () => console.log('Crear solo el curso')
        }
      ]
    })
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
                      { 'text-primary-500 border-b-primary-600': activeTab === tab },
                      { 'border-b-primary-50/50 hover:text-gray-600 hover:border-b-primary-50': activeTab !== tab }
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
                    {...register('name')}
                  />
                  <Form.Error hasError={errors.name?.message} />
                </Form.Control>
                <Form.Control>
                  <Form.Label>Docente</Form.Label>
                  <select
                    className="text-sm text-primary-500 border border-primary-400 rounded-lg "
                    {...register('docentId')}
                  >
                    <option value="">
                      {loadingTeacher
                        ? 'Cargando docentes...'
                        : 'Selecciona un docente'}
                    </option>

                    {!loadingTeacher &&
                      teachers.map((teacher) => (
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
                  <Form.Label>Características</Form.Label>
                  <Controller
                    name="features"
                    control={control}
                    render={({ field }) => (
                      <Selector
                        value={field.value || []}
                        onChange={field.onChange}
                        placeholder="4 horas de video, 4 recursos descargables..."
                      />
                    )}
                  />
                  <Form.Error hasError={errors.features?.message} />
                </Form.Control>
                <Form.Control>
                  <Form.Label>Estado</Form.Label>
                  <select {...register('isActive')}>
                    <option value="" disabled selected>
                      Seleccione una opción
                    </option>
                    <option value="true">Si</option>
                    <option value="false">No</option>
                  </select>
                  <Form.Error hasError={errors.isActive?.message} />
                </Form.Control>
              </div>
            )}
            {activeTab === 'description' && (
              <div className="flex" role="tabpanel">
                <Controller
                  name="objetive"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <JoditEditorComponent
                      placeholder="Escribe aquí..."
                      onChange={onChange}
                    />
                  )}
                />
              </div>
            )}
            {activeTab === 'details' && (
              <>
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
                        Precio
                        <Badge
                          color="gray"
                          size="sm"
                          className="font-thin text-xs"
                        >
                          opcional
                        </Badge>
                      </Form.Label>
                      <Form.Input
                        placeholder="120.00"
                        size="md"
                        {...register('price')}
                      />
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
                      <div className="flex items-center w-full gap-2">
                        <Checkbox
                          id="yes"
                          checked={isScheduled}
                          onChange={() => handleCheckboxChange('yes')}
                        />
                        <label htmlFor="yes">Si</label>
                        <Checkbox
                          id="no"
                          checked={!isScheduled}
                          onChange={() => handleCheckboxChange('no')}
                        />
                        <label htmlFor="no">No</label>
                        {isScheduled && (
                          <Form.Input type="date" {...register('startDate')} />
                        )}
                      </div>
                    </Form.Control>
                  </section>
                </div>
              </>
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

export default RegisterCourseFormModal
