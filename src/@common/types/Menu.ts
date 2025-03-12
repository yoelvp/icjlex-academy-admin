import { IconType } from "react-icons"

export interface MenuOption {
  label: string
  icon?: IconType
  href?: string
  rel?: string
  target?: "_top" | "_self" | "_blank" | "_parent"
  onClick?: () => void
  isDelete?: boolean
  dividerTop?: boolean
  dividerBottom?: boolean
  isLoading?: boolean
}

export interface MenuOptions extends MenuOption {
  subOptions?: MenuOption[]
}
