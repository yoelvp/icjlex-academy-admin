import Form from '@/@common/components/form'
import SelectCreateable from 'react-select/creatable'
import { BadgeOptional, Switch } from '@/@common/components'
import { useConfirmModalStore } from '@/store/use-confirm-modal.store'
import { useCreateCourse } from '../hooks'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { CourseFields, CourseFormData } from '../types/CourseFormFields'
import { yupResolver } from '@hookform/resolvers/yup'
import { courseSchema } from '../schemas/course.schema'
import ImageUploader from '../components/image-uploader'
import { useGetAllTeachers } from '@/modules/teachers/hooks/use-get-all-teachers'
import { useTeacherStore } from '@/modules/teachers/store/teachers.store'
import TextEditor from '@/@common/components/text-editor'
import Button from '@/@common/components/button'
import Link from '@/@common/components/link'

const CreateCoursePage = () => {
  const openConfirmModal = useConfirmModalStore((state) => state.open)
  const closeConfirmModal = useConfirmModalStore((state) => state.close)
  const { isLoading: loadingTeacher } = useGetAllTeachers()
  const { isLoading: isLoadingCreateCourse, createCourse } = useCreateCourse()
  const {
    control,
    register,
    setValue,
    watch,
    handleSubmit,
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
  const teachers = useTeacherStore((state) => state.teachers)

  const onHandleSubmit: SubmitHandler<CourseFields> = async (data) => {
    openConfirmModal({
      title: '¿Quiere agregar el contenido del curso ahora?',
      options: [
        {
          content: 'Sí, agregar secciones',
          isLoading: isLoadingCreateCourse,
          onClick: async () => {
            const values = getValues()
            const publicationDate = values.publicationDate instanceof Date ? values.publicationDate.toISOString() : 'null'
            let image: File | null = null

            if (values.image && values.image instanceof File) {
              image = values.image
            }

            const formattedData: CourseFormData = {
              ...data,
              includes: data.includes.map((include) => include.label),
              youWillLearn: data.youWillLearn.map((include) => include.label),
              publicationDate,
              image
            }

            await createCourse(formattedData).then(() => {
              /* navigate('/admin/courses/5') */
              closeConfirmModal()
            })

          }
        },
        {
          content: 'No, solo crear curso',
          isLoading: isLoadingCreateCourse,
          onClick: () => {
            closeConfirmModal()
          }
        }
      ]
    })
  }

  return (
    <div className="section-panel p-4">
      <header className="mb-4">
        <h2 className="header-title">
          Crear curso
        </h2>
      </header>

      <Form onSubmit={handleSubmit(onHandleSubmit)} className="space-y-6">
        <div className="flex gap-x-4">
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

              {!loadingTeacher && teachers?.map((teacher) => (
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
        </div>

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
              <SelectCreateable
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
              <SelectCreateable
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

        <Form.Control>
          <Form.Label className="mb-1 flex justify-between">
            Selecciona tu imagen
            <BadgeOptional />
          </Form.Label>
          <ImageUploader name={'image'} setValue={setValue} />
          <Form.Error hasError={errors.image?.message} />
        </Form.Control>

        <div className="flex gap-6">
          <Form.Control>
            <Form.Label className="mb-1 flex justify-between">
              <span>Precio {watch('isFree') && '(es gratis)'}</span>
              <BadgeOptional />
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
              <BadgeOptional />
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
        </div>

        <hr />

        <div className="grid grid-cols-3 gap-x-4">
          <Form.Control>
            <Form.Label>Nombre del video</Form.Label>
            <Form.Input
              type="text"
              placeholder="Ingresa el objetivo del curso"
              error={errors.course?.name?.message}
              {...register('course.name')}
            />
          </Form.Control>

          <Form.Control>
            <Form.Label>URL de la clase</Form.Label>
            <Form.Input
              type="text"
              placeholder="Ingresa el objetivo del curso"
              error={errors.course?.url?.message}
              {...register('course.url')}
            />
          </Form.Control>

          <Form.Control>
            <Form.Label className="mb-1 flex justify-between">
              Duración
              <BadgeOptional />
            </Form.Label>
            <Form.Input
              type="text"
              placeholder="Ingresa el objetivo del curso"
              error={errors.course?.url?.message}
              {...register('course.url')}
            />
          </Form.Control>
        </div>
      </Form>

      <div className="w-full flex justify-end gap-x-4 mt-8">
        <Link
          href="/admin/courses"
          variant="error.outline"
        >
          Cancelar
        </Link>
        <Button type="submit">
          Crear
        </Button>
      </div>
    </div>
  )
}

export default CreateCoursePage
