import Form from '@/@common/components/form'
import { Modal } from '@/@common/components/modal'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Selector } from './selector'
import Button from '@/@common/components/button'
import { JoditEditorComponent } from './jodit-editor'
import ImageUploader from './image-uploader'
import { Badge, Checkbox } from 'flowbite-react'
import { yupResolver } from '@hookform/resolvers/yup'
import { courseSchema } from '../schemas/course.schema'
import { useDocentStore } from '@/modules/teachers/store/teachers.store'
import { useGetAllTeachers } from '@/modules/teachers/hooks/use-get-all-teachers'
import { UseCourseStore } from '../store/course.store'

const MyModal = ({ isOpen, onClose, onSubmit }) => {
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

  const teachers = useDocentStore((state) => state.teachers)
  const { isLoading: loadingTeacher } = useGetAllTeachers()
  const { setCourseId } = UseCourseStore()

  const [activeTab, setActiveTab] = useState('main')
  const [isScheduled, setIsScheduled] = useState(false)
  const TABS = ['main', 'description', 'details']

  const handleCheckboxChange = (option: 'yes' | 'no') => {
    setIsScheduled(option === 'yes')
    setValue('startDate', option === 'yes' ? new Date().toISOString() : '') // ISO string o cadena vacía
  }

  const handleTabClick = (tab) => {
    setActiveTab(tab)
  }

  const handleNext = () => {
    const currentIndex = TABS.indexOf(activeTab)
    if (currentIndex < TABS.length - 1) {
      setActiveTab(TABS[currentIndex + 1])
    }
  }

  const handlePrev = () => {
    const currentIndex = TABS.indexOf(activeTab)
    if (currentIndex > 0) {
      setActiveTab(TABS[currentIndex - 1])
    }
  }

  const handleFormSubmit = async (data) => {
    console.log('Datos del formulario:', data)
    await onSubmit(data)
    setCourseId(data.courseId)
    console.log('id el curso', data.courseId)
    reset()
    onClose()
    setActiveTab('main')
  }

  return (
    isOpen && (
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setActiveTab('main')
          onClose()
        }}
        title={'Agregar Curso'}
      >
        <Form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
            <ul
              className="flex flex-wrap -mb-px text-sm font-medium text-center"
              role="tablist"
            >
              {TABS.map((tab) => (
                <li key={tab} className="me-2" role="presentation">
                  <button
                    className={`inline-block p-4 border-b-2 rounded-none ${
                      activeTab === tab
                        ? 'text-blue-600 border-blue-600'
                        : 'hover:text-gray-600 hover:border-gray-300'
                    }`}
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

          <div id="default-tab-content">
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

                <div className="w-full flex justify-between mt-8">
                  <Button type="button" variant={'error'} onClick={onClose}>
                    Cancelar
                  </Button>
                  <Button type="button" onClick={handleNext}>
                    Siguiente
                  </Button>
                </div>
              </div>
            )}
            {activeTab === 'description' && (
              <>
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
                <div className="w-full flex justify-between mt-8">
                  <Button
                    type="button"
                    variant={'primary.outline'}
                    onClick={handlePrev}
                  >
                    Anterior
                  </Button>
                  <Button type="button" onClick={handleNext}>
                    Siguiente
                  </Button>
                </div>
              </>
            )}
            {activeTab === 'details' && (
              <>
                <div role="tabpanel" className="space-y-4">
                  <Form.Control>
                    <div className="flex flex-col justify-between">
                      <Form.Label className="mb-2">
                        Selecciona tu imagen
                      </Form.Label>
                      <Badge
                        color="info"
                        size="sm"
                        className="font-thin text-xs"
                      >
                        opcional
                      </Badge>
                    </div>
                    <ImageUploader name={'image'} setValue={setValue} />
                    <Form.Error hasError={errors.image?.message} />
                  </Form.Control>

                  <section className="flex gap-6">
                    <Form.Control>
                      <div className="flex justify-between">
                        <Form.Label>Precio</Form.Label>
                        <Badge
                          color="info"
                          size="sm"
                          className="font-thin text-xs"
                        >
                          opcional
                        </Badge>
                      </div>
                      <Form.Input
                        placeholder="120.00"
                        size="md"
                        {...register('price')}
                      />
                      <Form.Error hasError={errors.price?.message} />
                    </Form.Control>

                    <Form.Control>
                      <div className="flex justify-between">
                        <Form.Label className="mb-2">
                          Programar publicación
                        </Form.Label>
                        <Badge
                          color="info"
                          size="sm"
                          className="font-thin text-xs"
                        >
                          opcional
                        </Badge>
                      </div>
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
                      </div>
                      {isScheduled && (
                        <Form.Input type="date" {...register('startDate')} />
                      )}
                    </Form.Control>
                  </section>
                </div>
                <div className="w-full flex justify-between mt-8">
                  <Button
                    type="button"
                    variant={'primary.outline'}
                    onClick={handlePrev}
                  >
                    Anterior
                  </Button>
                  <Button type="submit">Crear</Button>
                </div>
              </>
            )}
          </div>
        </Form>
      </Modal>
    )
  )
}

export default MyModal
