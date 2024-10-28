import { useTokenStore } from '@/@auth/store/use-token.store'
import { useUserStore } from '@/@auth/store/use-user.store'
import { ContentFull } from '@/@common/components/content-full'
import Link from '@/@common/components/link'
import { IconArrowRoundForward } from '@/assets/icons'

export const Masthead = () => {
  const user = useUserStore((state) => state.user)
  const token = useTokenStore((state) => state.token)

  return (
    <div className="relative">
      <ContentFull
        backgroundImage="/background.svg"
        containerClassName="h-[70vh] sm:h-[75vh]"
        contentClassName="flex justify-center itcem-center h-full"
      >
        <section className="flex flex-col gap-y-8 items-center justify-start py-16">
          <article className="flex flex-col gap-y-2">
            <h3 className="text-2xl font-bold text-white text-center sm:text-3xl lg:text-5xl">
              Impulsa tu <span className="text-secondary-500">futuro</span> con nuestros cursos en línea de alta calidad<span className="text-secondary-500">.</span>
            </h3>
            <p className="text-white text-center">
              ICJ LEX &amp; CARRANZA CONSULTORES es tu aliado en el aprendizaje en línea, ofreciendo cursos de calidad, certificados reconocidos y flexibilidad total.
            </p>
          </article>
          <div className="flex flex-col gap-y-4 gap-x-4 sm:flex-row">
            <Link href="/teachers" variant="secondary" size="lg">
              Nuestros docentes
            </Link>
            {user && token ? (
              <Link href="/courses" variant="secondary" size="lg">
                Nuestros cursos
                <IconArrowRoundForward size="24" />
              </Link>
            ): (
              <Link href="/auth/login" variant="secondary" size="lg">
                Iniciar ahora
                <IconArrowRoundForward size="24" />
              </Link>
            )}
          </div>
        </section>

      </ContentFull>
      <div className="width-md h-[420px] absolute left-1/2 top-[50vh] -translate-x-1/2 sm:top-[40vh] sm:h-[580px] md:top-[40vh] md:h-[640px]">
        <div className="relative h-full">
          <img
            src="/masthead.png"
            alt="masthead image"
            className="w-full h-full object-cover object-center rounded border-2 border-white"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-primary-500/30 rounded" />
        </div>
      </div>
    </div>
  )
}
