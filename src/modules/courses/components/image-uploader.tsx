import React, { useState } from 'react'
import classNames from 'classnames'
import { UseFormSetValue, Path, PathValue, FieldValues } from 'react-hook-form'
import { IconClose } from '@/assets/icons'

type Props<T extends FieldValues> = {
  name: Path<T> // Asegura que name sea una ruta válida en T
  setValue: UseFormSetValue<T> // Usamos el setValue directamente
  acceptedFileTypes?: string[] // Tipos de archivo aceptados
  maxFileSize?: number // Tamaño máximo del archivo en bytes
  className?: string
}

const ImageUploader = <T extends FieldValues>({
  name,
  setValue,
  acceptedFileTypes = ['image/jpeg', 'image/png', 'image/gif'], // Tipos de archivo por defecto
  maxFileSize = 5 * 1024 * 1024, // Tamaño máximo por defecto: 5MB
  className
}: Props<T>) => {
  const [isDragActive, setIsDragActive] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleDragEnter = () => setIsDragActive(true)
  const handleDragLeave = () => setIsDragActive(false)

  const validateFile = (file: File) => {
    if (!acceptedFileTypes.includes(file.type)) {
      setError('Tipo de archivo no aceptado. Solo se permiten imágenes.')

      return false
    }
    if (file.size > maxFileSize) {
      setError(
        `El archivo debe ser menor de ${maxFileSize / (1024 * 1024)} MB.`
      )

      return false
    }
    setError(null)

    return true
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragActive(false)
    const file = e.dataTransfer.files[0]

    if (file && validateFile(file)) {
      setValue(name, file as PathValue<T, Path<T>>) // Casting a PathValue
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleClick = () => {
    const fileInput = document.createElement('input')
    fileInput.type = 'file'
    fileInput.accept = acceptedFileTypes.join(', ') // Aceptar solo tipos especificados
    fileInput.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file && validateFile(file)) {
        setValue(name, file as PathValue<T, Path<T>>)
        setPreview(URL.createObjectURL(file))
      }
    }
    fileInput.click()
  }

  return (
    <div
      className={classNames(
        'relative flex flex-col justify-center items-center w-full h-48 border-2 border-dashed rounded-sm p-5 transition-all',
        { 'bg-sky-50 border-sky-400': isDragActive },
        { 'border-gray-300 cursor-pointer': !isDragActive },
        className
      )}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <p
        className={classNames(
          'text-sm',
          { 'text-sky-800': isDragActive },
          { 'text-gray-400': !isDragActive }
        )}
      >
        {isDragActive ? 'Suelta tu archivo aquí' : 'Arrastra y suelta tu imagen aquí'}
      </p>
      {error && <span className="text-red-500 text-sm">{error}</span>}
      {preview && (
        <img
          src={preview}
          alt="Vista previa"
          className="mt-3 w-[200px] h-[150px] object-cover rounded-sm"
        />
      )}
      {preview && (
        <button
          type="button"
          onClick={(e) => {
            setPreview(null)
            e.stopPropagation()
          }}
          className="absolute top-4 right-4"
        >
          <IconClose />
        </button>
      )}
    </div>
  )
}

export default ImageUploader
