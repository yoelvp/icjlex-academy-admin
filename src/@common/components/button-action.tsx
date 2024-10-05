import { ElementType } from 'react'

interface Props {
  text: string
  icon: ElementType
  disabled?: boolean
  onClick: () => void
}

export const ButtonAction = ({ text, icon: Icon, disabled, onClick }: Props) => {
  return (
    <button
      className={`flex items-center w-full gap-2 py-3 px-4 rounded-sm transition duration-200 text-primary-500 hover:bg-primary-400 hover:text-primary-50 
      ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      onClick={onClick}
      disabled={disabled}
    >
      <Icon size={24} />
      {text}
    </button>
  )
}
