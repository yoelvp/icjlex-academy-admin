import type { SubmitHandler } from 'react-hook-form'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Form from '@/@common/components/form'
import Button from '@/@common/components/button'
import { recoverPasswordSchema } from '../schemas/recover-password.schema'
import { IconMail } from '@/assets/icons'
import { Link } from 'react-router'

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
    <section className="w-full max-w-lg border-2 border-primary-500/15 rounded-lg p-8 flex flex-col items-center justify-center gap-y-8">
      <img src="/logo.svg" alt="logo with colors" className="h-16 w-auto" />

      <div>
        <h1 className="text-primary-700 text-3xl text-center font-bold">
          ¿Haz olvidado la contraseña?
        </h1>
        <p className="text-primary-400 text-center">
          No te preocupes, ingresa tu correo electrónico registrado y te llegará un enlace para restablecer tu contraseña.
        </p>
      </div>
      <div className="w-full">
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
  )
}

export default ForgotPasswordPage
