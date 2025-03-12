import type { FC } from "react"
import { IconClose } from "@/assets/icons"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export const Modal: FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded shadow-lg z-10 w-full max-w-lg mx-4 md:mx-0">
        <div className="px-6 py-4 border-b border-primary-600/20 flex justify-between items-center">
          <h3 className="text-primary-500 text-2xl font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className=" border-primary-500 hover:border-error-500 rounded-xs border p-1 hover:bg-primary-50 duration-200 ease-in-out"
          >
            <IconClose size={24} className="hover:text-error-500 ease-in-out" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}
