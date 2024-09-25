import type { FC } from 'react'
import { SectionHeader } from '@/@common/components/section-header'
import { Content } from '@/@common/components/content'
import { IconStar, IconArrowRoundForward, IconArrowRoundBack } from '@/assets/icons'

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
            YV
          </span>
        </div>
        <strong className="text-primary-500 text-lg font-semibold">
          Yoel Valverde
        </strong>
      </div>

      <div className="w-full flex-between max-w-[720px]">
        <div className="relative">
          <button className="relative z-[10] flex-center">
            <IconArrowRoundBack size="48" className="text-primary-500" />
          </button>
          <div className="absolute top-1/2 -translate-y-1/2 -left-2 w-8 h-8 rounded-full bg-secondary-500" />
        </div>

        <div className="flex-center gap-x-2">
          <IconStar className="text-gold text-xl md:text-2xl" />
          <IconStar className="text-gold text-xl md:text-2xl" />
          <IconStar className="text-gold text-xl md:text-2xl" />
          <IconStar className="text-gold text-xl md:text-2xl" />
          <IconStar className="text-gold text-xl md:text-2xl" />
        </div>

        <div className="relative">
          <button className="relative z-10 flex-center">
            <IconArrowRoundForward size="48" className="text-primary-500" />
          </button>
          <div className="absolute top-1/2 -translate-y-1/2 -right-2 w-8 h-8 rounded-full bg-secondary-500" />
        </div>
      </div>

      <div className="max-w-[480px] mx-auto">
        <p>
          El curso es excelente, aprendí demasiado con su contenido y los profesores saben del tema, lo mejor es que saben como llegar al alumno y que aprenda de manera efectiva y eficaz.
        </p>
      </div>

      <div>
        1 2 3 4 5 6
      </div>
    </Content>
  )
}
