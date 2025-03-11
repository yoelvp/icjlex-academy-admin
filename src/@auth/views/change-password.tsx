import type { SubmitHandler } from 'react-hook-form'

import { Content } from '@/@common/components/content'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { changePasswordSchema } from '../schemas/change-password.schema'
import Form from '@/@common/components/form'
import { IconLockCloseOutline } from '@/assets/icons'
import Button from '@/@common/components/button'
import { Link } from 'react-router'

interface ChangePasswordForm {
  password: string
  repeatPassword: string
}

const ChangePasswordPage = () => {
  const { register, handleSubmit, formState: { errors, isDirty } } = useForm<ChangePasswordForm>({
    resolver: yupResolver(changePasswordSchema),
    defaultValues: {
      password: '',
      repeatPassword: ''
    }
  })

  const onSubmit: SubmitHandler<ChangePasswordForm> = (data) => {
    console.log(data)
  }

  return (
    <Content className="pt-32 pb-40 grid grid-cols-1 gap-y-16 md:grid-cols-3 md:gap-x-16 lg:grid-cols-2 lg:gap-x-32">
      <section className="flex flex-col justify-center gap-y-8 md:col-span-2 lg:col-span-1">
        <div className="flex-col-center gap-y-4">
          <h1 className="text-primary-700 text-3xl text-center font-bold">
            Cambia tu contraseña
          </h1>
          <p className="text-primary-400 text-center">
            Ingresa una nueva contraseña para acceder a tu plataforma
          </p>
        </div>
        <div>
          <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
            <Form.Control>
              <Form.Label>
                Contraseña
              </Form.Label>
              <Form.Password
                placeholder="Ingresa tu contraseña"
                size="lg"
                withIcon
                icon={IconLockCloseOutline}
                error={errors.repeatPassword?.message}
                {...register('password')}
              />
              <Form.Error hasError={errors.password?.message} />
            </Form.Control>
            <Form.Control>
              <Form.Label>
                Repite tu contraseña
              </Form.Label>
              <Form.Password
                placeholder="Ingresa tu contraseña"
                size="lg"
                withIcon
                icon={IconLockCloseOutline}
                error={errors.repeatPassword?.message}
                {...register('repeatPassword')}
              />
              <Form.Error hasError={errors.repeatPassword?.message} />
            </Form.Control>

            <Button disabled={!isDirty}>
              Cambiar contraseña
            </Button>
          </Form>
        </div>

        <div className="flex justify-center gap-x-2 text-primary-400">
          Ó
          <Link to="/auth/login" className="underline font-semibold text-primary-500 hover:text-primary-700 hover:no-underline">
            Inciar sesión
          </Link>
        </div>
      </section>

      <section className="h-full row-start-1 flex-col-center md:row-start-auto">
        <img
          src="/security-on.svg"
          alt="masthead image"
          className="w-3/5 h-auto md:w-full"
        />
      </section>
    </Content>
  )
}

export default ChangePasswordPage
