import type { FC } from 'react'

interface Props {
  variant: 'primary' | 'secondary'
  children: React.ReactNode
}

export const Icon: FC<Props> = ({ variant, children }) => {
  const baseClasses = 'rounded-full flex justify-center items-center'
  const variantClasses =
    variant === 'primary'
      ? 'w-[64px] h-[64px] bg-primary-500 text-primary-50'
      : 'w-[32px] h-[32px] bg-primary-100 text-primary-500'

  return (
    <span className={`${baseClasses} ${variantClasses}`}>
      {children}
    </span>
  )
}
