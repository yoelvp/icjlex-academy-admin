import type { FC } from 'react'

import { IconWhatsapp } from '@/assets/icons'
import { whatsappMessage } from '../utils/whatsapp'
import { WHATSAPP_ADMIN_NUMBER_PHONE } from '../env'
import { createPortal } from 'react-dom'

export const FloatOptions: FC = () => {
  return createPortal(
    <div className="fixed bottom-8 right-8 flex-col-center gap-y-4">
      <a
        href={whatsappMessage({
          phoneNumber: WHATSAPP_ADMIN_NUMBER_PHONE,
          message: '¡Hola! quiero saber más información acerca de los cursos que brinda su academia'
        })}
        className="h-8 w-8 rounded-full bg-primary-500 flex-center text-white hover:bg-primary-400 md:w-12 md:h-12"
      >
        <IconWhatsapp className="text-lg md:text-2xl" />
      </a>
    </div>,
    document.getElementById('options') ?? document.createElement('div')
  )
}
