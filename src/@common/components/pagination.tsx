import type { ButtonHTMLAttributes, FC } from 'react'

import { IconChevronBack, IconChevronForward } from '@/assets/icons'

interface Props {
  containerClassName?: string
}

export const Pagination: FC<Props> = ({
  containerClassName
}) => {
  return (
    <div className={`flex justify-center gap-x-4 ${containerClassName}`}>
      <Button>
        <IconChevronBack />
        <span className="hidden md:block">Anterior</span>
      </Button>
      <div className="flex gap-x-2 justify-center items-center">
        {Array.from([1, 2, 3, 4, 5, 6, 7, '...', 47]).map((page, index, array) => (
          <button
            key={index}
            className={`
              w-8 h-8 flex-col-center gap-x-4 rounded-sm text-primary-900 transition-colors duration-200 font-medium
              ${index === 1 && 'bg-primary-500/20'}
              ${index === array.length - 2 ? 'hover:bg-transparent' : 'hover:bg-primary-50'}
            `}
            disabled={index === array.length - 2}
          >
            {index === array.length - 2 ? '...' : page}
          </button>
        ))}
      </div>
      <Button>
        <span className="hidden md:block">Siguiente</span>
        <IconChevronForward />
      </Button>
    </div>
  )
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { }

const Button: FC<ButtonProps> = ({
  ...props
}) => (
  <button
    className="text-primary-400 flex-center gap-x-2 px-4 py-2 rounded transition-colors duration-200 hover:text-primary-700 hover:bg-primary-50"
    {...props}
  />
)
