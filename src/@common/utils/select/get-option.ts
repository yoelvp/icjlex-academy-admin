import { SelectOption } from '@/@common/types/Select'

export const getSelectedOptions = <T extends string | string[]>(
  value: T,
  options: SelectOption[] | Readonly<SelectOption[]>
): T extends string[] ? SelectOption[] : SelectOption => {
  if(typeof value === 'string')
    return options?.find((option) => option.value === value) as T extends string[] ? never : SelectOption

  const selectedOptions: SelectOption[] = []
  options.forEach((option) => {
    if(value?.includes(option.value)) selectedOptions.push(option)
  })

  return selectedOptions as T extends string[] ? SelectOption[] : never
}

export const sortedOptions = (options: SelectOption[]) => options.sort((a, b) => a.label.localeCompare(b.label))
