import { Spinner } from 'flowbite-react'

// Recibe una prop `loading` para controlar la visibilidad del spinner
export const Loader = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-primary-50 z-100 flex-col-center">
      <div className="flex-col-center h-48">
        <Spinner
          aria-label="Loading..."
          role="status"
          className="h-8 w-8 text-secondary-500 fill-primary-500"
        />
      </div>
    </div>
  )
}
