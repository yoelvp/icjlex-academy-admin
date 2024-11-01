import { forwardRef, type InputHTMLAttributes } from 'react'
import classNames from 'classnames'
import { motion } from 'framer-motion'

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  className?: string
  value?: boolean | null
  onChange?: (checked: boolean) => void
}

export const Switch = forwardRef<HTMLInputElement, Props>(({
  className,
  value,
  onChange,
  ...props
}, ref) => {
  const toggleSwitch = () => {
    onChange?.(!value)
  }

  return (
    <motion.button
      type="button"
      className={classNames(
        'relative inline-flex h-6 w-12 items-center rounded-full transition-colors border border-primary-100',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        'disabled:cursor-not-allowed disabled:opacity-50',
        value ? 'bg-primary-100' : 'bg-primary-50',
        className
      )}
      onClick={toggleSwitch}
      aria-checked={value ?? false}
      role="switch"
    >
      <motion.span
        className={classNames(
          'absolute inline-block h-5 w-5 rounded-full bg-primary-500 shadow-lg',
          { 'right-0': value }
        )}
        layout
        transition={{
          type: 'spring',
          stiffness: 700,
          damping: 30
        }}
      />
      <input
        type="checkbox"
        ref={ref}
        checked={value}
        className="sr-only"
        defaultValue={1}
        {...props}
      />
    </motion.button>
  )
})
