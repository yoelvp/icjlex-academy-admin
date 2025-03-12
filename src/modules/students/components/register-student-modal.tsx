import { SubmitHandler, useForm } from "react-hook-form"
import Form from "@/@common/components/form"
import { Modal } from "@/@common/components/modal"
import Button from "@/@common/components/button"
import { yupResolver } from "@hookform/resolvers/yup"
import { studentPreRegistrationSchema } from "../schemas/student-pre-register.schema"
import { usePreRegisterStudent } from "../hooks"
import { StudentPreRegistrationData } from "../types/Student"
import { Spinner } from "flowbite-react"
import { useStudentsStore } from "../store/use-students.store"

interface Props {
  isOpen: boolean
  onClose: () => void
}

const RegisterStudentModal = ({ isOpen, onClose }: Props) => {
  const { isLoading, preRegistration } = usePreRegisterStudent()
  const preRegisterStudent = useStudentsStore((state) => state.preRegistered)
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(studentPreRegistrationSchema),
    defaultValues: preRegisterStudent ? preRegisterStudent : {}
  })

  const onHandleSubmit: SubmitHandler<StudentPreRegistrationData> = (data) => {
    preRegistration(data)
      .then(() => {
        reset()
        onClose()
      })
  }

  return (
    <Modal
      title={`${preRegisterStudent ? "Editar" : "Registrar"} estudiante`}
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
    >
      <Form onSubmit={handleSubmit(onHandleSubmit)} className="pt-4 flex flex-col gap-y-4">
        <Form.Control>
          <Form.Label htmlFor="email">
            Correo electrónico
          </Form.Label>
          <Form.Input
            placeholder="Ingrese un correo electrónico"
            size="md"
            {...register("email")}
            error={errors.email?.message}
          />
        </Form.Control>

        <Form.Control>
          <Form.Label htmlFor="phone">
            Número de teléfono
          </Form.Label>
          <Form.Input
            placeholder="Ingresa el número de teléfono"
            size="md"
            type="number"
            error={errors.phone?.message}
            {...register("phone")}
          />
        </Form.Control>

        <div className="flex justify-end items-center gap-x-4 mt-4">
          <Button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
            variant="error.outline"
            size="sm"
          >
            Cancelar
          </Button>
          <Button type="submit" size="sm" disabled={isLoading}>
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
