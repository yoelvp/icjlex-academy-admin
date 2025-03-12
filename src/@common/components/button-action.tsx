import { ElementType } from "react"

interface Props {
  label: string
  icon: ElementType
  className?: string
  onClick: () => void
}

export const ButtonAction = ({
  label,
  icon: Icon,
  className,
  onClick
}: Props) => {
  return (
    <button
      className={`flex items-center w-full gap-2 py-3 px-4 rounded-sm transition duration-200 text-primary-500 hover:bg-primary-400 hover:text-primary-50 
      ${className}`}
      onClick={onClick}
    >
      <Icon size={24} />
      {label}
    </button>
  )
}
