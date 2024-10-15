import React, { useState } from 'react'
import { UseFormSetValue } from 'react-hook-form'
import { Course } from '../types/Course'

type Props = {
  name: 'image'
  setValue: UseFormSetValue<Course>
}

const ImageUploader = ({ name, setValue }: Props) => {
  const [isDragActive, setIsDragActive] = useState<boolean>(false)
  const [preview, setPreview] = useState<string | null>(null)

  const handleDragEnter = () => {
    setIsDragActive(true)
  }

  const handleDragLeave = () => {
    setIsDragActive(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragActive(false)
    const file = e.dataTransfer.files[0]

    if (file) {
      setValue(name, file) // Register file in react-hook-form
      setPreview(URL.createObjectURL(file)) //show preview
    }
  }

  const handleClick = () => {
    const fileInput = document.createElement('input')
    fileInput.type = 'file'
    fileInput.accept = 'image/jpeg, image/png, image/gif'
    fileInput.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        setValue(name, file) // Register file in react-hook-form
        setPreview(URL.createObjectURL(file)) // show preview
      }
    }
    fileInput.click()
  }

  return (
    <div
      className={`flex flex-col justify-center items-center w-full h-48 border-2 border-dashed rounded-lg p-5 transition-all
        ${isDragActive
      ? 'bg-sky-50 border-sky-400'
      : 'border-gray-300 cursor-pointer'
    }`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <p
        className={`text-sm ${isDragActive ? 'text-sky-800' : 'text-gray-400'}`}
      >
        {isDragActive
          ? 'Suelta tu archivo aquí'
          : 'Arrastra y suelta tu imagen aquí'}
      </p>
      {preview && (
        <img
          src={preview}
          alt="Vista previa"
          className="mt-3 w-[200px] h-[150px] object-cover rounded"
        />
      )}
    </div>
  )
}

export default ImageUploader
