import classNames from 'classnames'
import type { FieldErrors, FieldValues, Path, UseFormRegister } from 'react-hook-form'

interface Props<FormValues extends FieldValues> {
  name: Path<FormValues>
  register: UseFormRegister<FormValues>
  errors?: FieldErrors<FormValues>
  label?: string
  accept?: string
  multiply?: boolean
  maxSize?: number
  className?: string
}

export const ImageUpload = <FormValues extends FieldValues>({
  name,
  label,
  maxSize,
  className
}: Props<FormValues>) => {
  return (
    <div
      className={classNames(
        'flex flex-col gap-y-2',
        className
      )}
    >

    </div>
  )
}
