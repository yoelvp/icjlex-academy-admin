import type { FC } from 'react'
import type { SubmitHandler } from 'react-hook-form'

import Button from '@/@common/components/button'
import Form from '@/@common/components/form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useForm } from 'react-hook-form'
import { IconAt, IconMail, IconPerson, IconPhone } from '@/assets/icons'
import { contactSchema } from '../utils/contact.schema'

interface ContactSchema {
  name: string
  email: string
  cellphone: string
  message: string
}

export const UsForm: FC = () => {
  const { register, handleSubmit, formState: { errors, isDirty } } = useForm<ContactSchema>({
    resolver: yupResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      cellphone: '',
      message: ''
    }
  })

  const onSubmit: SubmitHandler<ContactSchema> = (data) => {
    console.log(data)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4 w-6/12">
      <Form.Control>
        <Form.Label>
          Nombre
        </Form.Label>
        <Form.Input
          placeholder="Ingresa tu nombre..."
          error={errors?.name?.message}
          size="lg"
          withIcon
          icon={IconPerson}
          {...register('name')}
        />
        <Form.Error hasError={errors.name?.message} />
      </Form.Control>

      <div className="lg:flex  gap-4">
        <Form.Control>
          <Form.Label>
            Correo electrónico
          </Form.Label>
          <Form.Input
            placeholder="Ingresa tu correo electrónico..."
            error={errors?.email?.message}
            size="lg"
            withIcon
            icon={IconAt}
            {...register('email')}
          />
          <Form.Error hasError={errors.email?.message} />
        </Form.Control>

        <Form.Control>
          <Form.Label>
            Celular
          </Form.Label>
          <Form.Input
            placeholder="Ingresa tu número de celular..."
            error={errors?.cellphone?.message}
            size="lg"
            withIcon
            icon={IconPhone}
            {...register('cellphone')}
          />
          <Form.Error hasError={errors.cellphone?.message} />
        </Form.Control>
      </div>

      <Form.Control className="h-auto">
        <Form.Label>
          Mensaje
        </Form.Label>
        <Form.Input
          placeholder="Ingresa tu mensaje..."
          error={errors?.message?.message}
          size="lg"
          withIcon
          icon={IconMail}
          {...register('message')}
        />
        <Form.Error hasError={errors.message?.message} />
      </Form.Control>

      <Button disabled={!isDirty}>
        Enviar
      </Button>
    </Form>
  )
}
