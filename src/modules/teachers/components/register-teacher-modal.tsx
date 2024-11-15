import type { Teacher, TeacherFields } from '../types/Docent'

import { useState } from 'react'
import { type SubmitHandler, Controller, useForm } from 'react-hook-form'
import SelectCreatable from 'react-select/creatable'
import { Spinner, Tabs } from 'flowbite-react'
import Button from '@/@common/components/button'
import Form from '@/@common/components/form'
import { Modal } from '@/@common/components/modal'
import { yupResolver } from '@hookform/resolvers/yup'
import { docentSchema } from '../schemas/docent.schema'
import { useCreateTeacher } from '../hooks/use-create-teacher'
import TextEditor from '@/@common/components/text-editor'
import ImageUploader from '@/modules/courses/components/image-uploader'
import { BadgeOptional } from '@/@common/components'
import {
  IconFacebook,
  IconInstagram,
  IconLinkedin,
  IconWhatsapp,
  IconX,
  IconYoutube
} from '@/assets/icons'
import { ActiveTabIndex } from '../utils/active-tab.enum'

interface Props {
  isOpen: boolean
  onClose: () => void
}

const RegisterTeacherModal = ({ isOpen, onClose }: Props) => {
  const [activeTab, setActiveTab] = useState(0)
  const { createTeacher, isLoading } = useCreateTeacher()
  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<TeacherFields>({
    resolver: yupResolver(docentSchema)
  })

  const onSubmit: SubmitHandler<Teacher> = async (data) => {
    const newData = {
      ...data,
      specialties: data.specialties?.map((speciality) => speciality.label) ?? []
    }

    createTeacher(newData).then(() => {
      reset()
      onClose()
    })
  }

  const handleNext = () => {
    if (activeTab === ActiveTabIndex.FOUR) {
      handleSubmit(onSubmit)()
    } else {
      setActiveTab((prevState) => prevState + 1)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Agregar docente"
      className="h-[520px]"
    >
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="h-full max-h-full grid grid-rows-[1fr_auto] gap-y-4"
        autoComplete="off"
      >
        <Tabs variant="underline" aria-label="Register course" onActiveTabChange={(value) => setActiveTab(value)}>
          <Tabs.Item title="Información principal">
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <Form.Control>
                  <Form.Label>
                    Nombres
                  </Form.Label>
                  <Form.Input
                    placeholder="Ingresa los nombres"
                    size="md"
                    {...register('firstName')}
                  />
                  <Form.Error hasError={errors.firstName?.message} />
                </Form.Control>

                {/* LastName */}
                <Form.Control>
                  <Form.Label>
                    Apellidos
                  </Form.Label>
                  <Form.Input
                    placeholder="Ingrese los apellidos"
                    size="md"
                    {...register('lastName')}
                  />
                  <Form.Error hasError={errors.lastName?.message} />
                </Form.Control>
              </div>

              <Form.Control>
                <Form.Label>Especialidades</Form.Label>
                <Controller
                  name="specialties"
                  control={control}
                  render={({ field }) => (
                    <SelectCreatable
                      {...field}
                      isMulti
                      value={field.value || []}
                      isClearable
                      formatCreateLabel={(value) => `Crear ${value}`}
                      onChange={field.onChange}
                      placeholder="Lo que el estudiante aprenderá"
                      menuPosition="fixed"
                      noOptionsMessage={() => 'No hay opciones disponibles'}
                    />
                  )}
                />
                <Form.Error hasError={errors.specialties?.message} />
              </Form.Control>

              <Form.Control>
                <Form.Label>Profesión</Form.Label>
                <Form.Input
                  placeholder="Ingresa tu profesión..."
                  size="md"
                  error={errors.profession?.message}
                  {...register('profession', { required: true })}
                />
              </Form.Control>
            </div>
          </Tabs.Item>

          <Tabs.Item title="Detalles" className="h-full">
            <Form.Control>
              <Form.Label>
                Acerca de
              </Form.Label>
              <Controller
                name="about"
                control={control}
                render={({ field }) => (
                  <TextEditor
                    {...field}
                    placeholder="Acerca del docente"
                  />
                )}
              />
              <Form.Error hasError={errors.about?.message} />
            </Form.Control>
          </Tabs.Item>

          <Tabs.Item title="Imagen">
            <Form.Control>
              <Form.Label className="mb-1 flex justify-between">
                Selecciona tu imagen
              </Form.Label>
              <ImageUploader name="image" setValue={setValue} />
              <Form.Error hasError={errors.image?.message} />
            </Form.Control>
          </Tabs.Item>

          <Tabs.Item title="Redes sociales">
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-x-8">
                <Form.Control>
                  <Form.Label className="mb-1 flex justify-between">
                    LinkedIn
                    <BadgeOptional />
                  </Form.Label>
                  <Form.Input
                    placeholder="Ingresa la url del perfil de linkedin"
                    size="sm"
                    withIcon
                    icon={IconLinkedin}
                    {...register('socialMedia.linkedin')}
                  />
                  <Form.Error hasError={errors.socialMedia?.linkedin?.message} />
                </Form.Control>
                <Form.Control>
                  <Form.Label className="mb-1 flex justify-between">
                    Youtube
                    <BadgeOptional />
                  </Form.Label>
                  <Form.Input
                    placeholder="Ingresa la url del perfil de Youtube"
                    size="sm"
                    withIcon
                    icon={IconYoutube}
                    {...register('socialMedia.youtube')}
                  />
                  <Form.Error hasError={errors.socialMedia?.youtube?.message} />
                </Form.Control>
              </div>

              <div className="grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-x-8">
                <Form.Control>
                  <Form.Label className="mb-1 flex justify-between">
                    Facebook
                    <BadgeOptional />
                  </Form.Label>
                  <Form.Input
                    placeholder="Ingresa la url del perfil de Facebook"
                    size="sm"
                    withIcon
                    icon={IconFacebook}
                    {...register('socialMedia.facebook')}
                  />
                  <Form.Error hasError={errors.socialMedia?.facebook?.message} />
                </Form.Control>
                <Form.Control>
                  <Form.Label className="mb-1 flex justify-between">
                    Twitter (X)
                    <BadgeOptional />
                  </Form.Label>
                  <Form.Input
                    placeholder="Ingresa la url del perfil de Twitter"
                    size="sm"
                    withIcon
                    icon={IconX}
                    {...register('socialMedia.x')}
                  />
                  <Form.Error hasError={errors.socialMedia?.x?.message} />
                </Form.Control>
              </div>

              <div className="grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-x-8">
                <Form.Control>
                  <Form.Label className="mb-1 flex justify-between">
                    Instagram
                    <BadgeOptional />
                  </Form.Label>
                  <Form.Input
                    placeholder="Ingresa la url del perfil de Instagram"
                    size="sm"
                    withIcon
                    icon={IconInstagram}
                    {...register('socialMedia.instagram')}
                  />
                  <Form.Error hasError={errors.socialMedia?.instagram?.message} />
                </Form.Control>
                <Form.Control>
                  <Form.Label className="mb-1 flex justify-between">
                    WhatsApp
                    <BadgeOptional />
                  </Form.Label>
                  <Form.Input
                    placeholder="Ingresa el número de WhatsApp"
                    size="sm"
                    withIcon
                    icon={IconWhatsapp}
                    {...register('socialMedia.whatsapp')}
                  />
                  <Form.Error hasError={errors.socialMedia?.whatsapp?.message} />
                </Form.Control>
              </div>
            </div>
          </Tabs.Item>
        </Tabs>

        {/* Button for Actions */}
        <div className="flex gap-8 w-full mt-8">
          <Button
            type="button"
            variant="error.outline"
            className="w-full cursor-pointer"
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button htmlType="button" onClick={handleNext} className="w-full" disabled={isLoading}>
            {isLoading && <Spinner color="gray" />}
            {activeTab === ActiveTabIndex.FOUR ? 'Crear' : 'Siguiente'}
          </Button>
        </div>
      </Form>
    </Modal>
  )
}

export default RegisterTeacherModal
