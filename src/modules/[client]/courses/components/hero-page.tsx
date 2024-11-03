import { RenderHTML } from '@/@common/components'
import { RatingCourse } from './rating'
import { ContentFull } from '@/@common/components/content-full'
import { Link } from 'react-router-dom'

export const HeroPage = ({ course }) => {
  return (
    <ContentFull
      containerClassName="h-auto bg-gradient-to-r from-primary-500 to-primary-400 mb-8 md:mb-0"
      contentClassName="flex-between flex-col-reverse gap-y-4 pt-16 pb-16 md:flex-row md:gap-x-32"
    >
      <section className="flex w-full sm:w-6/12  flex-col gap-8">
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
          <h1 className="text-white text-2xl font-semibold">{course?.name}</h1>
          <div className="text-primary-50">
            {course?.objective ? (
              <RenderHTML content={course?.objective} />
            ) : (
              <p>No se ha proporcionado un objetivo para este curso.</p>
            )}
          </div>
        </article>

        <article className="flex flex-col gap-y-4">
          <div className="flex flex-col w-full justify-start sm:flex-row sm:gap-x-4 sm:items-center">
            <span className="text-sm font-semibold text-primary-200">
              INSTRUCTOR
            </span>
            <div className="flex justify-start items-center gap-x-2">
              <Link
                to="/teachers/nancy-lozano-diaz"
                className="text-white underline"
              >
                {course?.teacher.firstName} {course?.teacher.lastName}
              </Link>
              <div className="w-auto rounded-lg bg-secondary-500 px-2 text-xs">
                {course?.teacher.profession}
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col sm:flex-row sm:gap-x-2">
            <div className="flex items-center gap-x-2">
              <span className="text-secondary-500 font-semibold">4.0</span>
              <RatingCourse count={5} filled={4} />
            </div>
            <span className="text-primary-100">
              (120 calificaciones) • 176 alumnos
            </span>
          </div>
        </article>
      </section>

      <div className="w-full sm:w-6/12 h-80">
        <img
          src={
            course?.imageUrl ||
            'https://cdn.pixabay.com/photo/2020/12/05/14/08/man-5806011_1280.jpg'
          }
          alt={course?.name}
          className="rounded object-cover object-center w-full h-full"
        />
      </div>
    </ContentFull>
  )
}
