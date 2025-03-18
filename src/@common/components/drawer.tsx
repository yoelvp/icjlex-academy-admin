import type { IconType } from "react-icons"

import { FC, useEffect, type ReactNode } from "react"
import { createPortal } from "react-dom"
import classNames from "classnames"
import { IconClose, IconHome } from "@/assets/icons"

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
  titleIcon: TitleIcon,
  contentClassName,
  children
}) => {
  useEffect(() => {
    const handleKeys = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keypress", handleKeys)

    return () => document.removeEventListener("keypress", handleKeys)
  }, [])

  if (!show) return null

  return createPortal(
    <div
      className={classNames(
        "w-full h-screen bg-black/20 flex justify-end",
        "fixed inset-0 z-50"
      )}
      onClick={onClose}
    >
      <section
        className={classNames(
          "bg-white h-full w-md py-2 px-4 space-y-8",
          "sm:w-[440px] md:w-[480px]",
          contentClassName
        )}
        onClick={(event) => {
          event.stopPropagation()
        }}
      >
        <header className="w-full flex items-center justify-between gap-x-4">
          <div className="flex gap-x-2 items-center">
            {TitleIcon ? <TitleIcon size="16" /> : <IconHome size="16" />}
            <h3 className="font-bold">
              {title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="h-6 w-6 flex justify-center items-center rounded-sm hover:bg-zinc-100"
          >
            <IconClose size="24" />
          </button>
        </header>

        <div>
          {children}
        </div>
      </section>
    </div>,
    document.getElementById("drawers") ?? document.createElement("div")
  )
}
