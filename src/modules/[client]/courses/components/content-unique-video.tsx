import type { FC } from 'react'

import { IconPlay } from '@/assets/icons'
import { Link } from 'react-router-dom'

export const ContentUniqueVideo: FC = () => {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h4 className="text-primary-700 font-semibold text-2xl">Contenido del curso (Sección para video único)</h4>
        <span className="text-primary-400">Clase única • 4h 20m de duración </span>
      </div>
      <div className="text-primary-500 flex gap-2 items-center justify-between bg-primary-50 p-4 rounded-sm">
        <div className="text-wrap flex items-center overflow-hidden whitespace-nowrap gap-2">
          <IconPlay size={24} className="text-primary-400" />
          <Link to="/" className="text-primary-500 hover:text-primary-300">Introducción a los sitemas bla bla</Link>
        </div>
        <span className="text-primary-300">4:00 min</span>
      </div>

    </div>
  )
}
