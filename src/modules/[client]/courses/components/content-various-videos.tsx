import type { FC } from 'react'
import { Accordion } from './acordeon'

export const ContentVariousVideos: FC = () => {
  const items = [
    {
      title: 'Introducción',
      class: '1 clase',
      time: '4h 20m',
      content: [
        {
          name: 'Introducción a la programación',
          link: 'https://youtube.com',
          time: '4:00 min'
        },
        {
          name: 'Mahine learning',
          link: 'https://youtube.com',
          time: '2:00 min'
        }
      ]
    },
    {
      title: 'Introducción',
      class: '1 clase',
      time: '4h 20m',
      content: [
        {
          name: 'Introducción a la programación',
          link: 'https://youtube.com',
          time: '4:00 min'
        }
      ]
    }
  ]

  return (
    <div className="flex-col-start gap-y-8">
      <div>
        <h4 className="text-primary-700 font-semibold text-2xl">Contenido del curso (Versión para varios videos)</h4>
        <span className="text-primary-400">2 Secciones • 5 clases • 4h 20m de duración </span>
      </div>

      <Accordion data={items} />
    </div>
  )
}
