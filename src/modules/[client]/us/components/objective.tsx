import type { FC } from 'react'

import { Content } from '@/@common/components/content'
import { IconLogoIonic } from '@/assets/icons'

const Objective: FC = () => {
  return (
    <div className="w-full relative">
      <Content className="py-32 flex gap-8 flex-col lg:flex-row bg-[url('/us/hero-objective.png')] bg-cover rounded-[32px] mb-[118px] px-8" >
        <div className="flex flex-col gap-3 lg:w-6/12 flex-shrink-0">
          <h2 className="text-[32px] text-white font-semibold">Nuestro objetivo</h2>
          <p className="text-[16px] text-primary-50">Estamos comprometidos con la excelencia y la equidad en el campo legal. Por ello, ofrecemos capacitaciones continuas y accesibles en modalidad virtual, con la participación de destacados expertos y profesionales reconocidos. <br /><br />
            Descubre sin fronteras en nuestra plataforma de formación en línea, donde tendrás acceso a cursos especializados, seminarios y diplomados validados por instituciones legales y universidades de prestigio.</p>
        </div>

        <section className="flex-col-center mx-auto max-w-[400px] md:max-w-full md:mx-0 md:flex-row
                lg:flex-col xl:flex-row 2xl:absolute gap-8 2xl:right-0 2xl:mr-[5vw] 2xl:bottom-40">
          <div className="w-full 2xl:w-auto  p-8 rounded-[16px] border-[#B8C6CD] border-[2px] bg-[#B8C6CD] flex-col-start gap-4 opacity-60">
            <IconLogoIonic size={32} className="text-primary-500 h-full" />
            <strong className="text-primary-500 text-[24px] font-semibold text-wrap whitespace-nowrap">Educación de calidad</strong>
          </div>
          <div className="w-full 2xl:w-auto  p-8 rounded-[16px] border-[#B8C6CD] border-[2px] bg-[#B8C6CD] flex-col-start gap-4 opacity-60">
            <IconLogoIonic size={32} className="text-primary-500" />
            <strong className="text-primary-500 text-[24px] font-semibold">Mejora la empleabilidad</strong>
          </div>
        </section>
      </Content>
    </div>
  )
}

export default Objective
