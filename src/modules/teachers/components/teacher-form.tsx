import SelectCreatable from 'react-select/creatable'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import Button from '@/@common/components/button'
import Form from '@/@common/components/form'
import Link from '@/@common/components/link'
import { TeacherFormSchema, TeacherFormValues } from '@/_models/Teacher'
import { teacherSchema } from '@/_schemas/teacher.schema'
import { useCreateTeacher, useUpdateTeacher } from '../hooks'
import TextEditor from '@/@common/components/text-editor'
import ImageUploader from '@/modules/courses/components/image-uploader'
import { IconAdd, IconDelete } from '@/assets/icons'
import { useUpdateTeacherStore } from '../store'
import { useNavigate } from 'react-router-dom'

interface Props {
  defaultValues?: Partial<TeacherFormSchema>
}

const TeacherForm = ({ defaultValues }: Props) => {
  const navigate = useNavigate()
  const { createTeacher, isLoading: isLoadingCreate } = useCreateTeacher()
  const { updateTeacher, isLoading: isLoadingUpdate } = useUpdateTeacher()
  const teacherToUpdate = useUpdateTeacherStore((state) => state.teacher)
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<TeacherFormSchema>({
    resolver: yupResolver(teacherSchema),
    defaultValues
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'socialMedia'
  })

  const onHandleSubmit: SubmitHandler<TeacherFormSchema> = async (data) => {
    const newData: TeacherFormValues = {
      ...data,
      image: data.image instanceof File ? data.image : null,
      specialties: data.specialties?.map((speciality) => speciality.label) ?? [],
      socialMedia: data.socialMedia?.map((social) => social.url) ?? []
    }

    if (teacherToUpdate) {
      await updateTeacher(newData).then(() => {
        navigate('/admin/teachers', { replace: true })
      })
    } else {
      await createTeacher(newData).then(() => {
        navigate('/admin/teachers', { replace: true })
      })
    }
  }

  return (
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

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Form.Control>
          <Form.Label className="mb-1 flex justify-between">
            Selecciona tu imagen
          </Form.Label>
          <ImageUploader name="image" setValue={setValue} />
          <Form.Error hasError={errors.image?.message} />
        </Form.Control>
        <Form.Control>
          <Form.Label className="mb-1 flex justify-between">
            Redes sociales
            <Form.Error hasError={errors.image?.message} />
          </Form.Label>
          <div className="space-y-4">
            {fields.map((field, index) => (
              <Controller
                key={field.id}
                control={control}
                name={`socialMedia.${index}.url`}
                render={({ field }) => (
                  <div className="flex items-center space-x-4">
                    <Form.Input {...field} placeholder="Ingrese el enlace" className="flex-grow" />
                    <div className="flex space-x-2">
                      {fields.length > 1 && (
                        <Button
                          type="button"
                          onClick={() => remove(index)}
                          variant="error"
                          aria-label={`Eliminar enlace ${index + 1}`}
                        >
                          <IconDelete />
                        </Button>
                      )}
                      {(index === fields.length - 1) && (
                        <Button
                          type="button"
                          onClick={() => append({ url: 'https://' })}
                          aria-label="Agregar nuevo enlace"
                        >
                          <IconAdd />
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              />
            ))}
          </div>
        </Form.Control>
      </div>

      <div className="flex justify-end gap-4 w-full mt-8">
        <Link
          href="/admin/teachers"
          variant="error.outline"
        >
          Cancelar
        </Link>
        <Button
          htmlType="submit"
          isLoading={defaultValues ? isLoadingUpdate : isLoadingCreate}
        >
          {!defaultValues ? 'Crear' : 'Editar'} docente
        </Button>
      </div>
    </Form>
  )
}

export default TeacherForm
