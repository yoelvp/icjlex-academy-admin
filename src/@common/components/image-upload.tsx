import type { FieldValues, Path, UseFormRegister } from "react-hook-form"
import {
  type ChangeEvent,
  type DragEvent,
  type MouseEvent,
  lazy,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react"
import classNames from "classnames"
import { IoIosCloudUpload } from "react-icons/io"
import { IconClose, IconEye } from "@/assets/icons"

const PreviewUploadedImage = lazy(() => import("./preview-uploaded-image"))

interface Props<FormValues extends FieldValues> {
  name: Path<FormValues>
  register: UseFormRegister<FormValues>
  accept?: string[]
  isMultiple?: boolean
  maxSize?: number
  className?: string
}

export const ImageUpload = <FormValues extends FieldValues>({
  name,
  register,
  accept,
  isMultiple,
  maxSize = 5,
  className
}: Props<FormValues>) => {
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [fullViewImageUrl, setFullViewImageUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dropAreaRef = useRef<HTMLDivElement>(null)
  const isProcessingRef = useRef(false)

  const MAX_FILE_SIZE_IN_BYTES = maxSize * 1024 * 1024

  const processFiles = useCallback((files: FileList | File[]) => {
    if (!files || files.length === 0) return

    const newPreviewUrls: string[] = []
    const validFiles: File[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]

      if (!file.type.startsWith("image/")) continue

      if (file.size > MAX_FILE_SIZE_IN_BYTES) continue

      newPreviewUrls.push(URL.createObjectURL(file))
      validFiles.push(file)
    }

    if (validFiles.length > 0) {
      if (!isMultiple) {
        previewUrls.forEach((url) => URL.revokeObjectURL(url))
        setPreviewUrls(newPreviewUrls)

        const dataTransfer = new DataTransfer()
        dataTransfer.items.add(validFiles[0])
        if (fileInputRef.current) {
          fileInputRef.current.files = dataTransfer.files
          const event = new Event("change", { bubbles: true })
          fileInputRef.current.dispatchEvent(event)
        }
      } else {
        setPreviewUrls((prevUrls) => [...prevUrls, ...newPreviewUrls])

        const dataTransfer = new DataTransfer()

        if (fileInputRef.current && fileInputRef.current.files) {
          for (let i = 0; i < fileInputRef.current.files.length; i++) {
            dataTransfer.items.add(fileInputRef.current.files[i])
          }
        }

        validFiles.forEach((file) => {
          dataTransfer.items.add(file)
        })

        if (fileInputRef.current) {
          fileInputRef.current.files = dataTransfer.files
          const event = new Event("change", { bubbles: true })
          fileInputRef.current.dispatchEvent(event)
        }
      }
    }
  }, [maxSize, isMultiple, previewUrls])

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (isProcessingRef.current) return

    if (event.target.files) {
      isProcessingRef.current = true
      processFiles(event.target.files)
      isProcessingRef.current = false
    }
  }

  const handleDragEnter = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files)
    }
  }, [processFiles])

  const removeImage = (index: number) => {
    const newPreviewUrls = [...previewUrls]
    URL.revokeObjectURL(newPreviewUrls[index])
    newPreviewUrls.splice(index, 1)
    setPreviewUrls(newPreviewUrls)

    if (fileInputRef.current && fileInputRef.current.files) {
      const dataTransfer = new DataTransfer()
      const files = fileInputRef.current.files

      for (let i = 0; i < files.length; i++) {
        if (i !== index) {
          dataTransfer.items.add(files[i])
        }
      }

      fileInputRef.current.files = dataTransfer.files
      const event = new Event("change", { bubbles: true })
      fileInputRef.current.dispatchEvent(event)
    }
  }

  const { ref, ...inputProps } = register(name, {
    validate: {
      fileSize: (fileList: FileList) => {
        if (!fileList || fileList.length === 0) return true

        for (let i = 0; i < fileList.length; i++) {
          if (fileList[i].size > maxSize) {
            return `El tamaño máximo de archivo es ${(MAX_FILE_SIZE_IN_BYTES / (1024 * 1024)).toFixed(0)}MB`
          }
        }

        return true
      },
      fileType: (fileList: FileList) => {
        if (!fileList || fileList.length === 0) return true

        const acceptTypes = accept?.map((type) => type.trim())

        if (acceptTypes?.includes("image/*")) return true

        for (let i = 0; i < fileList.length; i++) {
          const file = fileList[i]
          const fileType = file.type
          if (!acceptTypes?.some((type) => fileType.match(new RegExp(type.replace("*", ".*"))))) {
            return "Formato de archivo no aceptado"
          }
        }

        return true
      }
    }
  })

  const viewFullImage = (url: string, e: MouseEvent) => {
    e.stopPropagation()
    setFullViewImageUrl(url)
  }

  const closeFullView = () => {
    setFullViewImageUrl(null)
  }

  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [previewUrls])

  return (
    <div
      className={classNames(
        "flex flex-col gap-y-2",
        className
      )}
    >
      <div className="flex flex-col space-y-4">
        <div
          ref={dropAreaRef}
          className={classNames(
            "border-2 border-dashed rounded-md p-4 text-center cursor-pointer transition-colors duration-200",
            { "border-blue-500 bg-blue-50": isDragging },
            { "border-gray-300 hover:bg-gray-50": !isDragging }
          )}
          onClick={() => fileInputRef.current?.click()}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center py-4">
            <IoIosCloudUpload className={`h-8 w-8 mb-2 ${isDragging ? "text-blue-500" : "text-gray-400"}`} />
            <p className={`text-sm ${isDragging ? "text-blue-600" : "text-gray-500"}`}>
              {isDragging
                ? "Suelta tus imágenes aquí"
                : `Arrastra y suelta o haz clic para seleccionar ${isMultiple ? "imágenes" : "una imagen"}`
              }
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {accept ? accept.join(", ") : "JPG, PNG, GIF, etc"} (Máx: {(MAX_FILE_SIZE_IN_BYTES / (1024 * 1024)).toFixed(0)}MB)
            </p>
          </div>

          <input
            {...inputProps}
            ref={(e) => {
              ref(e);
              fileInputRef.current = e;
            }}
            id={name}
            type="file"
            accept={accept?.join(", ")}
            multiple={isMultiple}
            onChange={handleFileChange}
            className="sr-only"
          />
        </div>

        {/* Previsualizaciones */}
        {previewUrls.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {previewUrls.map((url, index) => (
              <div key={index} className="relative w-32 h-32">
                <img
                  src={url}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover rounded-md"
                />
                <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center gap-x-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage(index);
                    }}
                    className="bg-primary-500 text-white rounded-full p-1 shadow-md hover:bg-primary-600"
                  >
                    <IconClose />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => viewFullImage(url, e)}
                    className="bg-primary-500 text-white rounded-full p-1 shadow-md hover:bg-primary-600"
                  >
                    <IconEye />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {fullViewImageUrl && (
        <PreviewUploadedImage imageUrl={fullViewImageUrl} onClose={closeFullView} />
      )}
    </div>
  )
}
