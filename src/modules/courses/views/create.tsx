import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import SelectCreateable from 'react-select/creatable'
import ReactSelect from 'react-select'
import Button from '@/@common/components/button'
import Form from '@/@common/components/form'
import ImageUploader from '../components/image-uploader'
import Link from '@/@common/components/link'
import TextEditor from '@/@common/components/text-editor'
import { BadgeOptional, Switch } from '@/@common/components'
import { CourseFields, CourseFormData } from '../types/CourseFormFields'
import { courseSchema } from '../schemas/course.schema'
import { getFullName } from '@/@common/utils'
import { useCreateCourse } from '../hooks/use-create-courses'
import { useGetAllTeachersOnlyNames } from '@/modules/teachers/hooks/get-all-teachers-only-names'
import { useTeachersOnlyNamesStore } from '@/modules/teachers/store/teachers-only-name.store'
import { IconAdd, IconChevronBack } from '@/assets/icons'

const CreateCoursePage = () => {
  const { isLoading: isLoadingTeachers } = useGetAllTeachersOnlyNames()
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
      isScheduled: false,
      publicationDate: undefined
    }
  })
  const teachers = useTeachersOnlyNamesStore((state) => state.teachers)
  const formattedTeachers = teachers.map((teacher) => ({
    label: getFullName(teacher),
    value: teacher.id
  }))

  const onHandleSubmit: SubmitHandler<CourseFields> = async (data) => {
    const values = getValues()
    let image: File | null = null

    if (values.image && values.image instanceof File) {
      image = values.image
    }

    const formattedData: CourseFormData = {
      ...data,
      includes: data.includes.map((include) => include.label),
      youWillLearn: data.youWillLearn.map((include) => include.label),
      price: data.isFree ? null : data.price,
      image
    }

    await createCourse(formattedData, data.isScheduled ?? false)
  }

  return (
    <div className="section-panel max-w-2xl py-4 px-8">
      <div className="flex flex-col items-start gap-y-2">
        <Link href="/admin/courses/" variant="primary.link">
          <IconChevronBack />
          Regresar a cursos
        </Link>
        <header className="mb-4">
          <h2 className="header-title">
            Crear curso
          </h2>
        </header>
      </div>

      <section className="w-full">
        <Form onSubmit={handleSubmit(onHandleSubmit)} className="space-y-6">
          <Form.Control>
            <Form.Label>Nombre del curso</Form.Label>
            <Form.Input
              type="text"
              placeholder="Ingresa el nombre del curso..."
              error={errors.name?.message}
              {...register('name')}
              rounded="sm"
            />
          </Form.Control>

          <Form.Control>
            <Form.Label>Docente</Form.Label>
            <Controller
              name="teacherId"
              control={control}
              render={() => (
                <ReactSelect
                  options={formattedTeachers}
                  onChange={(selected) => setValue('teacherId', selected?.value ?? '')}
                  isClearable
                  isSearchable
                  isLoading={isLoadingTeachers}
                  placeholder="Selecciona el ponente de la clase"
                  menuPosition="fixed"
                  noOptionsMessage={() => 'No hay docentes registrados'}
                />
              )}
            />
            <Form.Error hasError={errors.teacherId?.message} />
          </Form.Control>

          <Form.Control>
            <Form.Label>Objetivo</Form.Label>
            <Form.Input
              type="text"
              rounded="sm"
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
            <ImageUploader name="image" setValue={setValue} />
            <Form.Error hasError={errors.image?.message} />
          </Form.Control>

          <div className="flex gap-6">
            <Form.Control>
              <Form.Label className="mb-1 flex justify-between">
                <span>Precio {watch('isFree') && '(es gratis)'}</span>
                {watch('isFree') && <BadgeOptional />}
              </Form.Label>
              <div className="h-10 flex items-center w-full gap-x-4">
                <Controller
                  name="isFree"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      {...field}
                      value={!field.value}
                      onChange={(checked) => {
                        if (checked) {
                          setValue('isFree', false)
                        } else {
                          setValue('isFree', true)
                          setValue('price', null)
                        }
                      }}
                    />
                  )}
                />
                {!watch('isFree') && (
                  <Form.Input
                    type="number"
                    placeholder="120.00"
                    rounded="sm"
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
                      onChange={(checked) => {
                        if (checked) {
                          setValue('isScheduled', true)
                        } else {
                          setValue('isScheduled', false)
                          setValue('publicationDate', undefined)
                        }
                      }}
                    />
                  )}
                />
                {watch('isScheduled') && (
                  <Form.Input
                    type="datetime-local"
                    rounded="sm"
                    {...register('publicationDate')}
                  />
                )}
              </div>
              <Form.Error hasError={errors.publicationDate?.message} />
            </Form.Control>
          </div>

          <div>
            <h3 className="text-primary-500 text-lg font-semibold">
              Datos del curso
            </h3>
            <hr className="sep-line-h mb-4" />

            <div className="grid grid-cols-2 gap-6">
              <Form.Control>
                <Form.Label>Nombre del video</Form.Label>
                <Form.Input
                  type="text"
                  rounded="sm"
                  placeholder="Ingresa el nombre de la clase"
                  error={errors.course?.name?.message}
                  {...register('course.name')}
                />
              </Form.Control>

              <Form.Control>
                <Form.Label>URL de la clase</Form.Label>
                <Form.Input
                  type="text"
                  rounded="sm"
                  placeholder="Ingresa la url del curso"
                  error={errors.course?.url?.message}
                  {...register('course.url')}
                />
              </Form.Control>

              <Form.Control>
                <Form.Label>
                  Duración
                </Form.Label>
                <Form.Input
                  type="text"
                  rounded="sm"
                  placeholder="3h 30m 20s"
                  error={errors.course?.duration?.message}
                  {...register('course.duration')}
                />
              </Form.Control>
            </div>
          </div>

          <div className="w-full flex justify-start gap-x-4 mt-8">
            <Button
              type="submit"
              size="md"
              rounded="sm"
              isLoading={isLoadingCreateCourse}
            >
              <IconAdd />
              Crear
            </Button>
            <Link
              href="/admin/courses"
              variant="primary.outline"
              size="md"
              rounded="sm"
            >
              Cancelar
            </Link>
          </div>
        </Form>
      </section>
    </div>
  )
}

export default CreateCoursePage
