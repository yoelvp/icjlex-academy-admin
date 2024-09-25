import Button from './button'
import { Card } from './card'
import { IconStarFilled, IconWhatsapp } from '@/assets/icons'

export const CourseCard = () => {
  return (
    <Card>
      <div className="relative h-64 rounded overflow-hidden">
        <img
          src="https://teoriadelderecho.com/wp-content/uploads/2017/12/USMP-anuncia-curso-gratuito-en-derechos-humanos-dirigido-a-estudiantes.jpg"
          alt="Course image"
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="py-4 px-2 flex flex-col gap-y-8 pb-4">
        <article className="flex flex-col gap-y-2">
          <div>
            <h4 className="text-primary-700 font-bold">
              Violencia contra Niñas, Niños y Adolescente en el Ámbito Familiar
            </h4>
            <p className="text-sm text-primary-500">
              <span className="text-primary-400">{'Nancy Lozano Díaz'}</span> &bull; <span className="text-primary-300">{'Abogada'}</span>
            </p>
          </div>
          <div className="flex justify-start items-center gap-x-2">
            <span className="text-primary-500 font-semibold">{'4,5'}</span>
            <div className="flex-center gap-x-1">
              <IconStarFilled className="text-gold" />
              <IconStarFilled className="text-gold" />
              <IconStarFilled className="text-gold" />
              <IconStarFilled className="text-gold" />
              <IconStarFilled className="text-gold" />
            </div>
            <span className="text-primary-400 font-semibold">{'(120 valoraciones)'}</span>
          </div>
          <div className="flex items-center gap-x-1 text-primary-500">
            <span className="text-primary-400">
              2.5 horas
            </span>
            &bull;
            <span className="text-primary-400">
              1 clase
            </span>
          </div>
          <div className="flex items-center gap-x-1">
            <span className="font-bold text-primary-500 text-2xl">
              S/. 140.00
            </span>
            <span className="hidden text-primary-300 text-sm font-medium">
              S/. 160.00
            </span>
          </div>
        </article>
        <div className="flex gap-x-4">
          <Button.NextLink href="/courses/primer-curso" variant="primary.link" size="sm" className="text-nowrap w-auto !px:0">
            Ver detalles
          </Button.NextLink>
          <Button.Link href="/whatsapp" size="sm" className="w-full">
            Inscribirme
            <IconWhatsapp size="18" />
          </Button.Link>
        </div>
      </div>
    </Card>
  )
}
