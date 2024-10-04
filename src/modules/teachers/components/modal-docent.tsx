import { FC } from 'react'

import { SubmitHandler, useForm } from 'react-hook-form'
import Button from '@/@common/components/button'
import Form from '@/@common/components/form'

import { Modal } from '@/@common/components/modal'
import { yupResolver } from '@hookform/resolvers/yup'
import { docentSchema } from '../schemas/docent.schema'
import { Docent } from '../types/Docent'
import { useCreateTeacher } from '../hooks/use-create-teacher'
import {
  IconFacebook,
  IconLinkedin,
  IconWhatsapp,
  IconX,
  IconYoutube
} from '@/assets/icons'

interface ModalDocentsProps {
  isOpen: boolean
  onClose: () => void
}

const ModalDocent: FC<ModalDocentsProps> = ({ isOpen, onClose }) => {
  const { createTeacher, isLoading } = useCreateTeacher()

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset
  } = useForm<Docent>({
    resolver: yupResolver(docentSchema)
  })

  const onSubmit: SubmitHandler<Docent> = async (data) => {
    createTeacher(data)
    reset()
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Agregar docente">
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4 w-full h-[500px] overflow-y-auto"
        autoComplete="off"
      >
        {/* Nombre */}
        <div className="flex flex-col md:flex-row gap-4">
          <Form.Control>
            <Form.Label>Nombre</Form.Label>
            <Form.Input
              placeholder="Ingresa tu nombre..."
              size="md"
              {...register('firstName')}
            />
            <Form.Error hasError={errors.firstName?.message} />
          </Form.Control>

          {/* Apellido */}
          <Form.Control>
            <Form.Label>Apellido</Form.Label>
            <Form.Input
              placeholder="Ingrese su apellido..."
              size="md"
              {...register('lastName')}
            />
            <Form.Error hasError={errors.lastName?.message} />
          </Form.Control>
        </div>

        {/* Especialidades */}
        <Form.Control>
          <Form.Label>Especialidades (separadas por comas)</Form.Label>
          <Form.Input
            placeholder="Derecho penal, etc."
            size="md"
            {...register('specialties', { required: true })}
          />
          <Form.Error hasError={errors.specialties?.message} />
        </Form.Control>

        {/* Acerca de mí */}
        <Form.Control>
          <Form.Label>Acerca de mí</Form.Label>
          <Form.Input
            placeholder="Cuéntame sobre ti"
            size="md"
            {...register('aboutMe', { required: true })}
          />
          <Form.Error hasError={errors.aboutMe?.message} />
        </Form.Control>

        {/* Profesión */}
        <Form.Control>
          <Form.Label>Profesión</Form.Label>
          <Form.Input
            placeholder="Ingresa tu profesión..."
            size="md"
            {...register('profession', { required: true })}
          />
          <Form.Error hasError={errors.profession?.message} />
        </Form.Control>

        {/* Imagen */}
        <Form.Control>
          <Form.Label>Imagen</Form.Label>
          <Form.Input
            type="file"
            accept="image/*"
            size="md"
            {...register('image', { required: true })}
          />
          <Form.Error hasError={errors.image?.message} />
        </Form.Control>

        {/* Redes Sociales */}
        <p className="text-primary-500 font-bold">Redes Sociales</p>
        <div className="grid grid-cols-2 grid-rows-3 gap-x-4 gap-y-2">
          <Form.Control>
            <Form.Label>Youtube</Form.Label>
            <Form.Input
              placeholder="Url de youtube"
              size="sm"
              withIcon
              icon={IconYoutube}
              {...register('socialMedia.youtube')}
            />
            <Form.Error hasError={errors.socialMedia?.youtube?.message} />
          </Form.Control>

          <Form.Control>
            <Form.Label>WhatsApp</Form.Label>
            <Form.Input
              placeholder="Url de WhatsApp"
              size="sm"
              withIcon
              icon={IconWhatsapp}
              {...register('socialMedia.whatsapp')}
            />
            <Form.Error hasError={errors.socialMedia?.whatsapp?.message} />
          </Form.Control>

          <Form.Control>
            <Form.Label>Facebook</Form.Label>
            <Form.Input
              placeholder="Url de Facebook"
              size="sm"
              withIcon
              icon={IconFacebook}
              {...register('socialMedia.facebook')}
            />
            <Form.Error hasError={errors.socialMedia?.facebook?.message} />
          </Form.Control>

          <Form.Control>
            <Form.Label>Linkedin</Form.Label>
            <Form.Input
              placeholder="Url de Linkedin"
              size="sm"
              withIcon
              icon={IconLinkedin}
              {...register('socialMedia.linkedin')}
            />
            <Form.Error hasError={errors.socialMedia?.linkedin?.message} />
          </Form.Control>

          <Form.Control>
            <Form.Label>Twitter</Form.Label>
            <Form.Input
              placeholder="Url de Twitter"
              size="sm"
              withIcon
              icon={IconX}
              {...register('socialMedia.x')}
            />
          </Form.Control>
        </div>

        {/* Botones */}
        <div className="flex gap-8 w-full mt-8">
          <Button
            variant="error"
            className="w-full cursor-pointer"
            onClick={onClose}
          >
            Cerrar
          </Button>
          <Button htmlType="submit" className="w-full" disabled={!isDirty}>
            {isLoading ? 'Creando...': 'Enviar'}
          </Button>
        </div>
      </Form>
    </Modal>
  )
}

export default ModalDocent
