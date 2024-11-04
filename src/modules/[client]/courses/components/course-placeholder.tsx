import ContentLoader from 'react-content-loader'
import { ContentFull } from '@/@common/components/content-full'
import { Content } from '@/@common/components'

export const CoursePlaceholder = () => {
  return (
    <div>
      <ContentFull
        containerClassName="h-auto bg-gradient-to-r from-primary-500 to-primary-400 mb-8 md:mb-0"
        contentClassName="flex-between flex-col-reverse gap-y-4 pt-16 pb-16 md:flex-row md:gap-x-32"
      >
        <section className="flex w-full sm:w-6/12 flex-col">
          <ContentLoader width="100%" height="100">
            <rect y="0" rx="8" width="80%" height="24" />
            <rect y="32" rx="4" width="100%" height="14" />
            <rect y="54" rx="4" width="100%" height="14" />
          </ContentLoader>
          <ContentLoader width="100%" height="20">
            <rect width="15%" height="16" />
            <rect x="18%" width="25%" height="16" />
            <rect x="45%" y="2" width="140" height="12" />
          </ContentLoader>
        </section>

        <div className="w-full sm:w-6/12 h-80">
          <ContentLoader width="100%" height="100%">
            <rect rx="8" ry="8" width="100%" height="100%" />
          </ContentLoader>
        </div>
      </ContentFull>

      <Content className="flex flex-col items-start mt-16 mb-24 gap-y-16 md:mt-32 md:mb-40 xl:gap-x-32 lg:gap-x-16 lg:flex-row-reverse">
        <section className="w-full h-auto py-8 px-4 rounded border border-primary-400 flex flex-col gap-8 md:border-none lg:shadow--primary lg:max-w-[300px] xl:min-w-[360px]">
          <div className="hidden lg:block">
            <ContentLoader width="100%" height="32" className="mb-4">
              <rect rx="8" ry="8" width="60%" height="32" />
            </ContentLoader>

            <ContentLoader width="100%" height="40">
              <rect rx="16" ry="16" width="100%" height="40" />
            </ContentLoader>
          </div>

          <div className="flex flex-col gap-4 w-full">
            <span className="text-primary-700 font-semibold">
              El curso incluye:
            </span>

            <ContentLoader width="100%" height="100">
              <rect y="0" rx="4" width="100%" height="16" />
              <rect y="24" rx="4" width="100%" height="16" />
              <rect y="48" rx="4" width="100%" height="16" />
            </ContentLoader>
          </div>
        </section>

        <div className="w-full flex flex-col gap-y-16">
          <div className="w-full flex flex-col gap-8">
            <h2 className="text-primary-700 font-semibold text-2xl">
              Lo que aprenderás
            </h2>

            <ContentLoader width="100%" height="100">
              <rect y="0" rx="4" width="60%" height="16" />
              <rect y="24" rx="4" width="60%" height="16" />
              <rect y="48" rx="4" width="60%" height="16" />
            </ContentLoader>
          </div>

          <div className="flex-col-start gap-y-8">
            <h4 className="text-primary-700 font-semibold text-2xl">Contenido del curso</h4>

            <ContentLoader width="100%" height="120">
              <rect y="0" rx="4" width="100%" height="32" />
              <rect y="42" rx="4" width="100%" height="32" />
              <rect y="84" rx="4" width="100%" height="32" />
            </ContentLoader>
          </div>

          <div className="flex flex-col gap-8">
            <h4 className="text-primary-700 font-semibold text-2xl">Descripción</h4>
            <ContentLoader width="100%" height="100">
              <rect y="0" rx="4" width="100%" height="16" />
              <rect y="24" rx="4" width="100%" height="16" />
              <rect y="48" rx="4" width="100%" height="16" />
            </ContentLoader>
          </div>

          <div className="grid gap-4">
            <h4 className="text-primary-700 font-bold text-2xl">Más cursos</h4>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <ContentLoader width="100%" height="340">
                <rect y="0" rx="4" width="100%" height="180" />
                <rect y="190" rx="4" width="100%" height="22" />
                <rect y="218" rx="4" width="100%" height="16" />
                <rect y="250" rx="4" width="40%" height="28" />
                <rect y="300" rx="4" width="45%" height="32" />
                <rect y="300" x="50%" rx="4" width="45%" height="32" />
              </ContentLoader>
              <ContentLoader width="100%" height="340">
                <rect y="0" rx="4" width="100%" height="180" />
                <rect y="190" rx="4" width="100%" height="22" />
                <rect y="218" rx="4" width="100%" height="16" />
                <rect y="250" rx="4" width="40%" height="28" />
                <rect y="300" rx="4" width="45%" height="32" />
                <rect y="300" x="50%" rx="4" width="45%" height="32" />
              </ContentLoader>
            </div>
          </div>
        </div>
      </Content>
    </div>
  )
}
