import Button from '@/@common/components/button'

import { IconArrowRoundForward } from '@/assets/icons'

export const MeetOurTeachers = () => {
  return (
    <div className="grid gap-4 text-center mb-8">
      <h3 className="text-primary-500 font-semibold text-[24px] md:text-[48px]">Conoce a nuestros docentes</h3>
      <span className="text-primary-500">Conoce a los expertos que guiarán tu aprendizaje. Cada uno de nuestros docentes es un líder en su campo, comprometido con ofrecerte una educación de calidad y ayudarte a alcanzar tus metas.</span>
      <Button.Link href="#" variant="primary.link" size={'md'} className="mx-auto">
        Ver todos los docentes
        <IconArrowRoundForward size="24" />
      </Button.Link>
    </div>
  )
}
