import { FC } from 'react'

import Button from '@/@common/components/button'
import Form from '@/@common/components/form'
import { Modal } from '@/modules/dashboard/components/modal'
import { SubmitHandler, useForm } from 'react-hook-form'
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
  } = useForm({
    resolver: yupResolver(courseSchema),
    defaultValues: {
      name: '',
      objetive: '',
      image: ''
    }
  })

  const onSubmit: SubmitHandler<T> = (data) => {
    console.log(data)
    reset()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Agregar Curso">
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4 w-full  overflow-y-auto"
        autoComplete="off"
      >
        <Form.Control>
          <Form.Label>Nombre</Form.Label>
          <Form.Input
            placeholder="Ingresa el nombre..."
            size="md"
            {...register('name')}
          />
          <Form.Error hasError={errors.name?.message} />
        </Form.Control>

        <Form.Control>
          <Form.Label>Objetivo</Form.Label>
          <Form.Input
            placeholder="Ingresa el objetivo..."
            size="md"
            {...register('objetive')}
          />
          <Form.Error hasError={errors.objetive?.message} />
        </Form.Control>

        <Form.Control>
          <Form.Label>Imagen</Form.Label>
          <input
            type="file"
            accept="image/*"
            className="block w-full text-sm text-primary-500 border border-primary-400 rounded-lg cursor-pointer  focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            {...register('image')}
          />
          <Form.Error hasError={errors.image?.message} />
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
