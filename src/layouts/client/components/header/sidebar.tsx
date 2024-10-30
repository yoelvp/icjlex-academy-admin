import { Link } from 'react-router-dom'
import { IconClose, IconProfile } from '@/assets/icons'
import { PAGES } from '@/@common/utils/pages'
import { useUserStore } from '@/@auth/store/use-user.store'
import { useTokenStore } from '@/@auth/store/use-token.store'
import { getUserInitials } from '@/@common/utils/get-initials'
import { whatsappMessage } from '@/@common/utils/whatsapp'
import { WHATSAPP_ADMIN_NUMBER_PHONE } from '@/@common/env'

interface Props {
  show: boolean
  closeSidebar: () => void
}

export const Sidebar = ({ closeSidebar }: Props) => {
  /* const location = useLocation() */
  const user = useUserStore((state) => state.user)
  const token = useTokenStore((state) => state.token)

  /* useEffect(() => { */
  /*   if (show) { */
  /*     closeSidebar() */
  /*   } */
  /* }, [location, show, closeSidebar]) */

  return (
    <div className="w-screen h-screen bg-primary-500/40 fixed z-20 top-0 left-0 flex gap-x-4 lg:hidden">
      <div className="w-3/5 h-full bg-white md:w-2/5">
        <section className="flex flex-col gap-y-2 p-4 text-primary-500">
          {!user && !token ? (
            <div>
              <Link to="/auth/login" className="hover:underline">
                Iniciar sesion
              </Link>
              <a
                href={whatsappMessage({
                  phoneNumber: WHATSAPP_ADMIN_NUMBER_PHONE,
                  message: 'Estoy interesado en tomar uno de sus cursos y quisiera saber más información acerca de las tarifas y acceso a la plataforma.'
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Hablar con un asesor
              </a>
            </div>
          ): (
            <div className="flex flex-col gap-y-4">
              <div className="flex gap-x-4 items-center">
                <div className="w-8 h-8 rounded-full bg-primary-50 text-sm font-bold flex-center">
                  {getUserInitials(user)}
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-primary-main">
                    {user?.firstName} {user?.lastName}
                  </span>
                  <span>
                    {user?.email}
                  </span>
                </div>
              </div>

              <Link to="/user/profile" className="flex gap-x-2 items-center hover:underline">
                <IconProfile />
                Mi perfil
              </Link>
            </div>
          )}
        </section>

        <hr className="sep-line-h" />

        <section className="p-4">
          <nav className="flex flex-col gap-y-2 text-primary-500">
            <Link to="/" className="hover:underline">
              Inicio
            </Link>
            {PAGES.map((page) => (
              <Link key={page.href} to={page.href} className="hover:underline">
                {page.label}
              </Link>
            ))}
          </nav>
        </section>

        {/* <hr className="sep-line-h" /> */}
        {/* <section className="p-4"> */}
        {/*   Holas */}
        {/* </section> */}
      </div>

      <button
        onClick={closeSidebar}
        className="w-10 h-10 mt-4 rounded-full bg-white hover:bg-primary-50 flex-center"
      >
        <IconClose size="24" />
      </button>
    </div>
  )
}
