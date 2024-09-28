import type { SubmitHandler } from 'react-hook-form'

import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { Spinner } from 'flowbite-react'
import Button from '@/@common/components/button'
import Form from '@/@common/components/form'
import { Content } from '@/@common/components/content'
import { IconLockCloseOutline, IconMail } from '@/assets/icons'
import { LoginFormSchema } from '../types/Login'
import { loginFormSchema } from '../schemas/login.schema'
import { useAuth } from '../hooks/use-auth'

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
    <Content className="pt-32 pb-40 grid grid-cols-1 gap-y-16 md:grid-cols-3 md:gap-x-16 lg:grid-cols-2 lg:gap-x-32">
      <section className="flex flex-col justify-center gap-y-8 md:col-span-2 lg:col-span-1">
        <h1 className="text-primary-700 text-3xl text-center font-bold">
          Inicia sesión en tu cuenta
        </h1>
        <div>
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

        <hr className="sep-line-h" />

        <div className="text-primary-500 flex justify-end gap-1">
          <span>
            ¿No tienes una cuenta?
          </span>
          <a
            href="https://wa.me/51942208501?text=Estoy%interesado%en%estudiar%en%ICJ%LEX%&%CARRANZA%CONSULTORIA"
            className="text-primary-700 font-semibold underline hover:no-underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Registrate
          </a>
        </div>
      </section>

      <section className="h-full row-start-1 flex-col-center md:row-start-auto">
        <img
          src="/login.svg"
          alt="masthead image"
          className="w-3/5 h-auto md:w-full"
        />
      </section>
    </Content>
  )
}

export default LoginPage
