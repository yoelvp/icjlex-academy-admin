import type { FC } from 'react'

import Button from '@/@common/components/button'
/* import { RatingCourse } from './rating' */
import Form from '@/@common/components/form'

export const CoursesValorations: FC = () => {
  return (
    <section className="flex-col-start gap-y-8">
      <div className="flex-col-start gap-y-6">
        {/* <div className="flex gap-2"> */}
        {/*   <RatingCourse count={1} filled={1} /> */}
        {/*   <span className="text-primary-400 font-semibold">4.0 valoraciones del curso</span> */}
        {/*   <span className="text-primary-400 font-semibold">129 valoraciones</span> */}
        {/* </div> */}

        <div className="w-full flex items-center gap-x-4">
          <span className="bg-primary-200 text-white h-[40px] w-[40px] rounded-full flex justify-center items-center flex-shrink-0">
            YV
          </span>
          <div className="relative w-full">
            <Form.Input placeholder="Ingresa un comentario" size="lg" className="w-full" />
            <Button className="absolute right-2 top-1/2 -translate-y-1/2" size="sm">
              Publicar
            </Button>
          </div>
        </div>

        <section className="flex flex-col gap-4 w-full">
          {[1].map((_, index) => (
            <div key={index} className="flex gap-x-4">
              <span className="bg-primary-500 text-primary-50 text-sm h-8 w-8 rounded-full flex justify-center items-center flex-shrink-0">
                YV
              </span>
              <div className="flex flex-col gap-y-1">
                <div className="space-x-2">
                  <span className="text-primary-500">Yoel Valverde Polo</span>
                  <span className="text-primary-300 text-sm">Hace dos horas</span>
                </div>
                <p className="text-primary-400 break-words w-full">
                  Conceptos bien explicados y los ejercicios sirven  para mejorar el comprendimiento de las funciones o comando utilizados.
                </p>
              </div>
            </div>
          ))}
        </section>
      </div>

      <div className="w-full flex-center">
        <Button variant="primary.link">
          Mostrar todas las reseñas
        </Button>
      </div>
    </section>
  )
}
