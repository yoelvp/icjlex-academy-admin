import type { VariantProps } from 'class-variance-authority'
import type { ForwardRefExoticComponent, InputHTMLAttributes, PropsWithoutRef, RefAttributes } from 'react'
import type { IconType } from 'react-icons'

import { inputVariants } from '@/@common/constants/input-variants'
import { Form as FormBase } from './form'
import { Input } from './input'
import { Password } from './password'
import { Label } from './label'
import { Control } from './control'
import { Error } from './error'

export type InputVariant = typeof inputVariants
export type IconPosition = 'left' | 'right'

export interface FormBaseProps extends VariantProps<InputVariant>, Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  className?: string
  icon?: IconType
  iconClassName?: string
  iconPosition?: IconPosition
  withIcon?: boolean
  containerClassName?: string
  error?: string
}

interface FormComponent extends ForwardRefExoticComponent<
  PropsWithoutRef<FormBaseProps> &
  RefAttributes<HTMLFormElement>
> {
  Control: typeof Control
  Error: typeof Error
  Input: typeof Input
  Label: typeof Label
  Password: typeof Password
}

const Form = FormBase as FormComponent
Form.Control = Control
Form.Error = Error
Form.Input = Input
Form.Label = Label
Form.Password = Password

export default Form
