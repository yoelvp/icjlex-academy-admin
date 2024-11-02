import type { IconType } from 'react-icons'

import { FC, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Drawer as DrawerFlowbite } from 'flowbite-react'
import classNames from 'classnames'

interface Props {
  title: string
  show: boolean
  onClose: () => void
  children: ReactNode
  titleIcon?: IconType
  contentClassName?: string
}

export const Drawer: FC<Props> = ({
  title,
  onClose,
  show,
  titleIcon,
  contentClassName,
  children
}) => {
  return createPortal(
    <DrawerFlowbite
      onClose={onClose}
      open={show}
      title={title}
      position="right"
      theme={{
        root: {
          backdrop: 'fixed inset-0 z-50 bg-gray-900/50',
          base: 'fixed z-100 overflow-y-auto bg-white p-4 transition-transform'
        }
      }}
      className={classNames(
        'w-full sm:w-[440px] md:w-[480px]',
        contentClassName
      )}
    >
      <DrawerFlowbite.Header title={title} titleIcon={titleIcon} />

      <DrawerFlowbite.Items>
        <div className="h-full">
          {children}
        </div>
      </DrawerFlowbite.Items>
    </DrawerFlowbite>,
    document.getElementById('drawers') ?? document.createElement('div')
  )
}
