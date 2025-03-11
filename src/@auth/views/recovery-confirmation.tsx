import { Content } from '@/@common/components/content'
import Link from '@/@common/components/link'
import { Link as RouterLink } from 'react-router'

const RecoveryConfirmationPage = () => {
  return (
    <Content className="pt-32 pb-40 grid grid-cols-1 gap-y-16 md:grid-cols-3 md:gap-x-16 lg:grid-cols-2 lg:gap-x-32">
      <section className="flex flex-col justify-center gap-y-8 md:col-span-2 lg:col-span-1">
        <div>
          <h1 className="text-primary-700 text-3xl text-center font-bold">
            ¡El correo electrónico de recuperación fue enviado!
          </h1>
          <p className="text-primary-400 text-center">
            Por favor revise su bandeja de entrada y haga clic en el enlace recibido para restablecer la contraseña.
          </p>
        </div>
        <div>
          <Link href="/auth/login">
            Iniciar sesión
          </Link>
        </div>

        <div className="flex justify-center gap-x-2 text-primary-500">
          ¿No recibió el enlace?
          <RouterLink to="/resend" className="underline font-semibold hover:text-primary-700 hover:no-underline">
            Reenviar
          </RouterLink>
        </div>
      </section>

      <section className="h-full row-start-1 flex-col-center md:row-start-auto">
        <img
          src="/mailbox.svg"
          alt="masthead image"
          className="w-3/5 h-auto md:w-full"
        />
      </section>
    </Content>
  )
}

export default RecoveryConfirmationPage
