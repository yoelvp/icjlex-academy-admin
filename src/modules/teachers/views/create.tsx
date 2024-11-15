import Form from '@/@common/components/form'
import SelectCreatable from 'react-select/creatable'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Teacher, TeacherFields } from '../types/Docent'
import { yupResolver } from '@hookform/resolvers/yup'
import { docentSchema } from '../schemas/docent.schema'
import ImageUploader from '@/modules/courses/components/image-uploader'
import TextEditor from '@/@common/components/text-editor'
import Link from '@/@common/components/link'
import Button from '@/@common/components/button'
import { useCreateTeacher } from '../hooks/use-create-teacher'
import { Spinner } from 'flowbite-react'

const CreateTeacherPage = () => {
  const { createTeacher, isLoading } = useCreateTeacher()
  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<TeacherFields>({
    resolver: yupResolver(docentSchema)
  })

  const onHandleSubmit: SubmitHandler<Teacher> = async (data) => {
    const newData = {
      ...data,
      specialties: data.specialties?.map((speciality) => speciality.label) ?? []
    }

    await createTeacher(newData).then(() => {
      reset()
    })
  }

  return (
    <div className="section-panel py-4">
      <header className="flex-start mb-4">
        <h2 className="header-title">
          Crear docente
        </h2>
      </header>

      <Form onSubmit={handleSubmit(onHandleSubmit)} className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          <Form.Control>
            <Form.Label>
              Nombres
            </Form.Label>
            <Form.Input
              placeholder="Ingresa los nombres"
              size="md"
              {...register('firstName')}
            />
            <Form.Error hasError={errors.firstName?.message} />
          </Form.Control>

          {/* LastName */}
          <Form.Control>
            <Form.Label>
              Apellidos
            </Form.Label>
            <Form.Input
              placeholder="Ingrese los apellidos"
              size="md"
              {...register('lastName')}
            />
            <Form.Error hasError={errors.lastName?.message} />
          </Form.Control>
        </div>

        <Form.Control>
          <Form.Label>Especialidades</Form.Label>
          <Controller
            name="specialties"
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
          <Form.Error hasError={errors.specialties?.message} />
        </Form.Control>

        <Form.Control>
          <Form.Label>Profesión</Form.Label>
          <Form.Input
            placeholder="Ingresa tu profesión..."
            size="md"
            error={errors.profession?.message}
            {...register('profession', { required: true })}
          />
        </Form.Control>

        <Form.Control>
          <Form.Label>
            Acerca de
          </Form.Label>
          <Controller
            name="about"
            control={control}
            render={({ field }) => (
              <TextEditor
                {...field}
                placeholder="Acerca del docente"
              />
            )}
          />
          <Form.Error hasError={errors.about?.message} />
        </Form.Control>

        <Form.Control>
          <Form.Label className="mb-1 flex justify-between">
            Selecciona tu imagen
          </Form.Label>
          <ImageUploader name="image" setValue={setValue} />
          <Form.Error hasError={errors.image?.message} />
        </Form.Control>

        <div className="flex justify-end gap-4 w-full mt-8">
          <Link
            href="/admin/teachers"
            variant="error.outline"
          >
            Cancelar
          </Link>
          <Button htmlType="submit">
            {isLoading && <Spinner color="gray" />}
            Crear curso
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default CreateTeacherPage
