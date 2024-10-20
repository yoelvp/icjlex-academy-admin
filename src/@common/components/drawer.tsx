import { FC, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import Button from './button'
import { IconClose } from '@/assets/icons'

interface Props {
  title: string
  description?: string
  onClose: () => void
  children: ReactNode
}

export const Drawer: FC<Props> = ({
  title,
  description,
  onClose,
  children
}) => {
  return createPortal(
    <div
      onClick={onClose}
      className="fixed left-0 top-0 z-50 w-full h-screen bg-primary-500/20 flex justify-end"
    >
      <section
        onClick={(event) => event.stopPropagation()}
        className="w-[24rem] h-full bg-white"
      >
        <header className="flex-between gap-x-4 px-4 h-16 border-b border-b-gray-200">
          <article>
            <h4 className="text-xl font-bold text-primary-700 leading-[100%]">
              {title}
            </h4>
            {description && (
              <span className="text-sm text-primary-400">{description}</span>
            )}
          </article>
          <Button.Icon
            size="xs"
            onClick={onClose}
            variant="primary.outline"
            className="!rounded-sm"
          >
            <IconClose size="24" />
          </Button.Icon>
        </header>
        <div className="h-full p-4">
          <div>
            {children}
          </div>
        </div>
      </section>
    </div>,
    document.getElementById('drawers') ?? document.createElement('div')
  )
}
