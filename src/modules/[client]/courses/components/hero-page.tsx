import type { FC } from 'react'

import { RatingCourse } from './rating'
import { ContentFull } from '@/@common/components/content-full'
import { Link } from 'react-router-dom'

export const HeroPage: FC = () => {
  return (
    <ContentFull
      containerClassName="h-auto bg-gradient-to-r from-primary-500 to-primary-400 mb-8 md:mb-0"
      contentClassName="flex flex-col-reverse justify-center items-center gap-y-4 pt-16 pb-16 md:flex-row md:gap-x-32"
    >
      <section className="flex flex-col gap-8">
        <article className="flex gap-2 text-primary-100">
          <Link to="/" className="hover:text-white ease-in-out">
            Derecho
          </Link>
          <span>&gt;</span>
          <Link to="#" className="hover:text-white ease-in-out">
            Derecho Administrativo
          </Link>
        </article>

        <article className="grid gap-2">
          <h1 className="text-white text-2xl font-semibold">Violencia contra Niñas, Niños y Adolescente en el Ámbito Familiar</h1>
          <p className="text-primary-50">El curso tiene como objetivo enseñar a los estudiantes a identificar y  manejar situaciones de violencia familiar que afectan a niñas, niños y  adolescentes.</p>
        </article>

        <article className="flex flex-col gap-y-4">
          <div className="flex flex-col w-full justify-start sm:flex-row sm:gap-x-4 sm:items-center">
            <span className="text-sm font-semibold text-primary-200">INSTRUCTOR</span>
            <div className="flex justify-start items-center gap-x-2">
              <Link to="/teachers/nancy-lozano-diaz" className="text-white underline">Nancy Lozano Diaz</Link>
              <div className="w-auto rounded-lg bg-secondary-500 px-2 text-xs">
                Abogado (a)
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col sm:flex-row sm:gap-x-2">
            <div className="flex items-center gap-x-2">
              <span className="text-secondary-500 font-semibold">
                4.0
              </span>
              <RatingCourse count={5} filled={4} />
            </div>
            <span className="text-primary-100">(120 calificaciones) • 176 alumnos</span>
          </div>
        </article>
      </section>

      <img
        src="/courses/course-detail.png"
        alt="Course Detail"
        sizes="100vw"
        className="rounded object-cover object-center"
      />
    </ContentFull>
  )
}
