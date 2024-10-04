import type { FC, ReactNode } from 'react'
import type { ModalVariant } from '@/@common/types/Modal'

import { createPortal } from 'react-dom'
import { IconClose } from '@/assets/icons'
import { twVariants } from '@/@common/utils/tailwindcss'
import { modalVariants } from '@/@common/constants/modal-variants'

interface Props extends ModalVariant {
  isOpen?: boolean
  onClose?: () => void
  title?: string
  description?: string
  children: ReactNode
}

export const Modal: FC<Props> = ({
  title,
  description,
  isOpen,
  onClose,
  variant,
  size,
  children
}) => {
  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 flex items-end justify-center z-50 bg-black/50 sm:items-center">
      <div
        className={twVariants(modalVariants({
          variant,
          size,
          className: 'h-auto'
        }))}
      >
        <div className="px-6 py-4 border-b border-primary-600/20 flex justify-between items-center">
          <div>
            {Boolean(title) && (
              <h3 className="text-primary-500 text-2xl font-semibold">
                {title}
              </h3>
            )}
            {Boolean(description) && (
              <p className="text-primary-400 text-sm">
                {description}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="rounded-sm border border-primary-300 w-8 h-8 flex-center hover:border-primary-500 hover:bg-primary-50 duration-200 ease-in-out focus:ring focus:bg-primary-50 focus:ring-primary-500/25"
            aria-label={`${isOpen ? 'Cerrar' : 'Abrir'} modal`}
          >
            <IconClose size={24} />
          </button>
        </div>
        <div className="w-full overflow-scroll max-h-[calc(100vh-150px)] lg:max-h-[60vh]">
          <div className="mx-4 py-2">
            {children}
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('modal') ?? document.createElement('div')
  )
}
