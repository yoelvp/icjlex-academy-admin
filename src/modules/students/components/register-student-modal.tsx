import { SubmitHandler, useForm } from 'react-hook-form'
import Form from '@/@common/components/form'
import { Modal } from '@/@common/components/modal'
import Button from '@/@common/components/button'
import { yupResolver } from '@hookform/resolvers/yup'
import { studentPreRegistrationSchema } from '../schemas/student-pre-register.schema'
import { useStudentPreRegistration } from '../hooks/use-student-pre-registration'
import { StudentPreRegistrationData } from '../types/Student'
import { Spinner } from 'flowbite-react'

interface Props {
  isOpen: boolean
  onClose: () => void
}

const RegisterStudentModal = ({ isOpen, onClose }: Props) => {
  const { isLoading, preRegistration } = useStudentPreRegistration()
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(studentPreRegistrationSchema)
  })

  const onHandleSubmit: SubmitHandler<StudentPreRegistrationData> = (data) => {
    preRegistration(data)
      .then(() => {
        reset()
        onClose()
      })
  }

  return (
    <Modal title="Registrar nuevo estudiante" isOpen={isOpen} onClose={onClose} size="sm">
      <Form onSubmit={handleSubmit(onHandleSubmit)} className="flex flex-col gap-y-4">
        <Form.Control>
          <Form.Label htmlFor="email">
            Correo electrónico
          </Form.Label>
          <Form.Input
            placeholder="Ingrese un correo electrónico"
            size="sm"
            {...register('email')}
            error={errors.email?.message}
          />
          <Form.Error hasError={errors.email?.message} />
        </Form.Control>

        <Form.Control>
          <Form.Label htmlFor="phone">
            Número de teléfono
          </Form.Label>
          <Form.Input
            placeholder="Ingresa el número de teléfono"
            size="sm"
            type="number"
            error={errors.phone?.message}
            {...register('phone')}
          />
          <Form.Error hasError={errors.phone?.message} />
        </Form.Control>

        <Form.Control>
          <Form.Label htmlFor="password">
            Contraseña
          </Form.Label>
          <Form.Password
            placeholder="Ingrese su contraseña"
            size="sm"
            error={errors.password?.message}
            {...register('password')}
          />
          <Form.Error hasError={errors.password?.message} />
        </Form.Control>

        <div className="flex justify-end items-center gap-x-4 mt-4">
          <Button variant="error.outline" size="sm">
            Cancelar
          </Button>
          <Button size="sm" disabled={isLoading}>
            {isLoading && (
              <Spinner />
            )}
            Registrar
          </Button>
        </div>
      </Form>
    </Modal>
  )
}

export default RegisterStudentModal
