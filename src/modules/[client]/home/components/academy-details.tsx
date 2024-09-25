import { ContentFull } from '@/@common/components/content-full'
import Button from '@/@common/components/button'
import { IconWhatsapp } from '@/assets/icons'
import { whatsappMessage } from '@/@common/utils/whatsapp'

export const AcademyDetails = () => {
  return (
    <ContentFull
      backgroundColorClassName="bg-primary-50 overflow-hidden"
      contentClassName="py-32 grid grid-cols-1 items-center justify-center gap-x-32 gap-y-32 xl:grid-cols-2"
    >
      <div className="flex flex-col gap-y-8 row-start-2 xl:row-start-auto">
        <article className="flex flex-col gap-y-2">
          <h2 className="text-primary-700 text-4xl font-bold xl:text-6xl">
            Impulsa tu carrera con nuestros cursos
          </h2>
          <p className="text-primary-400">
            Nuestros  expertos docentes te brindarán las herramientas y conocimientos  necesarios para destacar en el campo del derecho. Desde fundamentos  legales hasta estrategias avanzadas, nuestros cursos te prepararán para  enfrentar los desafíos de la profesión.
          </p>
        </article>
        <div className="flex flex-col gap-y-4 gap-x-4 sm:flex-row">
          <Button.Link
            href={whatsappMessage({ message: 'Estoy%interesado%en%estudiar%en%ICJ%LEX%&%CARRANZA%CONSULTORIA' })}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary.outline"
            size="lg"
          >
            Habla con un asesor
            <IconWhatsapp size="16" />
          </Button.Link>
          <Button.NextLink href="/courses" size="lg">
            Ver todos los cursos
          </Button.NextLink>
        </div>
      </div>

      <div className="relative w-full mx-auto sm:w-[80%] md:w-[60%] xl:w-full">
        <img
          src="/studying.png"
          alt="Studying"
          loading="lazy"
          className="w-full relative rounded-[3rem] border-4 z-10 border-white"
        />

        <img
          src="/circle.svg"
          alt="circle"
          className="w-48 h-48 absolute -top-12 -right-12 z-0"
        />

        <div className="absolute bottom-24 -left-16 z-20 bg-white rounded overflow-hidden p-1">
          <div className="bg-primary-400 py-2 pl-10 pr-4 rounded flex flex-col justify-center sm:pr-4 sm:pl-4">
            <strong className="text-secondary-500 text-6xl font-bold">
              +15
            </strong>
            <span className="text-secondary-300 text-center">
              Docentes
            </span>
          </div>
        </div>

        <div className="absolute -bottom-12 left-40 z-20 bg-white rounded overflow-hidden p-1">
          <div className="bg-primary-400 py-2 px-8 rounded flex flex-col justify-center">
            <strong className="text-secondary-500 text-6xl font-bold">
              +9
            </strong>
            <span className="text-secondary-300 text-center">
              Cursos
            </span>
          </div>
        </div>
      </div>
    </ContentFull>
  )
}
