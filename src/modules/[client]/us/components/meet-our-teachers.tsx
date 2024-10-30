import Link from '@/@common/components/link'

import { IconArrowRoundForward } from '@/assets/icons'

export const MeetOurTeachers = () => {
  return (
    <div className="grid gap-4 text-center  pt-32">
      <h3 className="text-primary-500 font-semibold text-[24px] md:text-[48px]">
        Nuestro Cuerpo Docente
      </h3>
      <span className="text-primary-500">
        Un equipo de educadores comprometidos con la excelencia académica y la
        formación de futuras generaciones. Nuestros docentes son profesionales
        con amplia experiencia en su campo, dedicados a impartir conocimientos
        prácticos y actualizados, brindando una educación de calidad.
      </span>
      <Link href="/teachers" variant="primary.link" size={'md'} className="mx-auto">
        Ver todos los docentes
        <IconArrowRoundForward size="24" />
      </Link>
    </div>
  )
}
