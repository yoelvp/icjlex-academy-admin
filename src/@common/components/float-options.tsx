import type { FC } from 'react'

import { WHATSAPP_LINK } from '@/config'
import { IconWhatsapp } from '@/assets/icons'

export const FloatOptions: FC = () => {
  return (
    <div className="fixed bottom-8 right-8 flex-col-center gap-y-4">
      <a href={`${WHATSAPP_LINK}?text=Hola`} className="h-8 w-8 rounded-full bg-primary-500 flex-center text-white hover:bg-primary-400 md:w-12 md:h-12">
        <IconWhatsapp className="text-lg md:text-2xl" />
      </a>
    </div>
  )
}
