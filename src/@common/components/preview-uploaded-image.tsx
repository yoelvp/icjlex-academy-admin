import { type MouseEvent, useEffect } from "react"
import { IconClose } from "@/assets/icons"

interface Props {
  imageUrl: string
  onClose: () => void
}

const PreviewUploadedImage = ({ imageUrl, onClose }: Props) => {
  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleKeyboardEvent = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose()
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboardEvent)

    return () => document.removeEventListener("keydown", handleKeyboardEvent)
  }, [])

  return (
    <div
      className="fixed inset-0 bg-black/60 bg-opacity-80 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full h-full grid place-content-center p-8">
        <button
          onClick={onClose}
          className="absolute top-8 right-8 text-white rounded-full p-2 shadow-md hover:bg-red-100/25 z-10"
        >
          <IconClose size="48" />
        </button>

        <img
          src={imageUrl}
          alt="Vista completa"
          className="w-full h-full object-center object-contain rounded-md shadow-lg"
        />
      </div>
    </div>
  )
}

export default PreviewUploadedImage
