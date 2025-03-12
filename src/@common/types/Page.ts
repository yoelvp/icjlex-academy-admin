import type { IconType } from "react-icons"

interface PageOption {
  label: string
  href: string
  withIcon?: boolean
  icon?: IconType
}

export interface Page extends PageOption {
  subPages?: PageOption[]
}
