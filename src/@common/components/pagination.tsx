import { ButtonHTMLAttributes, FC } from 'react'
import { IconChevronBack, IconChevronForward } from '@/assets/icons'
import classNames from 'classnames'
import { DEFAULT_PAGINATION } from '../constants/default-pagination'

type PaginationPosition = 'left' | 'center' | 'right'

interface ButtonPrevOrNextPage extends ButtonHTMLAttributes<HTMLButtonElement> {
  withLabels?: boolean
  isPrev?: boolean
  isNext?: boolean
}

interface PaginationProps {
  containerClassName?: string
  withLabels?: boolean
  withSize?: boolean
  withInfo?: boolean
  position?: PaginationPosition
  page?: number
  size: number
  totalItems?: number
  totalPages?: number
  prevPage: () => void
  nextPage: () => void
  goToPage: (pageNumber: number) => void
  handleSize: (size: number) => void
}

export const Pagination: FC<PaginationProps> = ({
  containerClassName,
  withLabels = false,
  withSize = true,
  withInfo = true,
  position = 'right',
  page,
  size,
  totalItems,
  totalPages,
  prevPage,
  nextPage,
  goToPage,
  handleSize
}) => {
  const startCounter = ((page ?? DEFAULT_PAGINATION.page) - 1) * size + 1
  const endCounter = Math.min((page ?? DEFAULT_PAGINATION.page) * size, (totalItems ?? 0))

  return (
    <div
      className={classNames(
        'flex items-center gap-x-4',
        { 'justify-start': position === 'left' },
        { 'justify-center': position === 'center' },
        { 'justify-end': position === 'right' },
        containerClassName
      )}
    >
      {withSize && (
        <div className="flex items-center gap-x-2">
          <span className="text-sm text-primary-400">
            Por página
          </span>

          <select
            onChange={(event) => handleSize(parseInt(event.target.value))}
            className="rounded-sm h-8 py-0 flex-center border-2 border-primary-500/60 outline-none focus:ring focus:ring-primary-500/20"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={75}>75</option>
            <option value={100}>100</option>
          </select>
        </div>
      )}

      {withInfo && (
        <div className="text-sm text-primary-400">
          {startCounter}-{endCounter} de {totalItems}
        </div>
      )}
      <div className="flex justify-center items-center gap-x-1">
        <Button
          onClick={prevPage}
          disabled={page === 1}
          withLabels={withLabels}
          isPrev
        />

        <div className="flex gap-x-2 justify-center items-center">
          {Array.from({ length: (totalPages ?? DEFAULT_PAGINATION.totalPages) }).map((_, index) => {
            const pageNumber = index + 1

            return (
              <button
                key={pageNumber}
                onClick={() => goToPage(pageNumber)}
                className={classNames(
                  'w-8 h-8 flex items-center justify-center rounded-sm text-primary-900 transition-colors duration-200 font-medium',
                  { 'bg-primary-500/20': page === pageNumber },
                  { 'hover:bg-primary-50': page !== pageNumber }
                )}
              >
                {pageNumber}
              </button>
            )
          })}
        </div>

        <Button
          onClick={nextPage}
          disabled={page === totalPages}
          withLabels={withLabels}
          isNext
        />
      </div>
    </div>
  )
}

const Button: FC<ButtonPrevOrNextPage> = ({
  withLabels,
  isPrev,
  isNext,
  ...props
}) => (
  <button
    className={classNames(
      'text-primary-400 flex-center gap-x-2 rounded-sm transition-colors duration-200',
      { 'hover:text-primary-700 hover:bg-primary-50': !props.disabled },
      { '!text-primary-300': props.disabled },
      { 'h-8 w-8': !withLabels },
      { 'px-4 py-2': withLabels },
      props.className
    )}
    {...props}
  >
    {isPrev && <IconChevronBack />}
    {isPrev && withLabels && (
      <span className="hidden md:block">Anterior</span>
    )}
    {props.children}
    {isNext && withLabels && (
      <span className="hidden md:block">Siguiente</span>
    )}
    {isNext && <IconChevronForward />}
  </button>
)
