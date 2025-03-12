import type { FC } from "react"
import type { ModalVariant } from "@/@common/types/Modal"

import { createPortal } from "react-dom"
import { twVariants } from "@/@common/utils/tailwindcss"
import { modalVariants } from "@/@common/constants/modal-variants"
import { Skeleton } from "./skeleton"

interface Props extends ModalVariant {
  className?: string
}

export const LoadingModal: FC<Props> = ({
  variant,
  size,
  className = ""
}) => {
  return createPortal(
    <div className="fixed inset-0 flex items-end justify-center z-50 bg-black/50 sm:items-center">
      <div
        className={twVariants(
          modalVariants({
            variant,
            size,
            className: `h-64 ${className}`
          })
        )}
      >
        <div className="px-6 h-14 border-b border-primary-600/20 flex flex-col justify-center gap-y-2">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-3 max-w-64" />
        </div>
        <div className="w-full overflow-y-scroll h-full">
          <div className="mx-4 py-4 flex flex-col gap-y-8">
            <div className="flex flex-col gap-y-2">
              <Skeleton className="h-6 max-w-80" />
              <Skeleton className="h-4 !max-w-32" />
            </div>
            <div className="flex flex-col gap-y-2">
              <Skeleton className="h-6 max-w-80" />
              <Skeleton className="h-4 !max-w-32" />
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("loading-modal") ?? document.createElement("div")
  )
}
