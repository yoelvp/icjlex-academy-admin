import { Modal } from '@/@common/components/modal'
import { useTeacherStore } from '../store/teachers.store'
import { getFullName } from '@/@common/utils/get-full-names'
import { SubmitHandler, useForm } from 'react-hook-form'
import { UpdateTeacherImage } from '../types/TeacherFormFields'
import { yupResolver } from '@hookform/resolvers/yup'
import { updateImageSchema } from '../schemas/update-image.schema'
import ImageUploader from '@/modules/courses/components/image-uploader'
import Button from '@/@common/components/button'
import Form from '@/@common/components/form'
import { useTeachers } from '../hooks/use-teachers'

interface Props {
  show: boolean
  close: () => void
}

const UpdateImageModal = ({
  show,
  close
}: Props) => {
  const { isLoading, updateImage } = useTeachers()
  const teacher = useTeacherStore((state) => state.teacher)
  const setTeacher = useTeacherStore((state) => state.setTeacher)
  const { setValue, handleSubmit, formState: { errors } } = useForm<UpdateTeacherImage>({
    resolver: yupResolver(updateImageSchema)
  })

  const onHandleSubmit: SubmitHandler<UpdateTeacherImage> = (data) => {
    updateImage(teacher?.id ?? '', data).then(() => {
      close()
      setTeacher(null)
    })
  }

  const handleUpdateImage = () => {
    handleSubmit(onHandleSubmit)()
  }

  return (
    <Modal
      title={`Cambiar imagen | ${getFullName(teacher)}`}
      isOpen={show}
      onClose={close}
      className="h-96"
    >
      <div className="h-full grid grid-rows-[1fr_auto]">
        <div>
          <ImageUploader name="image" setValue={setValue} />
          <Form.Error hasError={errors.image?.message} />
        </div>

        <div className="flex justify-end items-center gap-x-4">
          <Button
            variant="error.outline"
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
