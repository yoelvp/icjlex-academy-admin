import type { FC } from 'react'
import { SectionHeader } from '@/@common/components/section-header'
import { Content } from '@/@common/components/content'
import {
  IconStar,
  /* IconArrowRoundForward, */
  /* IconArrowRoundBack, */
  IconStarFilled
} from '@/assets/icons'

export const StudentComments: FC = () => {
  return (
    <Content className="flex-col-center gap-y-8 xl:px-64">
      <SectionHeader
        title="Lo que dicen nuestros estudiantes"
        description="Nuestros clientes nos envían muchas sonrisas en nuestros cursos y nos encantan."
      />
      <div className="flex-col-center gap-y-4">
        <div className="bg-primary-50 border-2 border-primary-200 w-32 h-32 rounded-full flex-center">
          <span className="text-2xl text-primary-500 font-semibold">
            VC
          </span>
        </div>
        <strong className="text-primary-500 text-lg font-semibold">
          Valdir Contreras
        </strong>
      </div>

      <div className="w-full flex-center max-w-[720px]">
        {/* <div className="relative"> */}
        {/*   <button className="relative z-[10] flex-center"> */}
        {/*     <IconArrowRoundBack size="48" className="text-primary-500" /> */}
        {/*   </button> */}
        {/*   <div className="absolute top-1/2 -translate-y-1/2 -left-2 w-8 h-8 rounded-full bg-secondary-500" /> */}
        {/* </div> */}

        <div className="flex-center gap-x-2">
          <IconStarFilled className="text-gold text-xl md:text-2xl" />
          <IconStarFilled className="text-gold text-xl md:text-2xl" />
          <IconStarFilled className="text-gold text-xl md:text-2xl" />
          <IconStarFilled className="text-gold text-xl md:text-2xl" />
          <IconStar className="text-gold text-xl md:text-2xl" />
        </div>

        {/* <div className="relative"> */}
        {/*   <button className="relative z-10 flex-center"> */}
        {/*     <IconArrowRoundForward size="48" className="text-primary-500" /> */}
        {/*   </button> */}
        {/*   <div className="absolute top-1/2 -translate-y-1/2 -right-2 w-8 h-8 rounded-full bg-secondary-500" /> */}
        {/* </div> */}
      </div>

      <div className="max-w-[480px] mx-auto">
        <p>
          ¡Estoy muy emocionado por comenzar mi aprendizaje en esta academia! He estado buscando un lugar donde realmente pueda profundizar en los temas que me apasionan, y los cursos aquí parecen ser justo lo que necesito. No puedo esperar a sumergirme en el material, aprender de expertos y llevar mis habilidades al siguiente nivel. ¡Es genial saber que cuento con una comunidad y mentores que me guiarán en este camino! 🔥💪
        </p>
      </div>

      {/* <div> */}
      {/*   1 2 3 4 5 6 */}
      {/* </div> */}
    </Content>
  )
}
