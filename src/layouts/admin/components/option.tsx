import type { Options } from '../types/AdminRoutes'

import classNames from 'classnames'
import { IconChevronDown } from '@/assets/icons'
import { useLocation, useNavigate } from 'react-router'

interface Props {
  option: Options
  showLabel?: boolean
}

export const Option = ({
  option: { name, path, icon: Icon, subOptions, disabled },
  showLabel
}: Props) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <button
      className={classNames(
        'w-full flex-between gap-2 py-2 rounded-sm transition duration-200',
        { 'flex-start px-4': showLabel },
        { 'flex-center px-2': !showLabel },
        { 'text-gray-500 select-none cursor-default': disabled },
        { 'text-primary-500 hover:bg-primary-400 hover:text-primary-50': !disabled },
        { 'bg-primary-300/25 text-primary-700': pathname === path }
      )}
      disabled={disabled}
      onClick={() => navigate(path ?? '/admin')}
    >
      <div
        className={classNames(
          'w-full gap-x-2',
          { 'flex-start': showLabel },
          { 'flex-center': !showLabel }
        )}
      >
        {!!Icon && <Icon size="18" />}
        <span className={classNames({ 'hidden': !showLabel })}>{name}</span>

      </div>
      <div className="flex gap-x-2">
        {subOptions && <IconChevronDown className={classNames({ 'hidden': !showLabel })} />}
        {disabled && (
          <span
            className={classNames(
              'text-xs bg-gray-200 flex-center px-2 py-px font-medium rounded-lg',
              { 'hidden': !showLabel }
            )}
          >
            Pronto
          </span>
        )}
      </div>
    </button>
  )
}
