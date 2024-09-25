import type { Page } from '@/@common/types/Page'

import { IoChevronDown } from 'react-icons/io5'

export const PAGES: Page[] = [
  {
    label: 'Nosotros',
    href: '/us'
  },
  {
    label: 'Cursos',
    href: '/courses',
    withIcon: true,
    icon: IoChevronDown,
    subPages: [
      {
        label: 'Cursos especializados',
        href: '/courses?q=specialized-courses'
      },
      {
        label: 'Cursos de actualización',
        href: '/courses?q=update-courses'
      }
    ]
  },
  {
    label: 'Docentes',
    href: '/teachers'
  }
]
