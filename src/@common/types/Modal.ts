import { VariantProps } from 'class-variance-authority'
import { modalVariants } from '../constants/modal-variants'

export type ModalVariantType = typeof modalVariants

export type ModalVariant = VariantProps<ModalVariantType>
