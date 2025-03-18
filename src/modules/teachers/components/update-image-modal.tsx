import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Modal } from "@/@common/components/modal"
import { ImageUpload } from "@/@common/components"
import Button from "@/@common/components/button"
import Form from "@/@common/components/form"
import { useTeachers } from "../hooks/use-teachers"
import { updateImageSchema } from "@/_schemas/teacher.schema"
import { UpdateTeacherImageFormSchema } from "@/_models/Teacher.model"

interface Props {
  show: boolean
  close: () => void
  defaultImage?: string
  teacherId: string
}

const UpdateImageModal = ({
  show,
  close,
  defaultImage,
  teacherId
}: Props) => {
  const [isUpdate, setIsUpdate] = useState(false)
  const { isLoading, updateImage } = useTeachers()
  const { register, handleSubmit, watch, formState: { errors } } = useForm<UpdateTeacherImageFormSchema>({
    resolver: yupResolver(updateImageSchema)
  })

  const onHandleSubmit: SubmitHandler<UpdateTeacherImageFormSchema> = (data) => {
    if (isUpdate) {
      updateImage(teacherId, data.image?.[0]).then(() => {
        close()
      })
    }
  }

  const handleUpdateImage = () => {
    handleSubmit(onHandleSubmit)()
  }

  useEffect(() => {
    setIsUpdate(true)

    return () => setIsUpdate(false)
  }, [watch("image")])

  return (
    <Modal
      title="Cambiar imagen"
      isOpen={show}
      onClose={close}
      className="h-auto"
    >
      <div className="h-full grid grid-rows-[1fr_auto] gap-y-8 pt-4">
        <div>
          <ImageUpload name="image" register={register} defaultImageUrl={defaultImage} />
          <Form.Error hasError={errors.image?.message} />
        </div>

        <div className="flex justify-end items-center gap-x-4">
          <Button
            variant="primary.outline"
            onClick={close}
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={handleUpdateImage}
            isLoading={isLoading}
          >
            Actualizar
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default UpdateImageModal
