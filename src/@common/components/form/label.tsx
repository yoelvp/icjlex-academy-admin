import type { FC, LabelHTMLAttributes, ReactNode } from 'react'

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode
  className?: string
}

export const Label: FC<Props> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <label
      className={`
        text-primary-400 text-sm
        ${className}
      `}
      {...props}
    >
      {children}
    </label>
  )
}
