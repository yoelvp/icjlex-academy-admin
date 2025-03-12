import { IconType } from 'react-icons'

export interface Option {
  name: string
  path?: string
  icon?: IconType
  disabled?: boolean,
  permissionsName?: string
}

export interface Options extends Option {
  subOptions?: Option[]
}
