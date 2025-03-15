import { ForwardedRef } from "react"
import classNames from "classnames"
import { VariantProps } from "class-variance-authority"
import { switchVariants } from "./+variants/switch.variant"

type SwitchVariant = typeof switchVariants

interface Props extends VariantProps<SwitchVariant> {
  ref: ForwardedRef<HTMLInputElement>
  className?: string
  value?: boolean | null
  onChange?: (value: boolean) => void
}

export const Switch = ({
  ref,
  value,
  className,
  onChange
}: Props) => {
  return (
    <button
      type="button"
      className={classNames(
        "relative inline-flex h-6 min-w-12 w-12 items-center rounded-full transition-colors border border-primary-100",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:cursor-not-allowed disabled:opacity-50",
        value ? "bg-primary-100" : "bg-primary-50",
        className
      )}
      onClick={() => onChange?.(!value)}
      aria-checked={value ?? false}
      role="switch"
    >
      <span
        className={classNames(
          "absolute inline-block h-5 w-5 rounded-full bg-primary-500 shadow-lg",
          { "right-0": value },
          { "left-0": !value }
        )}
      />
      <input
        ref={ref}
        type="checkbox"
        className="sr-only"
        checked={value ?? false}
        onChange={(e) => onChange?.(!e.target.value)}
      />
    </button>
  )
}
