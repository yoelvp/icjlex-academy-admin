import Button from '@/@common/components/button'
import Link from '@/@common/components/link'

export const UsHero = () => {
  return (
    <div className="flex-center  h-[80vh] w-full object-cover bg-no-repeat bg-cover" style={{ backgroundImage: "url('/us/hero-objective.png')", backgroundPosition: 'cover' }}>
      <div className="flex-center flex-col gap-4">
        <p className="text-[24px] text-primary-50">¡Hola!, nosotros somos</p>
        <span className="w-[40vw] border-t-2 opacity-50"></span>
        <h1 className="font-semibold text-white text-[32px] text-center md:text-[64px]">ICJ LEX & CARRANZA CONSULTORES </h1>
        <span className="w-[40vw] border-t-2 opacity-50"></span>
        <p className="text-[24px] text-primary-50">Y brindamos educación de calidad</p>

        <div className="flex-between pt-16 p-4 gap-4 flex-col md:flex-row">
          <Link href="/teachers" variant="secondary">
            Nuestros docentes
          </Link>
          <Button htmlType="button" variant="secondary">
            Nuestros cursos de actualización
          </Button>
          <Button htmlType="button" variant="secondary">
            Nuestros cursos especializados
          </Button>
        </div>
      </div>    </div>
  )
}
