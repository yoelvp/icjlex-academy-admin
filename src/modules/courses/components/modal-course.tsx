import { FC } from 'react'

import Button from '@/@common/components/button'
import Form from '@/@common/components/form'
import { Modal } from '@/modules/dashboard/components/modal'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Course } from '../types/Course'
import { courseSchema } from '../schemas/course.schema'
import { yupResolver } from '@hookform/resolvers/yup'

interface ModalCourseProps {
  isOpen: boolean
  onClose: () => void
}

const ModalCourse: FC<ModalCourseProps> = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset
  } = useForm<Course>({
    resolver: yupResolver(courseSchema),
    defaultValues: {
      name: '',
      description: '',
      isActive: true
    }
  })

  const onSubmit: SubmitHandler<Course> = (data) => {
    console.log(data)
    reset()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Agregar Curso">
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4 w-full"
      >
        <Form.Control>
          <Form.Label>Título</Form.Label>
          <Form.Input
            placeholder="Ingresa el título..."
            error={errors?.name?.message}
            size="lg"
            {...register('name')}
          />
          <Form.Error hasError={errors.description?.message}>
            {errors.description?.message}
          </Form.Error>
        </Form.Control>

        <Form.Control>
          <Form.Label>Estado</Form.Label>
          <select
            className="h-[2.75rem] pl-8 pr-6 md:h-[3rem] border rounded-xl text-base focus:outline-none focus:ring rounded border-primary-400 text-primary-300 placeholder:text-primary-200 disabled:bg-primary-50 disabled:border-primary-400 disabled:hover:text-primary-100 focus:ring-primary-500/20 ring-primary-500 appearance-none focus:border-primary-500"
            {...register('isActive')}
          >
            <option value="true">Activo</option>
            <option value="false">Inactivo</option>
          </select>
          <Form.Error hasError={errors.isActive?.message}>
            {errors.isActive?.message}
          </Form.Error>
        </Form.Control>
        <div className="flex gap-8 w-full mt-8">
          <Button
            variant="error"
            className="w-full cursor-pointer"
            onClick={onClose}
          >
            Cerrar
          </Button>
          <Button className="w-full" disabled={!isDirty}>
            Enviar
          </Button>
        </div>
      </Form>
    </Modal>
  )
}

export default ModalCourse
