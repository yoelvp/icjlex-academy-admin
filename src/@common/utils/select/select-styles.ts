/* import { ControlProps, CSSObjectWithLabel, StylesConfig } from 'react-select'

import { SelectOption } from '../../types/Select'

export const getControlStyles = (base: CSSObjectWithLabel, props: ControlProps) => ({
  ...base,
  minHeight      : props.height || 50,
  borderRadius   : '0.375rem',
  border         : '1px solid #dee2e6',
  cursor         : 'pointer',
  fontSize       : 14,
  backgroundColor: props.isDisabled ? '#E9ECEF' : '#ffffff',
  borderColor    : props.isFocused ? 'var(--primary-light)' : '#dee2e6',
  boxShadow      : props.isFocused ? '0 0 0 0.25rem var(--primary-light)' : base.boxShadow,
  ':hover'       : {
    borderColor: props.menuIsOpen ? 'var(--primary)' : 'var(--primary-light)'
  },
  opacity: props.isDisabled ? 0.6 : 1
})
export const baseSelectStyles: StylesConfig<SelectOption, false> = {
  control: (base: CSSObjectWithLabel, props: ControlProps) => getControlStyles(base, props),
  option : (base:any, { isFocused, isSelected }) => ({
    ...base,
    backgroundColor: isSelected ? 'var(--primary)' : isFocused ? 'var(--primary-light)' : 'white',
    color          : isSelected ? 'white' : isFocused ? 'var(--primary)' : 'black',
    ':active'      : {
      backgroundColor: isSelected ? 'var(--primary-light)' : 'var(--primary)',
      color          : isSelected ? 'var(--primary)' : 'white'
    },
    cursor: 'pointer'
  }),
  singleValue: (base: CSSObjectWithLabel) => ({
    ...base,
    color   : '#383838',
    fontSize: 14
  }),
  multiValue: (base:CSSObjectWithLabel) => ({
    ...base,
    fontSize       : 14,
    color          : 'var(--primary-dark)',
    backgroundColor: 'var(--primary-light)',
    borderRadius   : '12px'
  }),
  multiValueLabel: (base:CSSObjectWithLabel) => ({
    ...base,
    backgroundColor: 'var(--primary-light)',
    color          : 'var(--primary-dark)',
    fontWeight     : 'bold',
    borderRadius   : '12px'
  }),
  placeholder: (base:CSSObjectWithLabel) => ({
    ...base,
    color: '#ADB5BD'
  }),
  menu: (base: CSSObjectWithLabel) => ({
    ...base,
    fontSize: 14
  }),
  indicatorSeparator: () => ({ display: 'none' })
}
export const baseMultiSelectStyles = {
  control: (base: CSSObjectWithLabel, props: ControlProps) => ({
    ...base,
    minHeight      : 50,
    borderRadius   : '0.375rem',
    backgroundColor: '#ffffff',
    borderColor    : props.isFocused ? 'var(--primary-light)' : '#dee2e6',
    boxShadow      : props.isFocused ? '0 0 0 0.25rem var(--primary-light)' : base.boxShadow,
    cursor         : 'pointer',
    ':hover'       : {
      borderColor: props.menuIsOpen ? 'var(--primary)' : 'var(--primary-light)'
    },
    fontSize: 14,
    opacity : props.isDisabled ? 0.6 : 1
  }),
  option: (base: CSSObjectWithLabel, { isFocused, isSelected }: ControlProps) => ({
    ...base,
    backgroundColor: isSelected ? 'var(--primary)' : isFocused ? 'var(--primary-light)' : 'white',
    color          : isSelected ? 'white' : isFocused ? 'var(--primary)' : 'black',
    ':active'      : {
      backgroundColor: isSelected ? 'var(--primary-light)' : 'var(--primary)',
      color          : isSelected ? 'var(--primary)' : 'white'
    },
    cursor: 'pointer'
  }),
  singleValue: (base: CSSObjectWithLabel) => ({
    ...base,
    color   : '#383838',
    fontSize: 14
  }),
  multiValue: (base: CSSObjectWithLabel) => ({
    ...base,
    fontSize       : 14,
    color          : 'var(--primary-dark)',
    backgroundColor: 'var(--primary-light)',
    borderRadius   : '12px'
  }),
  multiValueLabel: (base: CSSObjectWithLabel) => ({
    ...base,
    backgroundColor: 'var(--primary-light)',
    color          : 'var(--primary-dark)',
    fontWeight     : 'bold',
    borderRadius   : '12px'
  }),
  placeholder: (base: CSSObjectWithLabel) => ({
    ...base,
    color: '#ADB5BD'
  }),
  menu: (base: CSSObjectWithLabel) => ({
    ...base,
    fontSize: 14
  }),
  indicatorSeparator: () => ({ display: 'none' })
} */
