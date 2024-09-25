import type { FC } from 'react'

import {Link} from 'react-router-dom'
import { SectionTitle } from './section-title'
import { PAGES } from '@/@common/utils/pages'
import { APP_NAME } from '@/config'
import { IconPhone, IconLocation, IconWhatsapp } from '@/assets/icons'
import { SocialNetwork } from '../social-network'

export const Footer: FC = () => {
  const date = new Date()

  return (
    <footer className="w-full bg-primary-500 text-white flex-col-start gap-y-8 rounded-tl-lg rounded-tr-lg pt-24 pb-4 px-8 -mt-8 relative z-10">
      <div className="w-full flex flex-col justify-between gap-y-16 sm:flex-row">
        <article className="flex flex-col gap-y-4">
          <Link to="/">
            <img
              src="/logo-white.svg"
              className="h-16 w-auto sm:h-20 md:h-16 xl:h-24"
              alt="logo"
            />
          </Link>
          <div className="flex flex-col gap-y-1">
            <div className="flex-start gap-x-2">
              <IconLocation className="text-xl" />
              <span>Pasaje César Vallejo 133</span>
            </div>
            <div className="flex-start gap-x-2">
              <IconPhone className="text-xl" />
              <span>+51  941 036 553</span>
            </div>
          </div>
        </article>

        <section className="flex flex-col gap-y-8 lg:flex-row lg:gap-x-16">
          <div className="flex-col-start gap-y-2">
            <SectionTitle>
              COMUNIDAD
            </SectionTitle>

            <nav className="flex flex-col gap-y-0.5">
              {PAGES.map((page) => (
                <Link key={page.href} to={page.href} className="transition-colors hover:underline hover:text-primary-100">
                  {page.label}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <SectionTitle>
              CURSOS
            </SectionTitle>
          </div>
          <div>
            <SectionTitle>
              DIPLOMADOS
            </SectionTitle>
          </div>
          <div className="flex flex-col gap-y-8">
            <div>
              <SectionTitle>
                LEGAL
              </SectionTitle>
              <nav className="flex flex-col gap-y-0.5">
                <Link to="/" className="hover:underline">
                  Políticas de privacidad
                </Link>
                <Link to="/" className="hover:underline">
                  Términos y condiciones
                </Link>
                <Link to="/" className="hover:underline">
                  Libro de reclamaciones
                </Link>
              </nav>
            </div>
            <div>
              <SectionTitle>
                AYUDA
              </SectionTitle>
              <nav className="flex flex-col gap-y-0.5">
                <a href="https://wa.me/51942208501?text=Estoy%interesado%en%estudiar%en%ICJ%LEX%&%CARRANZA%CONSULTORIA" className="flex-start gap-x-2 hover:underline">
                  <IconWhatsapp />
                  Contacto
                </a>
              </nav>
            </div>
          </div>
        </section>
      </div>

      <div className="w-full flex justify-end items-center">
        <SocialNetwork />
      </div>

      <hr className="sep-h bg-primary-400" />

      <div className="flex justify-start items-center gap-x-2 text-primary-100">
        <img
          src="/isotipo-white.svg"
          alt="isotipo"
          className="w-8 h-8"
        />

        <span>
          &copy; {date.getFullYear()} {APP_NAME}. Todos los derechos reservados.
        </span>
      </div>
    </footer>
  )
}
