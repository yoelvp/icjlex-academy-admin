export interface MenuOption {
  label: string
  href?: string
  onClick?: () => void
}

export interface MenuOptions extends MenuOption {
  subOptions?: MenuOption[]
}
