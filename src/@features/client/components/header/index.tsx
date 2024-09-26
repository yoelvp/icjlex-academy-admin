import type { FC } from 'react'

import { Link, useLocation } from 'react-router-dom'
import { useShow } from '@/@common/hooks/useShow'
import { PAGES } from '@/@common/utils/pages'
import { Sidebar } from './sidebar'
import { IconChevronDown, IconMenu, IconSearch } from '@/assets/icons'
import { useUserStore } from '@/@auth/store/use-user.store'
import Form from '@/@common/components/form'

export const Header: FC = () => {
  const { show, open, close } = useShow()
  const { pathname } = useLocation()
  const user = useUserStore((state) => state.user)

  return (
    <div>
      <header className="w-full bg-primary-500 relative">
        <div className="h-16 w-[90%] mx-auto flex items-center justify-between gap-8 text-white md:h-20">
          <button className="lg:hidden" onClick={open}>
            <IconMenu size="18" />
          </button>
          <div className="w-auto flex justify-between gap-x-8">
            <Link to="/" className="uppercase text-sm lg:text-2xl font-bold text-primary-50 text-nowrap absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 lg:relative lg:-translate-y-0 lg:translate-x-0 lg:left-0 lg:top-0">
              <img
                src="/logo-white.svg"
                className="h-12 w-auto md:h-14"
                alt="logo"
              />
            </Link>
            <nav className="hidden items-center justify-center gap-x-4 lg:flex">
              {PAGES.map((page) => (
                <div key={page.href}>
                  {!Boolean(page.subPages) && (
                    <Link
                      to={page.href}
                      className={`hover:text-primary-100 ${pathname === page.href ? 'underline' : ''}`}
                    >
                      {page.label}
                    </Link>
                  )}
                  {Boolean(page.subPages) && (
                    <li className="relative group/menu-item">
                      <button className="hover:text-primary-100 flex-center gap-x-2">
                        {page.label}
                        <IconChevronDown />
                      </button>
                      <div className="hidden transition-[display] duration-300 absolute w-auto z-40 top-6 left-0 pt-4 group-hover/menu-item:flex-col-start">
                        <ul className="bg-white rounded p-4 text-primary-500">
                          {page.subPages?.map((subPage, index) => (
                            <li key={index}>
                              <Link to={subPage.href} className="w-full inline-block text-nowrap rounded-sm pl-4 pr-8 py-2 hover:bg-primary-50">
                                {subPage.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  )}
                </div>
              ))}
            </nav>
          </div>

          <div className="w-auto flex justify-end items-center gap-x-2">
            <Form.Input
              placeholder="¿Qué estás buscando?"
              variant="white"
              className="bg-transparent"
              containerClassName="hidden lg:block lg:w-auto"
            />
            <button className="hidden sm:flex lg:hidden">
              <IconSearch size="18" />
            </button>
            <button className="w-10 h-10 rounded-full bg-primary-300 text-xs font-bold flex-center">
              {user?.firstName}
            </button>
          </div>
        </div>
      </header>

      {show && <Sidebar closeSidebar={close} />}
    </div>
  )
}
