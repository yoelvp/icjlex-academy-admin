import type { ReactNode } from "react"

import { useEffect, useRef, useState } from "react"
import { Link } from "react-router"
import classNames from "classnames"
import { useShow } from "../hooks/use-show"
import { useClickOutside } from "../hooks/use-click-outside"
import Button from "./button"
import { IconMenu } from "@/assets/icons"
import { MenuOptions } from "../types/Menu"
import { ButtonBaseProps } from "../types/Button"
import { Spinner } from "./spinner"

interface Props extends ButtonBaseProps {
  children?: ReactNode
  activator?: ReactNode
  options?: MenuOptions[]
}

export const Menu = ({
  children,
  activator,
  variant,
  options
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

  useEffect(() => {
    calculateMenuPosition()
  }, [showDropdown])

  return (
    <div ref={dropdownRef} className="w-fit">
      <Button.Icon
        onClick={(event) => {
          event.stopPropagation()
          toggleDropdown()
        }}
        variant={variant}
        size="sm"
      >
        {activator ? activator : <IconMenu />}
      </Button.Icon>

      {showDropdown && (
        <div
          className={classNames(
            "absolute z-50 bg-white rounded-sm shadow-lg shadow-primary-50 py-1"
          )}
          style={{
            top: menuPosition.top + 8,
            right: menuPosition.right
          }}
        >
          {children ? children : options?.map((option, index) => (
            <div
              key={index}
              className={classNames(
                "py-1",
                { "border-t border-t-gray-200": option.dividerTop },
                { "border-b border-b-gray-200": option.dividerBottom }
              )}
            >
              {option.href ? (
                <Link
                  key={index}
                  to={option.href ?? ""}
                  className={classNames(
                    "w-full text-left pl-6 pr-12 py-2 hover:bg-primary-50 hover:text-primary-700 flex justify-start gap-x-2",
                    { "text-red-400": option.isDelete }
                  )}
                  rel={option.rel}
                  target={option.target}
                >
                  {option.icon && <option.icon size="16" />}
                  {option.label}
                </Link>
              ) : (
                <button
                  key={index}
                  onClick={option.onClick}
                  className={classNames(
                    "w-full text-left pl-6 pr-12 py-2 flex-start gap-x-2",
                    { "text-red-400 hover:text-red-700 hover:bg-red-50/50": option.isDelete },
                    { "text-primary-500 hover:text-primary-700 hover:bg-primary-50": !option.isDelete }
                  )}
                >
                  {option.icon && !option.isLoading ? <option.icon size="16" /> : <Spinner />}
                  {option.label}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
