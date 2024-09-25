import type { FC } from 'react'

export const ContentDescription: FC = () => {
  return (
    <div className="flex flex-col gap-8">
      <h4 className="text-primary-700 font-semibold text-2xl">Descripción</h4>
      <p className="text-primary-700">Acá debe ir contenido HTML que debe ser interpretado y renderizado, por la data que viene de base de dato API</p>
    </div>
  )
}
