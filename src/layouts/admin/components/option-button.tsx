import type { FC } from 'react'
import type { Options } from '../types/AdminRoutes'

import classNames from 'classnames'
import { IconChevronDown } from '@/assets/icons'

interface Props {
  option: Options
  showLabel?: boolean
}

export const OptionButton: FC<Props> = ({ option: { name, icon: Icon, subOptions }, showLabel }) => {
  return (
    <button
      className={classNames(
        'w-full flex-between gap-2 py-2 rounded-sm transition duration-200 text-primary-500 hover:bg-primary-400 hover:text-primary-50',
        { 'flex-start px-4': showLabel },
        { 'flex-center px-2': !showLabel }
      )}
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
      {subOptions && <IconChevronDown className={classNames({ 'hidden': !showLabel })} />}
    </button>
  )
}
