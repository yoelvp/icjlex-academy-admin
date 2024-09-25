import type { FC } from 'react'
import { IconChevronDown, IconMenu } from '@/assets/icons'

interface HeaderProps {
  toggleSidebar: () => void
}

export const Header: FC<HeaderProps> = ({ toggleSidebar }) => {
  return (
    <header className="bg-primary-500 h-16 text-white px-4 flex items-center justify-between sm:justify-end sm:px-8">
      <button className="sm:hidden text-white" onClick={toggleSidebar}>
        <IconMenu />
      </button>

      <button className="flex-center gap-x-4">
        <div className="flex-center text-sm w-8 h-8 rounded-full bg-primary-100 text-primary-900">
          YV
        </div>
        <div className="flex items-start flex-col">
          <strong>Yoel Valverde</strong>
          <span className="text-xs font-medium">Administrador</span>
        </div>
        <IconChevronDown />
      </button>
    </header>
  )
}
