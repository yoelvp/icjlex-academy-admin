import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { useUserStore } from '@/@auth/store/use-user.store'
import { getUserInitials } from '@/@common/utils/get-initials'
import { useAuth } from '@/modules/[auth]/login/hooks/use-auth'

interface Props {
  className?: string
}

export const UserMenu = ({
  className
}: Props) => {
  const user = useUserStore((state) => state.user)
  const { logout } = useAuth()

  return (
    <div
      className={classNames(
        'flex flex-col gap-y-4 text-dark',
        className
      )}
    >
      <div className="flex gap-x-4 menu-section-padding">
        <div className="w-16 h-16 bg-primary-800 rounded-full flex-center text-white">
          {user && <span className="text-xl font-bold">{getUserInitials(user)}</span>}
        </div>
        <div className="flex-col-start">
          <strong className="text-xl font-bold text-primary-500">
            {user?.firstName} {user?.lastName}
          </strong>
          <span className="text-primary-400">{user?.email}</span>
        </div>
      </div>

      <hr className="line-sep-h" />

      <nav className="flex flex-col menu-section-padding">
        <Link to="/user/courses">
          Mis cursos
        </Link>
        <Link to="/user/settings">
          Configuraciones
        </Link>
      </nav>

      <hr className="line-sep-h" />

      <footer className="menu-section-padding">
        <button className="menu-item" onClick={logout}>
          Cerrar sesión
        </button>
      </footer>
    </div>
  )
}
