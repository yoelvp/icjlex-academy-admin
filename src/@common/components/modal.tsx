import { useEffect, type FC, type MouseEvent, type ReactNode } from "react"
import type { ModalVariant } from "@/@common/types/Modal"

import { createPortal } from "react-dom"
import { IconClose } from "@/assets/icons"
import { twVariants } from "@/@common/utils/tailwindcss"
import { modalVariants } from "@/@common/constants/modal-variants"

interface Props extends ModalVariant {
  isOpen?: boolean
  onClose?: (event: MouseEvent<HTMLButtonElement>) => void
  title?: string
  description?: string
  children: ReactNode
  className?: string
}

export const Modal: FC<Props> = ({
  title,
  description,
  isOpen,
  onClose,
  variant,
  size,
  className = "",
  children
}) => {

  useEffect(() => {
    const toggleModalListenerKeys = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        console.log("Close")
      }
    }

    window.addEventListener("keypress", toggleModalListenerKeys)

    return () => window.removeEventListener("keypress", toggleModalListenerKeys)
  }, [])

  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 flex items-end justify-center z-50 bg-black/50 sm:items-center">
      <div
        className={twVariants(
          modalVariants({
            variant,
            size,
            className: `h-fit grid grid-rows-[auto_1fr] max-h-[calc(100vh-150px)] lg:max-h-[60vh] ${className}`
          })
        )}
      >
        <div className="px-6 h-14 border-b border-primary-600/20 flex justify-between items-center">
          <div>
            {Boolean(title) && (
              <h3 className="text-primary-500 text-xl font-semibold">
                {title}
              </h3>
            )}
            {Boolean(description) && (
              <p className="text-primary-400 text-sm">{description}</p>
            )}
          </div>
          <button
            className="rounded-sm border border-primary-300 w-8 h-8 flex-center hover:border-primary-500 hover:bg-primary-50 duration-200 ease-in-out focus:ring focus:bg-primary-50 focus:ring-primary-500/25"
            aria-label={`${isOpen ? "Cerrar" : "Abrir"} modal`}
            onClick={(event) => {
              event.stopPropagation()
              onClose?.(event)
            }}
          >
            <IconClose size={24} />
          </button>
        </div>
        <div className="w-full overflow-y-scroll h-full">
          <div className="mx-4 pt-2 pb-4 h-full">{children}</div>
        </div>
      </div>
    </div>,
    document.getElementById("modal") ?? document.createElement("div")
  )
}
