import type { SubmitHandler } from 'react-hook-form'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Content } from '@/@common/components/content'
import Form from '@/@common/components/form'
import Button from '@/@common/components/button'
import { recoverPasswordSchema } from '../schemas/recover-password.schema'
import { IconMail } from '@/assets/icons'
import { Link } from 'react-router-dom'

interface RecoverPasswordForm {
  email: string
}

const ForgotPasswordPage = () => {
  const { register, handleSubmit, formState: { errors, isDirty } } = useForm<RecoverPasswordForm>({
    resolver: yupResolver(recoverPasswordSchema),
    defaultValues: {
      email: ''
    }
  })

  const onSubmit: SubmitHandler<RecoverPasswordForm> = (data) => {
    console.log(data)
  }

  return (
    <Content className="pt-32 pb-40 grid grid-cols-1 gap-y-16 md:grid-cols-3 md:gap-x-16 lg:grid-cols-2 lg:gap-x-32">
      <section className="flex flex-col justify-center gap-y-8 md:col-span-2 lg:col-span-1">
        <div>
          <h1 className="text-primary-700 text-3xl text-center font-bold">
            ¿Haz olvidado la contraseña?
          </h1>
          <p className="text-primary-400 text-center">
            No te preocupes, ingresa tu correo electrónico registrado y te llegará un enlace para restablecer tu contraseña.
          </p>
        </div>
        <div>
          <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
            <Form.Control>
              <Form.Label>
                Correo electrónico
              </Form.Label>
              <Form.Input
                placeholder="Ingresa tu correo electrónico"
                error={errors?.email?.message}
                size="lg"
                withIcon
                icon={IconMail}
                {...register('email')}
              />
              <Form.Error hasError={errors.email?.message} />
            </Form.Control>

            <Button htmlType="submit" disabled={!isDirty}>
              Enviar enlace de recuperación
            </Button>
          </Form>
        </div>

        <div className="flex justify-center gap-x-2 text-primary-500">
          Ó
          <Link to="/auth/login" className="underline font-semibold hover:text-primary-700 hover:no-underline">
            Inicia sesión
          </Link>
        </div>
      </section>

      <section className="h-full row-start-1 flex-col-center md:row-start-auto">
        <img
          src="/my-password.svg"
          alt="masthead image"
          className="w-3/5 h-auto md:w-full"
        />
      </section>
    </Content>
  )
}

export default ForgotPasswordPage
