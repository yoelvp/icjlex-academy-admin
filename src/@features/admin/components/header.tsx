import { useSidebar } from '../store/use-sidebar.store'
import { IconChevronDown, IconMenuLeft, IconMenuRight } from '@/assets/icons'

export const Header  = () => {
  const toggle = useSidebar((state) => state.toggle)
  const show = useSidebar((state) => state.show)

  return (
    <header className="w-full bg-primary-500 h-16 text-white px-4 flex items-center justify-between">
      <button
        className="w-6 h-6 flex-center rounded-xs text-white transition-[shadow] duration-300 hover:ring hover:ring-white/15"
        onClick={toggle}
        aria-label={`${show ? 'Cerrar' : 'Abrir'} barra lateral`}
      >
        {show ? <IconMenuLeft size="20" /> : <IconMenuRight size="20" />}
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
