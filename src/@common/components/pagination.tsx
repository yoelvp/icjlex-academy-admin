import { ButtonHTMLAttributes, FC } from 'react'
import { IconChevronBack, IconChevronForward } from '@/assets/icons'

interface PaginationProps {
  containerClassName?: string
  page: number
  size: number
  totalItems: number
  prevPage: () => void
  nextPage: () => void
  goToPage: (pageNumber: number) => void
}

export const Pagination: FC<PaginationProps> = ({
  containerClassName,
  page,
  size,
  totalItems,
  prevPage,
  nextPage,
  goToPage
}) => {
  const totalPages = Math.ceil(totalItems / size)

  return (
    <div className={`flex justify-center gap-x-4 ${containerClassName}`}>
      <Button onClick={prevPage} disabled={page === 1}>
        <IconChevronBack />
        <span className="hidden md:block">Anterior</span>
      </Button>

      <div className="flex gap-x-2 justify-center items-center">
        {Array.from({ length: totalPages }).map((_, index) => {
          const pageNumber = index + 1

          return (
            <Button
              key={pageNumber}
              onClick={() => goToPage(pageNumber)}
              className={`w-8 h-8 flex items-center justify-center rounded-sm text-primary-900 transition-colors duration-200 font-medium ${
                page === pageNumber
                  ? 'bg-primary-500/20'
                  : 'hover:bg-primary-50'
              }`}
            >
              {pageNumber}
            </Button>
          )
        })}
      </div>

      <Button
        onClick={nextPage}
        disabled={page === totalPages}
        className="text-primary-400 flex items-center gap-x-2 px-4 py-2 rounded transition-colors duration-200 hover:text-primary-700 hover:bg-primary-50"
      >
        <span className="hidden md:block">Siguiente</span>
        <IconChevronForward />
      </Button>
    </div>
  )
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

const Button: FC<ButtonProps> = ({
  ...props
}) => (
  <button
    className="text-primary-400 flex-center gap-x-2 px-4 py-2 rounded transition-colors duration-200 hover:text-primary-700 hover:bg-primary-50"
    {...props}
  />
)
