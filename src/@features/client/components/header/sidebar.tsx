import type { FC } from 'react'

import { Link } from 'react-router-dom'
import { IconClose } from '@/assets/icons'
import { PAGES } from '@/@common/utils/pages'

interface Props {
  closeSidebar: () => void
}

export const Sidebar: FC<Props> = ({ closeSidebar }) => {
  return (
    <div className="w-screen h-screen bg-primary-500/40 fixed z-20 top-0 left-0 flex gap-x-4 lg:hidden">
      <div className="w-3/5 h-full bg-white md:w-2/5">
        <section className="flex flex-col gap-y-2 p-4 text-primary-500">
          <Link to="/auth/login" className="hover:underline">
            Iniciar sesion
          </Link>
          <a
            href="https://wa.me/51942208501?text=Estoy%interesado%en%estudiar%en%ICJ%LEX%&%CARRANZA%CONSULTORIA"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Hablar con un asesor
          </a>
        </section>

        <hr className="sep-line-h" />

        <section className="p-4">
          <nav className="flex flex-col gap-y-2 text-primary-500">
            {PAGES.map((page) => (
              <Link key={page.href} to={page.href} className="hover:underline">
                {page.label}
              </Link>
            ))}
          </nav>
        </section>

        <hr className="sep-line-h" />

        <section className="p-4">
          Holas
        </section>
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
