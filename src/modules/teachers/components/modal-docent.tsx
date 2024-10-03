import { FC } from 'react'

import { SubmitHandler, useForm } from 'react-hook-form'
import Button from '@/@common/components/button'
import Form from '@/@common/components/form'

import {
  IconFacebook,
  IconLinkedin,
  IconWhatsapp,
  IconX,
  IconYoutube
} from '@/assets/icons'
import { Modal } from '@/modules/dashboard/components/modal'
import { yupResolver } from '@hookform/resolvers/yup'
import { docentSchema } from '../schemas/docent.schema'
import { useDocentStore } from '../store/docents-store'
import { Docent } from '../types/Docent'
import { toast, Toaster } from 'sonner'

interface ModalDocentsProps {
  isOpen: boolean
  onClose: () => void
}

const ModalDocent: FC<ModalDocentsProps> = ({ isOpen, onClose }) => {
  const addDocent = useDocentStore((state) => state.addDocents)

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset
  } = useForm<Docent>({
    resolver: yupResolver(docentSchema)
  })

  const onSubmit: SubmitHandler<Docent> = async (data) => {
    try {
      addDocent(data)
      console.log(data)
      toast.success('Docente agregado con exito!')
      reset()
    } catch (error) {
      toast.error('Ocurrió un problema.')
      console.log(error)
      reset()
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Agregar Docente">
      <Toaster
        richColors
        position="bottom-center"
        closeButton
        visibleToasts={2}
      />
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4 w-full h-[500px] overflow-y-auto"
      >
        {/* Nombre */}
        <Form.Control>
          <Form.Label>Nombre</Form.Label>
          <Form.Input
            placeholder="Ingresa tu nombre..."
            size="md"
            {...register('firstName')}
          />
          <Form.Error hasError={errors.firstName?.message}>
            {errors.firstName?.message}
          </Form.Error>
        </Form.Control>

        {/* Apellido */}
        <Form.Control>
          <Form.Label>Apellido</Form.Label>
          <Form.Input
            placeholder="Ingrese su apellido..."
            size="md"
            {...register('lastName')}
          />
          <Form.Error hasError={errors.lastName?.message}>
            {errors.lastName?.message}
          </Form.Error>
        </Form.Control>

        {/* Especialidades */}
        <Form.Control>
          <Form.Label>Especialidades (separadas por comas)</Form.Label>
          <Form.Input
            placeholder="Derecho penal, etc."
            size="md"
            {...register('specialties', { required: true })}
          />
          <Form.Error hasError={errors.specialties?.message}>
            {errors.specialties?.message}
          </Form.Error>
        </Form.Control>

        {/* Acerca de mí */}
        <Form.Control>
          <Form.Label>Acerca de mí</Form.Label>
          <Form.Input
            placeholder="Cuéntame sobre ti"
            size="md"
            {...register('aboutMe', { required: true })}
          />
          <Form.Error hasError={errors.aboutMe?.message}>
            {errors.aboutMe?.message}
          </Form.Error>
        </Form.Control>

        {/* Profesión */}
        <Form.Control>
          <Form.Label>Profesión</Form.Label>
          <Form.Input
            placeholder="Ingresa tu profesión..."
            size="md"
            {...register('profession', { required: true })}
          />
          <Form.Error hasError={errors.profession?.message}>
            {errors.profession?.message}
          </Form.Error>
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
          <Form.Error hasError={errors.image?.message}>
            {errors.image?.message}
          </Form.Error>
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
            <Form.Error hasError={errors.socialMedia?.youtube?.message}>
              {errors.socialMedia?.youtube?.message}
            </Form.Error>
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
            <Form.Error hasError={errors.socialMedia?.whatsapp?.message}>
              {errors.socialMedia?.whatsapp?.message}
            </Form.Error>
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
            <Form.Error hasError={errors.socialMedia?.facebook?.message}>
              {errors.socialMedia?.facebook?.message}
            </Form.Error>
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
            <Form.Error hasError={errors.socialMedia?.linkedin?.message}>
              {errors.socialMedia?.linkedin?.message}
            </Form.Error>
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
            Enviar
          </Button>
        </div>
      </Form>
    </Modal>
  )
}

export default ModalDocent
