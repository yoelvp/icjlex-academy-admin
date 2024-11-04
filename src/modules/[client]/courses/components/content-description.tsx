import { RenderHTML } from '@/@common/components'

interface Props {
  description: string
}

export const ContentDescription = ({ description }: Props) => {
  return (
    <div className="flex flex-col gap-8">
      <h4 className="text-primary-700 font-semibold text-2xl">Descripción</h4>
      {description ? (
        <RenderHTML content={description} />
      ) : (
        <p className="text-primary-700">
          No se ha proporcionado una descripción para este curso.
        </p>
      )}
    </div>
  )
}
