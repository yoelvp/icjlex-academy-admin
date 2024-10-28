import { useSidebar } from '@/store/use-sidebar.store'
import { IconMenuLeft, IconMenuRight } from '@/assets/icons'
import { Menu } from '@/@common/components'
import { UserMenu } from '@/layouts/client/components/header/user-menu'
import { getUserInitials } from '@/@common/utils/get-initials'
import { useUserStore } from '@/@auth/store/use-user.store'

export const Header  = () => {
  const toggle = useSidebar((state) => state.toggle)
  const show = useSidebar((state) => state.show)
  const user = useUserStore((state) => state.user)

  return (
    <header className="w-full bg-primary-500 h-16 text-white px-4 flex items-center justify-between">
      <button
        className="w-6 h-6 flex-center rounded-xs text-white transition-[shadow] duration-300 hover:ring hover:ring-white/15"
        onClick={toggle}
        aria-label={`${show ? 'Cerrar' : 'Abrir'} barra lateral`}
      >
        {show ? <IconMenuLeft size="20" /> : <IconMenuRight size="20" />}
      </button>

      {user ? (
        <Menu activator={getUserInitials(user)} variant="white">
          <UserMenu />
        </Menu>
      ) : (
        <div>
          No se ecnuentra el usuario
        </div>
      )}
    </header>
  )
}
