import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Modal } from "@/@common/components"
import Button from "@/@common/components/button"
import Form from "@/@common/components/form"
import { studentSchema } from "@/schemas/student.schema"
import { StudentForm } from "@/types"
import { useCreateStudent } from "../hooks/use-create-student"

interface Props {
  open: boolean
  onClose: () => void
}

const StudentFormModal = ({ open, onClose }: Props) => {
  const { register, handleSubmit, formState: { errors } } = useForm<StudentForm>({
    mode: "onBlur",
    resolver: yupResolver(studentSchema)
  })
  const { mutateAsync, isPending } = useCreateStudent()

  const onSubmit: SubmitHandler<StudentForm> = async (data) => {
    await mutateAsync(data)
    onClose()
  }

  return (
    <Modal
      title="Create new student"
      isOpen={open}
      onClose={onClose}
      size="sm"
    >
      <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Form.Control>
          <Form.Label htmlFor="firstName">
            Nombres
            <Form.Input
              placeholder="Ingrese los nombres"
              id="firstName"
              {...register("firstName")}
              error={errors.firstName?.message}
              disabled={isPending}
            />
          </Form.Label>
        </Form.Control>
        <Form.Control>
          <Form.Label>
            Apellidos
          </Form.Label>
          <Form.Input
            placeholder="Ingrese los apellidos"
            {...register("lastName")}
            disabled={isPending}
            error={errors.lastName?.message}
          />
        </Form.Control>
        <Form.Control>
          <Form.Label>
            Correo electrónico
          </Form.Label>
          <Form.Input
            placeholder="Ingrese el correo electrónico"
            {...register("email")}
            disabled={isPending}
            error={errors.email?.message}
          />
        </Form.Control>
        <Form.Control>
          <Form.Label>
            Número de teléfono
          </Form.Label>
          <Form.Input
            placeholder="Ingrese su número de teléfono"
            {...register("phone")}
            disabled={isPending}
            error={errors.phone?.message}
          />
        </Form.Control>

        <div className="flex justify-end gap-x-4">
          <Button variant="primary.outline" rounded="sm" disabled={isPending}>
            Cancelar
          </Button>
          <Button type="submit" rounded="sm" disabled={isPending} isLoading={isPending}>
            Crear
          </Button>
        </div>
      </Form>
    </Modal>
  )
}

export default StudentFormModal
