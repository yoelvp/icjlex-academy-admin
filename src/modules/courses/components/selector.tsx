import { useState } from 'react'
import { MultiValue } from 'react-select'
import CreatableSelect from 'react-select/creatable'

// Tipo de opción ajustado para usar `name` en lugar de `label`
type OptionType = { name: string; value: string }

type SelectorProps<T extends OptionType> = {
  value: MultiValue<T>
  onChange: (newValue: MultiValue<T>) => void
  onCreateOption?: (inputValue: string) => void
  placeholder?: string
  name?: string
  isMulti?: boolean
}

export const Selector = <T extends OptionType>({
  value,
  onChange,
  onCreateOption,
  placeholder = 'Selecciona o crea una opción...',
  name,
  isMulti = true
}: SelectorProps<T>) => {
  // Estado para almacenar las opciones creadas, definido como `OptionType[]` directamente
  const [allOptions, setAllOptions] = useState<OptionType[]>([])

  const handleCreate = (inputValue: string) => {
    const newOption: OptionType = {
      name: inputValue,
      value: inputValue.toLowerCase()
    }

    // Añadir la nueva opción a todas las opciones
    setAllOptions((prevOptions) => [...prevOptions, newOption])

    // Actualizar el valor con la nueva opción
    onChange([...value, newOption as T] as MultiValue<T>)
    onCreateOption?.(inputValue)
  }

  return (
    <CreatableSelect
      isMulti={isMulti}
      name={name}
      // Mapea las opciones para que `react-select` las interprete correctamente
      value={
        value.map((opt) => ({
          ...opt,
          label: opt.name
        })) as MultiValue<OptionType>
      }
      options={allOptions.map((opt) => ({ ...opt, label: opt.name }))}
      onChange={(newValue) => onChange(newValue as MultiValue<T>)}
      onCreateOption={handleCreate}
      className="basic-multi-select"
      classNamePrefix="select"
      placeholder={placeholder}
      noOptionsMessage={() => 'No hay opciones disponibles'}
    />
  )
}
