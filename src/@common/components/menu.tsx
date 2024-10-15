import type { ReactNode } from 'react'

import { useEffect, useRef, useState } from 'react'
import { useShow } from '../hooks/use-show'
import { useClickOutside } from '../hooks/use-click-outside'
import Button from './button'
import { IconMenu } from '@/assets/icons'
import { MenuOptions } from '../types/Menu'
import { ButtonBaseProps } from '../types/Button'
import { menuVariants } from '../constants/menu-variants'

interface Props extends ButtonBaseProps {
  children?: ReactNode
  activator?: ReactNode
  options?: MenuOptions[]
  size?: 'xs' | 'md' | 'lg'
}

export const Menu = ({
  children,
  activator,
  variant,
  options,
  size
}: Props) => {
  const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0, left: 0 })
  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const { show: showDropdown, toggle: toggleDropdown, close: closeDropdown } = useShow()
  useClickOutside(dropdownRef, closeDropdown)

  const calculateMenuPosition = () => {
    if (dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect()
      const top = rect.top + rect.height
      const right = window.innerWidth - rect.right
      const left = rect.left
      setMenuPosition({ top, right, left })
    }
  }
  console.log(menuPosition)

  useEffect(() => {
    calculateMenuPosition()
  }, [showDropdown])

  return (
    <div ref={dropdownRef} className="w-fit">
      <Button
        onClick={(event) => {
          event.stopPropagation()
          toggleDropdown()
        }}
        variant={variant}
      >
        {activator ? activator : <IconMenu />}
      </Button>

      {showDropdown && (
        <div
          className={menuVariants({ size })}
          style={{
            top: menuPosition.top + 8,
            right: menuPosition.right
          }}
        >
          {children
            ? children
            : options?.map((option, index) => (
              <div key={index}>{option.label}</div>
            ))}
        </div>
      )}
    </div>
  )
}
