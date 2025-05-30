import type { PaymentItem, RegisterPayment, RegisterPaymentParam } from "@/types"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import Select from "react-select"
import { DatePicker } from "antd"
import { yupResolver } from "@hookform/resolvers/yup"
import dayjs from "dayjs"
import { ImageUpload, Modal } from "@/@common/components"
import Form from "@/@common/components/form"
import Button from "@/@common/components/button"
import { PAYMENT_TYPE } from "../utils/constants"
import { paymentSchema } from "@/schemas/payment.schema"
import { useCreatePayment } from "../hooks"
import { useGetAllStudentOptions } from "@/modules/students/hooks"
import { useGetAllCourseOptions } from "@/modules/courses/hooks"

interface Props {
  show: boolean
  onClose: () => void
  addNewPayment: (payment: PaymentItem) => void
}

const RegisterPaymentModal = ({
  show,
  onClose,
  addNewPayment
}: Props) => {
  const { isLoading: isLoadingStudents, options: studentOptions } = useGetAllStudentOptions()
  const { isLoading: isLoadingCourses, options: courseOptions } = useGetAllCourseOptions()
  const { isLoading, createPayment } = useCreatePayment()
  const { control, register, handleSubmit, formState: { errors } } = useForm<RegisterPayment>({
    resolver: yupResolver(paymentSchema),
    mode: "onBlur"
  })

  const onHandleSubmit: SubmitHandler<RegisterPayment> = async (data) => {
    const newData: RegisterPaymentParam = {
      userId: data?.user?.value,
      courseId: data?.course?.value,
      operationNumber: data?.operationNumber,
      paymentType: data?.paymentType?.value,
      date: data?.date,
      image: data?.image?.[0]
    }

    createPayment(newData).then((paymentIdCreated) => {
      addNewPayment({
        id: paymentIdCreated ?? "",
        courseName: data?.course?.label,
        studentName: data?.user?.label,
        date: data?.date,
        type: data.paymentType?.label
      })
      onClose()
    })
  }

  return (
    <Modal
      size="md"
      isOpen={show}
      onClose={onClose}
      title="Registrar pago"
    >
      <Form onSubmit={handleSubmit(onHandleSubmit)} className="flex flex-col gap-4" disabled={isLoading}>
        <div className="space-y-4">
          <Form.Control>
            <Form.Label htmlFor="email">
              Buscar curso
            </Form.Label>
            <Controller
              name="course"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={courseOptions}
                  menuPosition="fixed"
                  isClearable
                  isSearchable
                  isLoading={isLoadingCourses}
                  placeholder="Seleccione el curso"
                  noOptionsMessage={() => <p>No hay cursos disponibles.</p>}
                />
              )}
            />
            <Form.Error hasError={errors.course?.message} />
          </Form.Control>

          <Form.Control>
            <Form.Label htmlFor="email">
              Buscar alumno
            </Form.Label>
            <Controller
              name="user"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={studentOptions}
                  menuPosition="fixed"
                  isClearable
                  isSearchable
                  isLoading={isLoadingStudents}
                  placeholder="Seleccione el estudiante"
                  noOptionsMessage={() => <p>No hay estudiantes registrados en la plataforma.</p>}
                />
              )}
            />
            <Form.Error hasError={errors.user?.message} />
          </Form.Control>
        </div>
        <div className="flex gap-4">
          <Form.Control>
            <Form.Label htmlFor="email">
              Número de operación
            </Form.Label>
            <Form.Input
              type="text"
              placeholder="Ingrese el número de operación del voucher"
              {...register("operationNumber")}
              error={errors?.operationNumber?.message}
            />
          </Form.Control>
          <Form.Control>
            <Form.Label htmlFor="email">
              Tipo de pago
            </Form.Label>
            <Controller
              name="paymentType"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={PAYMENT_TYPE}
                  menuPosition="fixed"
                  isClearable
                  isSearchable
                  placeholder="Seleccione el tipo de pago"
                />
              )}
            />
            <Form.Error hasError={errors.paymentType?.message} />
          </Form.Control>
        </div>
        <Form.Control>
          <Form.Label htmlFor="email">
            Fecha de pago
          </Form.Label>

          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                value={field.value ? dayjs(field.value as string | number | Date) : null}
                onChange={(date) => field.onChange(date ? date.toISOString() : "")}
                format="DD [de] MMM, YYYY - HH:mm:ss A"
                showTime
                className="h-10 w-full"
                placeholder="Selecciona la fecha de pago"
              />
            )}
          />
          <Form.Error hasError={errors.date?.message} />
        </Form.Control>
        <Form.Control>
          <Form.Label className="mb-1 flex justify-between">
            Selecciona tu imagen
          </Form.Label>
          <ImageUpload name="image" register={register} defaultImageUrl="" />
          <Form.Error hasError={errors.image?.message} />
        </Form.Control>

        <div className="flex justify-end gap-4 mt-4">
          <Button htmlType="button" onClick={onClose} variant="primary.outline" disabled={isLoading}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading} isLoading={isLoading}>
            Registrar pago
          </Button>
        </div>
      </Form>
    </Modal>
  )
}

export default RegisterPaymentModal
