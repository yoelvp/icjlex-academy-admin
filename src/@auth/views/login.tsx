import type { SubmitHandler } from 'react-hook-form'

import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import { yupResolver } from '@hookform/resolvers/yup'
import { Spinner } from 'flowbite-react'
import Button from '@/@common/components/button'
import Form from '@/@common/components/form'
import { IconLockCloseOutline, IconMail } from '@/assets/icons'
import { useAuth } from '@/@auth/hooks/use-auth'
import { LoginFormSchema } from '@/@auth/types/Login'
import { loginFormSchema } from '@/@auth/schemas/login.schema'

const LoginPage = () => {
  const { isLoading, login } = useAuth()
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormSchema>({
    resolver: yupResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<LoginFormSchema> = async (data) => {
    login(data)
  }

  return (
    <section className="w-full max-w-lg border-2 border-primary-500/15 rounded-lg p-8 flex flex-col items-center justify-center gap-y-8">
      <img src="/logo.svg" alt="logo with colors" className="h-16 w-auto" />

      <h1 className="text-primary-700 text-3xl text-center font-bold">
        Inicia sesión en tu cuenta
      </h1>
      <div className="w-full">
        <Form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-4"
        >
          <Form.Control>
            <Form.Label htmlFor="email">
              Correo electrónico
            </Form.Label>
            <Form.Input
              placeholder="Ingresa tu correo electrónico"
              size="lg"
              withIcon
              icon={IconMail}
              disabled={isLoading}
              error={errors.email?.message}
              {...register('email')}
            />
          </Form.Control>
          <Form.Control>
            <Form.Label htmlFor="password">
              Contraseña
            </Form.Label>
            <Form.Password
              placeholder="Ingresa tu contraseña"
              size="lg"
              withIcon
              disabled={isLoading}
              icon={IconLockCloseOutline}
              error={errors.password?.message}
              {...register('password')}
            />
          </Form.Control>

          <Button htmlType="submit" disabled={isLoading}>
            {isLoading && <Spinner color="success" />}
            Iniciar sesión
          </Button>
        </Form>
      </div>

      <div className="flex justify-end">
        <Link to="/auth/forgot-password" className="underline text-primary-500 hover:text-primary-700 hover:no-underline">
          ¿Hás olvidado tu contraseña?
        </Link>
      </div>
    </section>
  )
}

export default LoginPage
